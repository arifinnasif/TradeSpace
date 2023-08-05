import express from "express";
import { userAuth } from "../../middlewares/auth-middleware";
import { get_user_profile } from "../../controllers/user_profile";


const router = express.Router();



// get user profile: /api/profile
router.route("/")
    .get(userAuth, get_user_profile)


export default router;