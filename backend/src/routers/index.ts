import express from "express";
const router = express.Router();


//import routers
import authRouter from "./auth/auth";
import thingsRouter from "./things/things";
import adminRouter from "./admin";


// initialize routers
router.use("/auth", authRouter);
router.use("/things", thingsRouter);
router.use("/admin", adminRouter);


export default router;