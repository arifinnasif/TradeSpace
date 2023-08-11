import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/prisma_client';
import { notify_user } from './user_notification.controller';
import * as dotenv from "dotenv";

const limit = 10;


dotenv.config();

export const get_all_pending_reviews = async (req: Request, res: Response) => {
    try {
        const pending_reviews = await prisma.ads.findMany({
            where: {
                status: 'pending'
            },

            orderBy: {
                createdAt: 'desc'
            },

            skip: (Number(req.query.page || 1) - 1) * limit,

            take: limit,
        });

        // console.log(pending_reviews);
        return res.status(200).json(pending_reviews);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


export const get_pending_review_details = async (req: Request, res: Response) => {
    try {
        const pending_review = await prisma.ads.findUnique({
            where: {
                id: Number(req.params.id!)
            }
        });

        if (pending_review?.status !== 'pending') return res.status(404).json({});

        return res.status(200).json(pending_review);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


export const approve_pending_review = async (req: Request, res: Response) => {
    try {
        const pending_review = await prisma.ads.findUnique({
            where: {
                id: Number(req.params.id!)
            }
        });

        if (pending_review?.status !== 'pending') return res.status(404).json({});

        const updated_review = await prisma.ads.update({
            where: {
                id: Number(req.params.id!)
            },

            data: {
                status: 'approved'
            }
        });

        await notify_user(pending_review.op_username,
            'ad_approved',
            'Ad Approved',
            'Your ad has been approved by the admin.');

        return res.status(200).json(updated_review);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


export const decline_pending_review = async (req: Request, res: Response) => {
    try {
        const pending_review = await prisma.ads.findUnique({
            where: {
                id: Number(req.params.id!)
            }
        });

        if (!pending_review) return res.status(404).json({});

        if (pending_review.status !== 'pending') return res.status(404).json({});

        await prisma.ads.delete({
            where: {
                id: Number(req.params.id!)
            }
        });

        const archived_review = await prisma.archived_ads.create({
            data: {
                op_username: pending_review.op_username,
                title: pending_review.title,
                description: pending_review.description,
                price: pending_review.price,
                image1: pending_review.image1,
                address: pending_review.address,
            }
        });



        await notify_user(pending_review.op_username,
            'ad_declined',
            'Ad Declined',
            `Your ad has been declined by the admin for "${req.body.reason}"`);

        return res.status(200).json(archived_review);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
