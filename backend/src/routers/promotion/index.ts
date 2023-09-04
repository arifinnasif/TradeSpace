import { Router } from "express";

import { get_promotions } from "../../controllers/payment.controller";

const router = Router();

router
    .route("/promotions")
    .get(get_promotions);

export default router;