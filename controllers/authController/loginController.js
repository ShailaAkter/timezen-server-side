import JWT from "jsonwebtoken";
import { comparedPassword } from "../../utils/authValidation.js";
import userModel from "../../models/usersModel/userModel.js";

export const loginController = async(req, res) =>
{
    try
    {
        const {email, password} = req.body;
        
        if(!email || !password) 
        {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }

        //check user
        const user = await userModel.findOne({email});
        if(!user)
        {
            return res.status(404).send({
                success: false, 
                message: "This email is not registerd. Try again!"
            })
        }

        //compare the password with hashedpassword
        const match = await comparedPassword(password, user.password);
        if(!match)
        {
            return res.status(200).send({
                success: false,
                message: "Invalid Password!",
            })
        }

        //create token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).send({
            success: true,
            message: "User has been logged in successfully!",
            user: 
            {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                address: user.address,
                phone: user.phone,
                role: user.role
            }, token
        });
    }
    catch(error)
    {
        console.log(`login controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: "Error occured while login!",
            error
        })
    }
}