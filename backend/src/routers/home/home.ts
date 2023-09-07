import express from "express";
import {
  get_ads_by_category,
  get_categories_with_ads_count,
} from "../../controllers/home.controller";

const router = express.Router();

router.route("/categories").get(get_categories_with_ads_count);

router.route("/category/:category_name").get(get_ads_by_category);

export default router;
