import express from "express";
const router = express.Router();


//import routers
import authRouter from "./auth/auth";
import thingsRouter from "./things/things"
import adsRouter from "./ads/ads"
import adminRouter from "./admin";
import profileRouter from "./user/profile"




// initialize routers
router.use("/auth", authRouter);
router.use("/things", thingsRouter);
router.use("/ads", adsRouter);
router.use("/admin", adminRouter);
router.use("/profile", profileRouter);


export default router;