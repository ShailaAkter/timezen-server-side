import orderModel from "../../models/productModel/orderModel.js";

export const getOrdersController = async(req, res) =>
{
    try
    {
        const orders = await orderModel.find({client: req.user._id})
        .populate("products", "-photo")
        .populate("client","firstname")
        res.status(200).send({
            success: true,
            message: "Orders fetched successfully",
            orders
        });
    }
    catch(error)
    {
        console.log(`get token for payment controller error = ${error}`);
        res.status(500).send({
            success: false,
            message: "Error while getting orders",
            error
        })
    }
} 