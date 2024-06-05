import productModel from "../../models/productModel/productModel.js";

export const getProductController = async (req, res) =>
{
    try
    {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('brand');
        res.status(200).send({
        success: true,
        message: "Single Product Fetched",
        product,
      })
    }
    catch(error)
    {
        console.log(`get product controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: 'Error occured while getting product!',
            error
        })
    }
}