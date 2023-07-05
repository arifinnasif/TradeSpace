import express from "express";
import thingsRouter from "./things/things";


let router = express.Router();

router.use("/things", thingsRouter);

export default router;
