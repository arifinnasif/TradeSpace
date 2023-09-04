import express from "express";
const router = express.Router();

//import routers
import authRouter from "./auth/auth";
import thingsRouter from "./things/things";
import adsRouter from "./ad/ad";
import adminRouter from "./admin";
import profileRouter from "./user";
import homeRouter from "./home/home";
import chatRouter from "./chat";

// initialize routers
router.use("/auth", authRouter);
router.use("/things", thingsRouter);
router.use("/ads", adsRouter);
router.use("/admin", adminRouter);
router.use("/profile", profileRouter);
router.use("/home", homeRouter);
router.use("/chat", chatRouter);

export default router;
