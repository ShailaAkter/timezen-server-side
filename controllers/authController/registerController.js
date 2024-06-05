import userModel from "../../models/usersModel/userModel.js";
import { checkCapital, checkEmail, checkPassword, hashPassword } from "../../utils/authValidation.js";

export const registerController = async(req, res) =>
{
    try
    {
        const {firstname, lastname, email, password, phone, address} = req.body;

        //firstName validation
        if(!firstname)
        {
            return res.send({ message: "Firstname is Required"});
        }

        const first_name = checkCapital(firstname.trim());

        if(first_name.length < 2 || first_name.length > 20)
        {
            return res.send({ message: "Firstname must contain more than 2 character"});
        }

        //lastName validation
        if(!lastname)
        {
            return res.send({ message: "Lastname is Required"});
        }

        const last_name = checkCapital(lastname.trim());

        if(last_name.length < 2 || last_name.length > 20)
        {
            return res.send({ message: "Lastname must contain more than 2 character"});
        }

        //email validation
        if(!email)
        {
            return res.send({message: "Email is required!"});
        }

        if(checkEmail(email) === false)
        {
            return res.send({message: "Please insert correct email format!"});
        }

        //password valiation
        if(!password)
        {
            return res.send({message: "Password is required!"});
        }
        if(password.length < 6 || password.length > 12)
        {
            return res.send({message: "Password must contain 6 character!"});
        }
        if(checkPassword(password) === false)
        {
            return res.send({message: "Password must contain atleast a small letter, a capital letter and a digit!"});
        }

        
        //phone validation
        if(!phone)
        {
            return res.send({message: "Phone is required!"});
        }

        const phoneRegex = /^\d+$/;

        if (!phoneRegex.test(phone)) 
        {
            return res.send({ message: "Phone number must contain only digits" });
        }

        if(phone.lenght < 6 || phone.length > 12)
        {
            return res.send({ message: "Invalid Phone number"});
        }

        //address validation
        if(!address)
        {
            return res.send({message: "Address is required!"});
        }

        const modified_address = checkCapital(address.trim());

        if(modified_address.length < 3 || modified_address.length > 100 )
        {
            return res.send({ message: "Address contain 3 character"});
        }

        const modifiied_verification_code = Math.random().toString(36).slice(-10);

        //check existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser)
        {
            return res.status(200).send({
                success: true,
                message: "User is already been registered, please Login!"
            });
        }

        //register a new user
        const hashedPassword = await hashPassword(password);

        //save new user
        const user = await new userModel({firstname: first_name, lastname: last_name, email, password: hashedPassword, phone, address: modified_address, verificationCode: modifiied_verification_code}).save();

        res.status(200).send({
            success: true,
            message: "User has been registered successfully!", 
            user
        });

    }
    catch(error)
    {
        console.log(`register controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: "Error occured while registering User!",
            error
            
        })
    }
};