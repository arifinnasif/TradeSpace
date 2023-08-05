import express from "express";
import { userAuth } from "../../middlewares/auth-middleware";


const router = express.Router();



router.route("/")
    .get()