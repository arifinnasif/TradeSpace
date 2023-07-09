import express from "express";
const router = express.Router();


//import routers
import authRouter from "./auth/auth";
import thingsRouter from "./things/things"


// initialize routers
router.use("/auth", authRouter);
router.use("/things", thingsRouter);

export default router;