import productModel from "../../models/productModel/productModel.js";

export const productCountController = async(req, res) =>
{
    try
    {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(400).send({
            succsess: false,
            message: " Error while counting product",
            error
        })
    }
}

export const productPerPageContoller = async (req, res) =>
{
    try
    {
        const perPage = 2;
        const page = req.params.page? req.params.page: 1;
        const products = await productModel
        .find({})
        .select("-photo")
        .skip((page-1) * perPage)
        .limit(perPage)
        .sort({createdAt: -1});

        res.status(200).send({
            success: true,
            products
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while counting per page",
            error
        })
    }
}