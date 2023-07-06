import express from "express";
import { getUsers } from "../../controllers/auth";
//import { get_a_thing, create_a_thing, update_a_thing, delete_a_thing } from "../../controllers/things.controller";

const router = express.Router();


router.route("/register")

    .get((req, res) => {
        res.send("register route works!");
    })



router.route("/get-users")
    .get(getUsers)

export default router;