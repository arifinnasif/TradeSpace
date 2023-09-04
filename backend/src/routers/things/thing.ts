import express from "express";
import { get_all_things, get_a_thing, create_a_thing, update_a_thing, delete_a_thing } from "../../controllers/thing.controller";

let router = express.Router();

router.use((req, res, next) => {
    console.log("accessing things.ts");
    next();
});

router.route("/")

    .get(get_all_things)

    .post(create_a_thing);

router.route("/:thingId")

    .get(get_a_thing)

    .put(update_a_thing)

    .delete(delete_a_thing);

export default router;
