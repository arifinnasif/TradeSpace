import Stripe from "stripe";
import prisma from "../../prisma/prisma_client";
import _ from "lodash";
import * as dotenv from "dotenv";

dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});



const create_checkout_session = async (promotion_type: string, price: number) => {
    try {


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: _.startCase(promotion_type),
                        },
                        unit_amount: Math.round(price * 100),
                    },
                    quantity: 1,
                },
            ],
            success_url: process.env.STRIPE_UPON_SUCCESS_URL!,
            cancel_url: process.env.STRIPE_UPON_CANCEL_URL!,
        });

        // console.log(session);
        return [session.id, session.url];
    } catch (error: any) {
        // return res.status(500).json({
        //     success: false,
        //     error: error.message
        // });
        console.log(error);
    }
}


export const handle_payment_initialization = async (req: any, res: any) => {
    try {
        const { promotion_type } = req.body;

        const ad_id = req.params.adId;

        // check if the ad exists
        const ad = await prisma.ads.findUnique({
            where: {
                id: Number(ad_id)
            },
        });

        if (!ad) {
            return res.status(404).json({
                success: false,
                message: 'Ad not found!'
            });
        }

        // check if the user is the owner of the ad
        if (ad.op_username !== req.user.username) {
            return res.status(403).json({
                success: false,
                message: 'You are not the owner of this ad!'
            });
        }

        // check if the ad is sell ad
        if (!ad.is_sell_ad) {
            return res.status(403).json({
                success: false,
                message: 'This ad is not a sell ad!'
            });
        }

        // check if the ad is approved
        if (ad.status !== 'approved') {
            return res.status(403).json({
                success: false,
                message: 'This ad is not approved!'
            });
        }

        // check if the ad is already promoted
        if (ad.promotion_type !== "normal") {
            return res.status(403).json({
                success: false,
                message: 'This ad is already promoted!'
            });
        }



        // get the promotion details
        const promotion = await prisma.promotions.findUnique({
            where: {
                promotion_type: promotion_type
            },
        });

        if (!promotion) {
            return res.status(404).json({
                success: false,
                message: 'Promotion not found!'
            });
        }

        const [session_id, url] = await create_checkout_session(promotion_type, promotion.cost);

        // add to transaction table pending payment
        await prisma.transactions.create({
            data: {
                stripe_checkout_id: session_id,
                status: 'pending',
                username: req.user.username,
                ad_id: Number(ad_id),
                promotion: promotion_type,
                amount: promotion.cost,
            }
        });


        // send the checkout url to the frontend with redirection

        return res.status(302).json({
            success: true,
            payment_gateway_url: url
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
