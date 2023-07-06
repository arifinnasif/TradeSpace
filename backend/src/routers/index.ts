import express from "express";
const router = express.Router();


//import routers
import authRouter from "./auth/auth";


// initialize routers
router.use("/auth", authRouter);

export default router;