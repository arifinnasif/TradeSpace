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



// import passport-middleware
import "./middlewares/passport-middleware";




// initialize middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(passport.initialize());

const endpointSecret = "whsec_db09a7108b5b210061c92fe5b792b2165b3211c97d3a1d22fdd5bc00fa8589aa";

import { stripe } from "./stripe_test";


// initialize backend router
app.use("/api", apiRouter);
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
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    res.status(200).end();
})




export default app;