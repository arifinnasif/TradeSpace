import express from "express";
import { get_categories_with_ads_count } from "../../controllers/home.controller";

const router = express.Router();

router.route("/categories").get(get_categories_with_ads_count);

export default router;
