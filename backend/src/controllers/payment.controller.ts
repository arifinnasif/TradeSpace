import stripe from "../services/stripe";
import prisma from "../../prisma/prisma_client";
import { create_checkout_session } from "../services/stripe_checkout_session";
import { notify_user } from "./user_notification.controller";


// get the list of promotions
export const get_promotions = async (req: any, res: any) => {
    try {
        const promotions = await prisma.promotions.findMany({
            where: {
                NOT: {
                    promotion_type: "normal"
                }
            }
        });

        return res.status(200).json(promotions);
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
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

        const [session_id, url, payment_intent] = await create_checkout_session(promotion_type, promotion.cost);

        // add to transaction table pending payment
        await prisma.transactions.create({
            data: {
                stripe_checkout_id: String(session_id),
                status: 'pending',
                username: req.user.username,
                ad_id: Number(ad_id),
                promotion: promotion_type,
                amount: promotion.cost,
            }
        });


        // send the checkout url to the frontend with redirection

        return res.status(200).json({
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



const fulfill_order = async (session: any) => {
    const transaction = await prisma.transactions.findUnique({
        where: {
            stripe_checkout_id: session.id
        }
    });

    if (!transaction) {
        console.log("Transaction not found!");
        return;
    }

    const ad = await prisma.ads.update({
        where: {
            id: transaction.ad_id
        },
        data: {
            promotion_type: transaction.promotion
        }
    });

    await prisma.transactions.update({
        where: {
            stripe_checkout_id: session.id
        },
        data: {
            status: "paid",
            method: session.payment_method_types[0],
        }
    });

    // notify the user

    notify_user(ad!.op_username, "promotion_successful", "Your ad has been promoted successfully!", `Your ad #${ad.id} titled "${ad.title}" has been promoted to ${ad.promotion_type} successfully! Check out transaction table for the receipt`)
    console.log("Fulfilled order");
}

const create_order = async (session: any) => {
    console.log("Creating order+");
    // console.log(session.payment_method_types[0])
    await prisma.transactions.update({
        where: {
            stripe_checkout_id: session.id
        },
        data: {
            status: "awaiting_payment",
            method: session.payment_method_types[0],
        }
    });
    console.log("Creating order-");
}

const mark_order_as_failed = async (session: any) => {
    await prisma.transactions.update({
        where: {
            stripe_checkout_id: session.id
        },
        data: {
            status: "failed",
            method: session.payment_method_types[0],
        }
    });

    console.log("order failed");
}


export const stripe_webhook_handler = async (req: any, res: any) => {
    // console.log(req);
    const payload = req.body;
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!);
        // console.log("<===event===>")
        // console.log(event);
    } catch (err: any) {
        console.log(err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'charge.succeeded': {
            // add receipt to transaction table
            const session: any = event.data.object;
            console.log("printing from charge succeed")
            // console.log(session);

            const transaction = await prisma.transactions.updateMany({
                where: {
                    stripe_payment_intent: session.payment_intent
                },
                data: {
                    receipt_url: session.receipt_url,
                }
            });
        }
        case 'checkout.session.completed': {
            const session: any = event.data.object;
            console.log("printing from checkout session completed")
            // console.log(session);
            // Save an order in your database, marked as 'awaiting payment'
            create_order(session);

            // Check if the order is paid (for example, from a card payment)
            //
            // A delayed notification payment will have an `unpaid` status, as
            // you're still waiting for funds to be transferred from the customer's
            // account.
            if (session.payment_status === 'paid') {
                fulfill_order(session);
            }

            break;
        }

        case 'checkout.session.async_payment_succeeded': {
            const session = event.data.object;
            console.log("printing from checkout session async payment succeeded")
            // console.log(session);

            // Fulfill the purchase...
            fulfill_order(session);

            break;
        }

        case 'checkout.session.async_payment_failed': {
            const session = event.data.object;

            // Send an email to the customer asking them to retry their order
            mark_order_as_failed(session);

            break;
        }
    }

    res.status(200).end();
}
