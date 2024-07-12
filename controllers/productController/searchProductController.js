import productModel from "../../models/productModel/productModel.js";

export const searchProductController = async(req, res) =>
{
    try
    {
        const {keyword} = req.params
        const products = await productModel.find({
            $or:
            [
                {name: {$regex: keyword, $options: "i"}},
                {model: {$regex: keyword, $options: "i"}},
                {dialColor: {$regex: keyword, $options: "i"}},
                {strapColor: {$regex: keyword, $options: "i"}},
                {strapMaterial: {$regex: keyword, $options: "i"}},
            ]
        })
        .select("-photo")
        res.json(products)
    }
    catch(error)
    {
        console.log(`get search product controller error = ${error}`);
        res.status(400).send({
            succsess: false,
            message: " Error while searching product",
            error
        })
    }
}