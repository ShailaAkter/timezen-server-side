import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true, 
    },
    slug:
    {
        type: String,
        required: true, 
    },
    price:
    {
        type: Number,
        required: true, 
    },
    model:
    {
        type: String,
        required: true, 
        unique: true,
    },
    description:
    {
        type: String,
        required: true, 
    },
    caseSize:
    {
        type: String,
        required: true, 
    },
    dial:
    {
        type: String,
        required: true, 
    },
    dialColor:
    {
        type: String,
        required: true, 
    },
    glassMaterial:
    {
        type: String,
        required: true, 
    },
    movement:
    {
        type: String,
        required: true, 
    },
    strapColor:
    {
        type: String,
        required: true, 
    },
    strapMaterial:
    {
        type: String,
        required: true, 
    },
    waterResistance:
    {
        type: String,
        required: true, 
    },
    brand:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'brands', 
        required: true,
    },
    quantity:
    {
        type: Number,
        required: true, 
    },
    photo:
    {
        data: Buffer,
        contentType: String
    },
    shippingAddress:
    {
        type: Boolean, 
    }

}, {timestamps:true})

export default mongoose.model('products', productSchema);