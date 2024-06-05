import userModel from "../../models/usersModel/userModel.js";
import nodemailer from 'nodemailer'


export const forgotPasswordController = async(req, res) =>
{
    try
    {
        const {email} = req.body;

        const user = await userModel.findOne({email});
        if(!user)
        {
            return res.status(200).send({
                success: false,
                message: "This email is not registered, try again!"
            })
        }



        const userVerificationCode = user.verificationCode;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:
            {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            },
        })


        var mailOptions = 
        {
            from: process.env.AUTH_EMAIL,
            to: user.email,
            subject: 'Reset your password',
            text: `${process.env.FRONTEND_API_URL}/reset-password/${userVerificationCode},`,
        }

        transporter.sendMail(mailOptions, (error, info) =>
        {
            if (error) 
            {
                console.log(error);
                return res.status(500).send({
                    success: false, 
                    message: "Error sending email" });
            } 
            else 
            {
                return res.status(200).send({ 
                    success: true, 
                    message: "Reset link has been sent to your email!",
                    userVerificationCode
                });
            }
        })


    }
    catch(error)
    {
        console.log(`forgot password controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: "Error occured while Creating link!",
            error
            
        })
    }
}

