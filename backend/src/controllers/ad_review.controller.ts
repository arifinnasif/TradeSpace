import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';
import { notify_user } from './user_notification.controller';
import _ from 'lodash';

const limit = 10;


/**
 * @param req 
 * @param res 
 * @returns 
 */


// get all pending reviews: /api/admin/ad_reviews
export const get_all_pending_reviews = async (req: Request, res: Response) => {
    try {
        let skip = (Number(req.query.page || 1) - 1) * limit;
        if (skip < 0) skip = 0;
        let pending_reviews = await prisma.ads.findMany({
            where: {
                status: 'pending'
            },

            orderBy: {
                created_at: 'desc'
            },

            skip: skip,

            take: limit,
        });

        // const possible_ai_verdicts = ['No Issue', 'No Issue', 'No Issue', 'Contains Spam', 'Fake Image', 'EXIF Mismatch', 'EXIF Mismatch', 'EXIF Mismatch', 'EXIF Mismatch', 'No EXIF', 'Suspicious Link'];

        // pending_reviews = pending_reviews.map((review) => {
        //     // generate random number between 0 and size of possible_ai_verdicts
        //     const random_number = Math.floor(Math.random() * possible_ai_verdicts.length);
        //     const is_ai_approved = random_number < 3 ? true : false;
        //     const ai_verdict = possible_ai_verdicts[random_number];

        //     return {
        //         ...review,
        //         is_ai_approved: is_ai_approved,
        //         ai_verdict: ai_verdict
        //     }
        // });

        const total_pending_reviews = await prisma.ads.count({
            where: {
                status: 'pending'
            }
        });

        console.log(pending_reviews);


        // console.log(pending_reviews);
        return res.status(200).json({
            "current_page": req.query.page || 1,
            "total_pages": Math.ceil(total_pending_reviews / limit),

            "review_list": pending_reviews
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}



// get pending review details: /api/admin/ad_reviews/:id
export const get_pending_review_details = async (req: Request, res: Response) => {
    try {
        const review_details = await prisma.ads.findUnique({
            where: { id: Number(req.params.id) },
            select: {
                id: true,
                op_username: true,
                op: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                status: true,
                category_name: true,
                title: true,
                description: true,
                price: true,
                image1: true,
                is_negotiable: true,
                is_used: true,
                is_sell_ad: true,
                is_phone_public: true,
                days_used: true,
                address: true,
                promotion_type: true,
                created_at: true,
                latitude: true,
                longitude: true,
                ai_verdict: true,
            }
        });


        // ad not found
        if (!review_details || review_details.status !== 'pending') {
            return res.status(404).json({
                success: false,
                error: 'review not found!'
            });
        }


        let usage_time = undefined;
        if (review_details.days_used !== undefined && review_details.days_used !== null) {
            usage_time = {
                years: Math.floor(review_details.days_used / 365),
                months: Math.floor((review_details.days_used % 365) / 30),
                days: Math.floor((review_details.days_used % 365) % 30),
            }
        }


        // phone is sent even if is_phone_public is false
        const user = await prisma.users.findUnique({
            where: { username: review_details.op_username },
            select: { phone: true }
        });

        let address = {
            description: review_details.address,
            latitude: review_details.latitude,
            longitude: review_details.longitude,
        };



        // capitalize
        const op_fullname = _.startCase(review_details.op!.name);


        // remove days_used from review_details
        delete review_details.days_used;

        // remove op from review_details
        delete review_details.op;

        // remove address from review_details
        delete review_details.address;

        // remove latitude from review_details
        delete review_details.latitude;

        // remove longitude from review_details
        delete review_details.longitude;

        // add usage_time and phone to review_details
        const review_details_json = {
            ...review_details,
            usage_time: usage_time,
            phone: user?.phone,
            op_fullname: op_fullname,
            address: address,
        }



        return res.json(review_details_json);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

/**
 * checks whether the ad exists or not
 * if not, return 404
 * checks whether the ad is pending or not
 * if not pending, return 404
 * if pending, approve the ad and notify the user
 * @param req 
 * @param res 
 * @returns 
 */
// approve pending review: PUT /api/admin/ad_reviews/:id
export const approve_pending_review = async (req: Request, res: Response) => {
    try {
        const pending_review = await prisma.ads.findUnique({
            where: {
                id: Number(req.params.id!)
            }
        });

        if (!pending_review) return res.status(404).json({});

        if (pending_review.status !== 'pending') return res.status(404).json({});

        const updated_review = await prisma.ads.update({
            where: {
                id: Number(req.params.id!)
            },

            data: {
                status: 'approved'
            }
        });

        // notify user
        await notify_user(pending_review.op_username,
            'ad_approved',
            'Ad Approved',
            // `Your ad #${updated_review.id} titled "${updated_review.title}" has been approved by the admin.`);
            `Your ad titled "${updated_review.title}" has been approved by the admin.`);

        return res.status(200).json(updated_review);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


/**
 * checks whether the ad exists or not
 * if not, return 404
 * checks whether the ad is pending or not
 * if not pending, return 404
 * if pending, deletes the ad from ads table and add it to archived ads table
 * notify the user why his ad is declined
 * @param req 
 * @param res 
 * @returns 
 */
// decline pending review: DELETE /api/admin/ad_reviews/:id
export const decline_pending_review = async (req: Request, res: Response) => {
    try {
        const pending_review = await prisma.ads.findUnique({
            where: {
                id: Number(req.params.id!)
            }
        });

        if (!pending_review) return res.status(404).json({});

        if (pending_review.status !== 'pending') return res.status(404).json({ "error": "ad not pending" });

        // delete from ads table
        const deleted_review = await prisma.ads.delete({
            where: {
                id: Number(req.params.id!)
            }
        });

        // add to archived ads table
        const archived_review = await prisma.archived_ads.create({
            data: {
                op_username: pending_review.op_username,
                title: pending_review.title,
                description: pending_review.description,
                price: pending_review.price,
                image1: pending_review.image1,
                reason: `declined by admin for ${req.body.reason}`,
                address: pending_review.address,
            }
        });



        // notify user
        await notify_user(pending_review.op_username,
            'ad_declined',
            'Ad Declined',
            `Your ad titled "${deleted_review.title}" has been declined by the admin for "${req.body.reason}"`);

        return res.status(200).json(archived_review);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
