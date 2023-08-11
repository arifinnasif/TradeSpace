import { Router } from "express";
import { loginAdmin } from "../../controllers/auth";
import { adminLoginValidation } from "../../middlewares/validators/auth";
import { validationMiddleware } from "../../middlewares/validations-middleware";

const router = Router();


router.route("/")

    .post(adminLoginValidation, validationMiddleware, loginAdmin);

export default router;