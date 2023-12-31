import express from "express";

import {
  getUsers,
  loginUser,
  logoutUser,
  protectedRoute,
  registerUser,
  verifyEmail,
} from "../../controllers/auth.controller";
import {
  loginValidation,
  registerValidation,
} from "../../middlewares/validators/auth.validator.middleware";

import { validationMiddleware } from "../../middlewares/validation.middleware";
import {
  nonPhoneVerifiedUserAuth,
  userAuth,
} from "../../middlewares/auth.middleware";
import { verify_phone } from "../../controllers/phone_verification.controller";

const router = express.Router();

router
  .route("/register")
  .post(registerValidation, validationMiddleware, registerUser);

router.route("/login").post(loginValidation, validationMiddleware, loginUser);

// logout is not a protected route as anyone can go this link
router
  .route("/logout")
  // .get(userAuth, logoutUser)
  .get(logoutUser);

router.route("/get-users").get(getUsers);

/*
    protected route: only authorized users can access this route.
    protected route will always contain userAuth middleware.

    If you are implementing an authorized route, do like this--
*/
router.route("/protected").get(userAuth, protectedRoute);

router.route("/verify-email/:username/:token").get(verifyEmail);

router.post("/verify-phone", nonPhoneVerifiedUserAuth, verify_phone);

export default router;
