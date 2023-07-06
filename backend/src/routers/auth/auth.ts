import express from "express";
import { getUsers, loginUser, protectedRoute, registerUser } from "../../controllers/auth";
import { loginValidation, registerValidation }  from "../../middlewares/validators/auth";
import { validationMiddleware } from "../../middlewares/validations-middleware";
import { userAuth } from "../../middlewares/auth-middleware";


const router = express.Router();




router.route("/register")
    .post(registerValidation, validationMiddleware, registerUser)





router.route("/login")
    .post(loginValidation, validationMiddleware, loginUser)




    

router.route("/get-users")
    .get(getUsers)




    
/*
    protected route: only authorized users can access this route.
    protected route will always contain userAuth middleware.

    If you are implementing an authorized route, do like this--
*/
router.route("/protected")
    .get(userAuth, protectedRoute)





export default router;