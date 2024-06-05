import mongoose from "mongoose";

// creating watchTime users model
const userSchema =  new mongoose.Schema({
    firstname: 
    {
        type: String,
        required: true,
        trim: true,        
    },

    lastname:
    {
        type: String,
        required: true,
        trim: true,        
    },

    email: 
    {
        type: String,
        required: true,
        unique: true,
        trim: true,     
        lowercase: true,
    },

    password: 
    {
        type: String,
        required: true,
        trim: true,
    },

    phone: 
    {
        type: String,
        required: true,
        trim: true,        
    },

    address: 
    {
        type: String, 
        required: true,
        trim: true,        
    },

    verificationCode: 
    {
        type: String, 
        unique: true,   

    },

    role: 
    {
        type: Number, 
        default: 0
    }

}, {timestamps: true});

export default mongoose.model('users', userSchema);