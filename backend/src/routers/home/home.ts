import express from "express";
import { get_categories } from "../../controllers/home.controller";

const router = express.Router();

router.route("/categories").get(get_categories);

export default router;
