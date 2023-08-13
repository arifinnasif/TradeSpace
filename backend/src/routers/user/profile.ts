import express from "express";
import { userAuth } from "../../middlewares/auth-middleware";
import { get_user_profile, update_user_profile } from "../../controllers/user_profile";
import { update_user_validation } from "../../middlewares/validators/update_user";
import { validationMiddleware } from "../../middlewares/validations-middleware";


const router = express.Router();



// get user profile: /api/profile
router.route("/")
    .get(userAuth, get_user_profile)
    .put(userAuth,update_user_validation, validationMiddleware, update_user_profile)


export default router;