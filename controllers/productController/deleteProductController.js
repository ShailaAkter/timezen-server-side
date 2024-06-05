import productModel from "../../models/productModel/productModel.js";

export const deleteProductController = async (req, res) =>
{
    try
    {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted successfully!"
        })
    }
    catch(error)
    {
        console.log(`delete product controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: 'Error occured while deleting product!',
            error
        })
    }
}