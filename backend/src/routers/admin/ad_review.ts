import { Router } from "express";

import { get_all_pending_reviews, get_pending_review_details } from "../../controllers/ad_review.controller";

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

    .get(get_pending_review_details);


export default router;