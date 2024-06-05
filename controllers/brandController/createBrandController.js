import slugify from "slugify";
import brandModel from "../../models/brandModel/brandModel.js";

export const createBrandController = async (req, res) =>
{
    try
    {
        const {name} = req.body
        if(!name) 
        {
            return res.send({message: "Brand name is required!"});
        }

        const existingBrand = await brandModel.findOne({name});
        if(existingBrand)
        {
            return res.status(200).send({
                success: false,
                message: "Brand already exists!"
            })
        }

        const brand = await new brandModel({name, slug: slugify(name)}).save();

        res.status(201).send({
            success: true,
            message: 'New brand created!',
            brand

        })

    }
    catch(error)
    {
        console.log(`create brand controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: 'Error occured while creating brand!',
            error
        })
    }
}