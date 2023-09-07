import express from "express";
const router = express.Router();

//import routers
import authRouter from "./auth/auth";
import thingsRouter from "./things/thing";
import adsRouter from "./ads/ad";
import adminRouter from "./admin";
import profileRouter from "./user";
import homeRouter from "./home/home";
import chatRouter from "./chat";
import promotionRouter from "./promotion";

// initialize routers
router.use("/auth", authRouter);
router.use("/things", thingsRouter);
router.use("/ads", adsRouter);
router.use("/admin", adminRouter);
router.use("/profile", profileRouter);
router.use("/home", homeRouter);
router.use("/chat", chatRouter);
router.use("/promotions", promotionRouter);

export default router;
