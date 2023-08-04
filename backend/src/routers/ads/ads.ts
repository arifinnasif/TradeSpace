import express from "express";
import { userAuth } from "../../middlewares/auth-middleware";
import { postAdValidation } from "../../middlewares/validators/ads";
import { validationMiddleware } from "../../middlewares/validations-middleware";
import { postAd } from "../../controllers/ads";

const router = express.Router();

// post ad is a protected route
router.route("/post-ad")
    .post(userAuth, postAdValidation, validationMiddleware, postAd)

export default router;