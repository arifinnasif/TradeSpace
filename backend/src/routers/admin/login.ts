import { Router } from "express";
import { loginAdmin } from "../../controllers/auth.controller";
import { adminLoginValidation } from "../../middlewares/validators/auth.validator.middleware";
import { validationMiddleware } from "../../middlewares/validation.middleware";

const router = Router();


router.route("/")

    .post(adminLoginValidation, validationMiddleware, loginAdmin);

export default router;