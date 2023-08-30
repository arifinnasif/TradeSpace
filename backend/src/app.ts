import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import apiRouter from "./routers";
import passport from "passport";
import prisma from "../prisma/prisma_client";
import { stripe_webhook_handler } from "./controllers/payment.controller"

import * as dotenv from "dotenv";

dotenv.config();

const { CLIENT_URL } = require("./constants");

const app = express();




// initialize webhook (this line must be before app.use(express.json()))
app.use('/webhook', express.raw({ type: 'application/json' }));
app.post("/webhook", stripe_webhook_handler);



// import passport-middleware
import "./middlewares/passport-middleware";

// initialize middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
// app.use(cors({ origin: true, credentials: true }));
app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));
app.use(passport.initialize());

// initialize backend router
app.use("/api", apiRouter);
app.use(bodyParser.json());

export default app;

