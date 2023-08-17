import express from "express";
import { userAuth } from "../../middlewares/auth-middleware";
import { postAdValidation } from "../../middlewares/validators/ads";
import { validationMiddleware } from "../../middlewares/validations-middleware";
import { get_ad_details, get_ads, postAd } from "../../controllers/ads";
import { handle_payment_initialization } from "../../controllers/payment.controller";

const router = express.Router();



// post ad is a protected route
router.route("/post-ad")
    .post(userAuth, postAdValidation, validationMiddleware, postAd)



/*
 
1. get all ads: api/ads/

2. search ads : api/ads/?search=keyword

3. filter ads : api/ads/?
                        promo_types[]=promo1&promo_types[]=promo2&
                        cat[]=cat1&cat[]=cat2&
                        sort=high-to-low/low-to-high&
                        geo=lat:long&
                        ad_type=sell/buy&
                        page=x&
                        limit=y

 */

router.route("/")
    .get(get_ads)



// ad-details
router.route("/:adId")
    .get(get_ad_details)
    .put(userAuth, handle_payment_initialization)


export default router;