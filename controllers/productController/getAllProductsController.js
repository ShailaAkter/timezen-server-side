import productModel from "../../models/productModel/productModel.js";

export const getAllProductsController = async (req, res) =>
{
    try
    {
        const products = await productModel.find({}).select("-photo").populate('brand').sort({createdAt: -1})

        res.status(201).send({
            success: true, 
            countTotal: products.length,
            message: "All products list",
            products
        })
    }
    catch(error)
    {
        console.log(`get all products controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: 'Error occured while getting all products!',
            error
        })
    }
}