import userModel from "../../models/usersModel/userModel.js";
import { checkCapital, checkPassword, hashPassword } from "../../utils/authValidation.js";

export const updateProfileController = async (req, res) =>
{
    try
    {
        const {firstname, lastname, email, password, address, phone} = req.body;
        const user = await userModel.findById(req.user._id);

        
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
    
            //password valiation
            if(!password)
            {
                return res.send({message: "Previous or new password is required!"});
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
    
            //register a new user
            const hashedPassword = password? await hashPassword(password) : undefined;


            const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
                firstname: first_name , 
                lastname: last_name , 
                password: hashedPassword , 
                phone: phone,
                address: modified_address 
            }, {new: true});


            res.status(200).send({
                success: true, 
                message: "Profile updated successfully!",
                updatedUser
            })
    }
    catch(error)
    {
        console.log(`get update profile controller error = ${error}`)
        res.status(400).send({
            success: false,
            message: "Error while updating user profile!",
            error: error.message
        })
    }
}