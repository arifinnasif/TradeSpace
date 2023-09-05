import express from "express";
import { userAuth } from "../../middlewares/auth.middleware";
import { postAdValidation } from "../../middlewares/validators/ad.validator.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";
import { get_ad_details, get_ads, postAd } from "../../controllers/ad.controller";
import { handle_payment_initialization } from "../../controllers/payment.controller";

const router = express.Router();

/*
 
1. get all ads,
   post ad  : api/ads/
   post ad is a protected route

2. search ads : api/ads?search_string=keyword

3. filter ads : api/ads/?
                        promo_types[]=promo1&promo_types[]=promo2&
                        cat[]=cat1&cat[]=cat2&
                        sort=price,asc/desc& // sort=days_used,desc
                        geo=lat:long&
                        ad_type=sell/buy&
                        page=x&
                        limit=y

 */

router
  .route("/")
  .get(get_ads)
  .post(userAuth, postAdValidation, validationMiddleware, postAd);

// ad-details
router
  .route("/:adId")
  .get(get_ad_details)
  .put(userAuth, handle_payment_initialization);

export default router;
