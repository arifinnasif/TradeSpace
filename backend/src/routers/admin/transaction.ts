import { Router } from "express";
import { get_all_transactions_admin } from "../../controllers/transaction.controller";

const router = Router();

router.route("/transactions")
    .get(get_all_transactions_admin);

export default router;