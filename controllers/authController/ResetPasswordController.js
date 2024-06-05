import userModel from "../../models/usersModel/userModel.js";
import { checkPassword, hashPassword } from "../../utils/authValidation.js";

export const resetPasswordController = async(req, res) =>
{
    try
    {
        const { email, newPassword, verificationCode} = req.body;

        if(!email)
        {
            res.status(400).send({message: "Email is required"});
        }

        if(!newPassword)
        {
            res.status(400).send({message: "New Password is required"});
        }

        //check verification code and email
        const user = await userModel.findOne({email});
        console.log(user);

        //validation
        if(!user) 
        {
            return res.status(404).send({
                success: false,
                message: "Invalid email or verification code"
            })
        }

                //password valiation
        if(!newPassword)
        {
            return res.send({message: "Password is required!"});
        }
        if(newPassword.length < 6 || newPassword.length > 12)
        {
            return res.send({message: "Password must contain 6 character!"});
        }
        if(checkPassword(newPassword) === false)
        {
            return res.send({message: "Password must contain atleast a small letter, a capital letter and a digit!"});
        }


        const hashed = await hashPassword(newPassword);

        await userModel.findByIdAndUpdate(user._id, {password: hashed});
        console.log(verificationCode)
        if(verificationCode === user.verificationCode)
        {
            user.verificationCode = Math.random().toString(36).slice(-10);
            await user.save();

            res.status(200).send({
                success: true,
                message: "Password Reset Successfully!"
            });
        }
        else
        {
            return res.send({message: "Reset Link session is expired. Try again!"});
        }

    }
    catch(error)
    {
        console.log(`reset resetPasswordController controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: "Error occured while reseting password!",
            error
            
        })
    }
} 

export const getResetPasswordController = async( req, res) =>
{
    try 
    {
        const { verificationCode } = req.params;

        if(!verificationCode)
        {
            res.status(400).send({message: "Invalid Link"});
        }

        const user = await userModel.findOne({verificationCode});
        if(!user)
        {
            res.status(400).send({message: "User not Found"});
        }

        await res.status(200).send({
            success: true,
            message: " Reset Link Successfully!",
            verificationCode
        });
    } 
    catch(error)
    {
        console.log(`reset forgotPasswordController controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: "Error occured while reseting password!",
            error
            
        })
    }
}