import express from "express";
import { userAuth } from "../../middlewares/auth.middleware";
import {
  get_user_profile,
  update_user_profile,
} from "../../controllers/user_profile.controller";
import { update_user_validation } from "../../middlewares/validators/update_user.validator.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import user_transaction_router from "./transactions";
import user_notification_router from "./notifications";
import { get_user_own_ads } from "../../controllers/user_own_ads.controller";

const router = express.Router();

// get user profile: /api/profile
router
  .route("/")
  .get(userAuth, get_user_profile)
  .put(
    userAuth,
    update_user_validation,
    validationMiddleware,
    update_user_profile
  );

router.route("/my_ads").get(userAuth, get_user_own_ads);

router.use("/transactions", userAuth, user_transaction_router);
router.use("/notifications", userAuth, user_notification_router);

export default router;
