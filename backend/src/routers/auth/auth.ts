import express from "express";
import { getUsers, loginUser, logoutUser, protectedRoute, registerUser, verifyEmail } from "../../controllers/auth";
import { loginValidation, registerValidation }  from "../../middlewares/validators/auth";
import { validationMiddleware } from "../../middlewares/validations-middleware";
import { userAuth } from "../../middlewares/auth-middleware";


const router = express.Router();




router.route("/register")
    .post(registerValidation, validationMiddleware, registerUser)




router.route("/login")
    .post(loginValidation, validationMiddleware, loginUser)




// logout is a protected route
router.route("/logout")
    .get(userAuth, logoutUser)




router.route("/get-users")
    .get(getUsers)




/*
    protected route: only authorized users can access this route.
    protected route will always contain userAuth middleware.

    If you are implementing an authorized route, do like this--
*/
router.route("/protected")
    .get(userAuth, protectedRoute)






router.route("/verify-email/:user_id/:token")
    .get(verifyEmail)





export default router;