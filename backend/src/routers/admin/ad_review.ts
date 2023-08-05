import { Router } from "express";

import { approve_pending_review, decline_pending_review, get_all_pending_reviews, get_pending_review_details } from "../../controllers/ad_review.controller";

const router = Router();

// router.use((req, res, next) => {
//     console.log("accessing ad_review.ts");
//     next();
// }
// 
// );

router.route("/")

    .get(get_all_pending_reviews);





router.route("/:id")

    .get(get_pending_review_details)

    .put(approve_pending_review)
    
    .delete(decline_pending_review);


export default router;