import express from "express";
const router = express.Router();


//import routers
import authRouter from "./auth/auth";
import thingsRouter from "./things/things"
import adsRouter from "./ads/ads"


// initialize routers
router.use("/auth", authRouter);
router.use("/things", thingsRouter);
router.use("/ads", adsRouter);

export default router;