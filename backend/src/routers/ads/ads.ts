import express from "express";
import { userAuth } from "../../middlewares/auth-middleware";
import { postAdValidation } from "../../middlewares/validators/ads";
import { validationMiddleware } from "../../middlewares/validations-middleware";
import { get_ad_details, get_all_ads, postAd } from "../../controllers/ads";

const router = express.Router();



// post ad is a protected route
router.route("/post-ad")
    .post(userAuth, postAdValidation, validationMiddleware, postAd)




// get all ads
router.route("/")
    .get(get_all_ads)



// ad-details
router.route("/:adId")
    .get(get_ad_details)


export default router;