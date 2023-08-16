import { Router } from "express";

import ad_review_router from "./ad_review";
import mute_user_router from "./mute_user";
import admin_login_router from "./login";
import { adminAuth } from "../../middlewares/auth-middleware";

const router = Router();

router.use("/ad_review", adminAuth, ad_review_router);
router.use("/mute_user", adminAuth, mute_user_router);
router.use("/login", admin_login_router)

export default router;