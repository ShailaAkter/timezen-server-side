import productModel from "../../models/productModel/productModel.js";

export const productPhotoController = async (req, res) =>
{
    try
    {
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data)
        {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }
    catch(error)
    {
        console.log(`get product photo controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: 'Error occured while getting product photo!',
            error
        })
    }
}