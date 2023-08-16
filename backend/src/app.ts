import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import apiRouter from "./routers";
import passport from "passport";

import * as dotenv from "dotenv"

dotenv.config()

const { CLIENT_URL } = require("./constants");




const app = express();

const endpointSecret = "whsec_db09a7108b5b210061c92fe5b792b2165b3211c97d3a1d22fdd5bc00fa8589aa";

// import { stripe } from "./stripe_test";
import { stripe } from "./controllers/payment.controller"

const fulfillOrder = (session: any) => {
    // TODO: fill me in
    console.log("Fulfilling order", session);
}

const createOrder = (session: any) => {
    // TODO: fill me in
    console.log("Creating order", session);
}

const emailCustomerAboutFailedPayment = (session: any) => {
    // TODO: fill me in
    console.log("Emailing customer", session);
}

// initialize backend router
app.use('/webhook', express.raw({ type: 'application/json' }));
app.post("/webhook", (req: any, res: any) => {
    // console.log(req);
    const payload = req.body;
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        console.log("<===event===>")
        console.log(event);
    } catch (err: any) {
        console.log(err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const session: any = event.data.object;
            // Save an order in your database, marked as 'awaiting payment'
            createOrder(session);

            // Check if the order is paid (for example, from a card payment)
            //
            // A delayed notification payment will have an `unpaid` status, as
            // you're still waiting for funds to be transferred from the customer's
            // account.
            if (session.payment_status === 'paid') {
                fulfillOrder(session);
            }

            break;
        }

        case 'checkout.session.async_payment_succeeded': {
            const session = event.data.object;

            // Fulfill the purchase...
            fulfillOrder(session);

            break;
        }

        case 'checkout.session.async_payment_failed': {
            const session = event.data.object;

            // Send an email to the customer asking them to retry their order
            emailCustomerAboutFailedPayment(session);

            break;
        }
    }

    res.status(200).end();
})


// import passport-middleware
import "./middlewares/passport-middleware";




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