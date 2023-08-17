import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import apiRouter from "./routers";
import passport from "passport";
import prisma from "../prisma/prisma_client";

import * as dotenv from "dotenv"

dotenv.config()

const { CLIENT_URL } = require("./constants");




const app = express();

const endpointSecret = "whsec_db09a7108b5b210061c92fe5b792b2165b3211c97d3a1d22fdd5bc00fa8589aa";

// import { stripe } from "./stripe_test";
import { stripe } from "./controllers/payment.controller"
import { method } from "lodash";

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
    await prisma.transactions.update({
        where: {
            stripe_checkout_id: session.id
        },
        data: {
            status: "awaiting_payment",
            method: session.payment_method_types[0],
        }
    });
    console.log("Creating order");
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

// initialize backend router
app.use('/webhook', express.raw({ type: 'application/json' }));
app.post("/webhook", async (req: any, res: any) => {
    // console.log(req);
    const payload = req.body;
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
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
            const transaction = await prisma.transactions.update({
                where: {
                    stripe_checkout_id: session.id
                },
                data: {
                    receipt_url: session.receipt_url,
                }
            });
        }
        case 'checkout.session.completed': {
            const session: any = event.data.object;
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
})


// import passport-middleware
import "./middlewares/passport-middleware";
import { notify_user } from "./controllers/user_notification.controller";




// initialize middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(passport.initialize());




// initialize backend router
app.use("/api", apiRouter);


app.use(bodyParser.json());




export default app;