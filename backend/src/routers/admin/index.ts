import { Router } from "express";

import ad_review_router from "./ad_review";
import mute_user_router from "./user_management";
import admin_login_router from "./login";
import transactionsRouter from "./transaction";
import { adminAuth } from "../../middlewares/auth.middleware";
import { get_all_users } from "../../controllers/user_management.controller";
import { get_dashboard_data } from "../../controllers/dashboard.controller";

const router = Router();

router.use("/ad_reviews", adminAuth, ad_review_router);
router.use("/mute_user", adminAuth, mute_user_router);
router.use("/transactions", adminAuth, transactionsRouter);
router.use("/login", admin_login_router)

router.get("/users", adminAuth, get_all_users);
router.get("/dashboard", adminAuth, get_dashboard_data);

export default router;