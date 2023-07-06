import express from "express";
import { getUsers, registerUser } from "../../controllers/auth";
import { registerValidation }  from "../../middlewares/validators/auth";
import { validationMiddleware } from "../../middlewares/validations-middleware";
//import { get_a_thing, create_a_thing, update_a_thing, delete_a_thing } from "../../controllers/things.controller";

const router = express.Router();


router.route("/register")
    .post(registerValidation, validationMiddleware, registerUser)



router.route("/get-users")
    .get(getUsers)

export default router;