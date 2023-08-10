import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import apiRouter from "./routers";
import passport from "passport";

import * as dotenv from "dotenv";

dotenv.config();

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

// initialize backend router
app.use("/api", apiRouter);

export default app;
