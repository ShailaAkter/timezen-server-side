import slugify from "slugify";
import productModel from "../../models/productModel/productModel.js";
import fs from 'fs';

export const createProductController = async (req, res) =>
{
    try
    {
        const {name, price, model, description, caseSize, dial, dialColor, glassMaterial, movement, strapColor, strapMaterial, waterResistance, brand, quantity, shippingAddress} = req.fields;

        const {photo} = req.files;

        //validation
        if(!name) 
        {
            return res.send({message: "Watch name is required!"});
        }
        if(!price) 
        {
            return res.send({message: "Price is required!"});
        }
        if(!model) 
        {
            return res.send({message: "Model is required!"});
        }
        if(!description) 
        {
            return res.send({message: "Description is required!"});
        }
        if (!caseSize) 
        {
            return res.send({ message: "Case size is required!" });
        }
        if (!dial) 
        {
            return res.send({ message: "Dial information is required!" });
        }
        if (!dialColor) 
        {
            return res.send({ message: "Dial color is required!" });
        }
        if (!glassMaterial) {
            return res.send({ message: "Glass material is required!" });
        }
        if (!movement) 
        {
            return res.send({ message: "Movement type is required!" });
        }
        if (!strapColor) 
        {
            return res.send({ message: "Strap color is required!" });
        }
        if (!strapMaterial) 
        {
            return res.send({ message: "Strap material is required!" });
        }
        if (!waterResistance) 
        {
            return res.send({ message: "Water resistance information is required!" });
        }
        if (!brand) 
        {
            return res.send({ message: "Brand information is required!" });
        }
        if (!quantity) 
        {
            return res.send({ message: "Quantity is required!" });
        }
        if (!shippingAddress) 
        {
            return res.send({ message: "Shipping address is required!" });
        }
        if (!photo) 
        {
            return res.send({ message: "Photo is required!" });
        }

        const existingProduct = await productModel.findOne({model});
        if(existingProduct)
        {
            return res.status(200).send({
                success: false,
                message: "Product already exists!"
            });
        }

       
        const products = new productModel({...req.fields, slug: slugify(name)});
        if(photo)
        {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();

        res.status(201).send({
            success: true,
            message: "Product created succesfully!",
            products
        })
    }
    catch(error)
    {
        console.log(`create product controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: 'Error occured while creating product!',
            error
        })
    }

}