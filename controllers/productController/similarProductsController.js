import productModel from "../../models/productModel/productModel.js";

export const similarProductController = async(req, res) =>
{
    try
    {
        const {productId, brandId} = req.params;

        const products = await productModel.find({
            brand: brandId,
            _id: {$ne: productId}
        }).select("-photo").limit(3).populate("brand");
        res.status(200).send({
            success: true,
            products
        })
    }
    catch(error)
    {
        console.log(`get similar controller error = ${error}`);
        res.status(400).send({
            success: false,
            message: "Error while getting related product",
            error
        })
    }
}