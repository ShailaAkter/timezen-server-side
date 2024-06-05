import JWT from 'jsonwebtoken'
import userModel from '../models/usersModel/userModel.js';

//protected routes using json webtoken
export const requireSignIn = async (req, res, next) =>
{
    try
    {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch(error)
    {
        console.log(`Middlware error = ${error}`);
    }
}

//protected routes for admin
export const isAdmin = async (req, res, next) =>
{
    try
    {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1)
        {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access!"
            })
        }
        else
        {
            next();
        }
    }
    catch(error)
    {
        console.log(`isAdmin middleware error = ${error}`);

        return res.status(401).send({
            success: false,
            message: "Error in Admin Middleware!"
        })
    }
}