import { Router } from "express";

import adReviewRouter from "./ad_review";
import mute_user from "./mute_user";
import { adminAuth } from "../../middlewares/auth-middleware";

const router = Router();

router.use("/ad_review", adminAuth, adReviewRouter);
router.use("/mute_user", adminAuth, mute_user);

export default router;