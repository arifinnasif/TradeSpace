import { Router } from "express";

import { create_checkout_session } from "../../controllers/payment.controller";

const router = Router();

router.route("/create-checkout-session")
    .get(create_checkout_session)

export default router;