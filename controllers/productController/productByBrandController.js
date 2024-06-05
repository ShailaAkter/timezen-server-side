import brandModel from "../../models/brandModel/brandModel.js"
import productModel from "../../models/productModel/productModel.js";

export const productByBrandController = async (req, res) =>
{
    try
    {
        const brand = await brandModel.findOne({slug: req.params.slug});
        const products = await productModel.find({brand}).populate('brand');

        res.status(200).send({
            success: true, 
            brand, 
            products
        })
    }
    catch(error)
    {
        console.log(`get product by brand filter controller error = ${error}`)
        res.status(400).send({
            success: false, 
            message: "Error while getting product by brand!",
            error
        })
    }
}