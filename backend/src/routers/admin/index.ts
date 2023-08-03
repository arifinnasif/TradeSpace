import { Router } from "express";

import adReviewRouter from "./ad_review";

const router = Router();

router.use("/ad_review", adReviewRouter);

export default router;