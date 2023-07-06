import express from "express";
//import { get_a_thing, create_a_thing, update_a_thing, delete_a_thing } from "../../controllers/things.controller";

const router = express.Router();


router.route("/")

    .get((req, res) => {
        res.send("working!");
    })

    // .post(create_a_thing)

    // .put(update_a_thing)

    // .delete(delete_a_thing);

export default router;