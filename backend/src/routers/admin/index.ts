import { Router } from "express";

import adReviewRouter from "./ad_review";
import mute_user from "./mute_user";

const router = Router();

router.use("/ad_review", adReviewRouter);
router.use("/mute_user", mute_user);

export default router;