import express from "express";
import { userAuth } from "../../middlewares/auth-middleware";
import { postAd } from "../../controllers/ads";

const router = express.Router();

// post ad is a protected route
router.route("/post-ad")
    .post(userAuth, postAd)

export default router;