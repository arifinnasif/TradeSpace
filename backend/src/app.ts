import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import apiRouter from "./routers";



const app = express();


app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", apiRouter);




export default app;