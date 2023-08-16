import express from "express";
import { userAuth } from "../../middlewares/auth-middleware";
import { postAdValidation } from "../../middlewares/validators/ads";
import { validationMiddleware } from "../../middlewares/validations-middleware";
import { get_ad_details, get_ads, postAd } from "../../controllers/ads";

const router = express.Router();



    



/*
 
1. get all ads,
   post ad  : api/ads/
   post ad is a protected route

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
    .post(userAuth, postAdValidation, validationMiddleware, postAd)



// ad-details
router.route("/:adId")
    .get(get_ad_details)


export default router;