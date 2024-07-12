import express from "express"
import { registerController } from "../controllers/authController/registerController.js";
import { loginController } from "../controllers/authController/loginController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { forgotPasswordController } from "../controllers/authController/ForgotPasswordController.js";
import { getResetPasswordController, resetPasswordController } from "../controllers/authController/ResetPasswordController.js";
import { updateProfileController } from "../controllers/authController/UpdateProfileController.js";
import { getOrdersController } from "../controllers/authController/GetOrdersController.js";


//router object
const router = express.Router();

//routing for register POST method
router.post('/register', registerController);

//routing for login POST method
router.post('/login', loginController)
// router.post('/login', requireSignIn, isAdmin, loginController)


//protected route auth for user
router.get('/user-auth', requireSignIn, (req,res) =>
{
    res.status(200).send({ok:true})
})

//protected route auth for admin
router.get('/admin-auth', requireSignIn, isAdmin, (req,res) =>
{
    res.status(200).send({ok:true})
})

//forgot password route
router.post('/forgot-password', forgotPasswordController);

//get reset password route by verificationCode
router.get('/reset-password/:verificationCode', getResetPasswordController);


//post reset password route
router.post('/reset-password', resetPasswordController)

//update profile route
router.put('/update-profile', requireSignIn, updateProfileController)

//user orders route
router.get('/orders', requireSignIn, getOrdersController)




export default router;
