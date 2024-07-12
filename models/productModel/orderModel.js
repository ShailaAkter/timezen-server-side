import mongoose from "mongoose";

const  orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products'
    }],

    quantities: 
    {
        type: Array,
        required: true
    },

    payment: {},

    client: 
    {
        type: mongoose.ObjectId,
        ref: 'users'
    },
    
    status:
    {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
},{timestamps: true})

export default mongoose.model('orders', orderSchema);