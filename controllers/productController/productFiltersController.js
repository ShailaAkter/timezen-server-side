// filters

import productModel from "../../models/productModel/productModel.js";

export const productFiltersController = async(req, res) =>
{
    try
    {
        const {checkedBrands, checkedPrices} = req.body;
        let args = {}
        if (checkedBrands.length > 0) 
        {
            args.brand = { $in: checkedBrands };
        }

        if (checkedPrices && checkedPrices.length === 2) 
        { 
            args.price = { $gte: checkedPrices[0], $lte: checkedPrices[1] };
        }

        const products = await productModel.find(args);
        res.status(200).send({
            success: true, 
            products
        })
    }
    catch(error)
    {
        console.log(`get product filter controller error = ${error}`);
        res.status(400).send({
            success: false,
            message: "Error while filtering products",
            error
        })
    }
}