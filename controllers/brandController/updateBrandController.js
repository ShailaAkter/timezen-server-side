import slugify from "slugify";
import brandModel from "../../models/brandModel/brandModel.js";

export const updateBrandController = async (req, res) =>
{
    try
    {
        const {name} = req.body;
        const {id} = req.params;
        
        const existingBrand = await brandModel.findOne({name});
        if(existingBrand)
        {
            return res.status(200).send({
                success: false,
                message: "Brand already exists!"
            })
        }

        const brand = await brandModel.findByIdAndUpdate(id,{name, slug:slugify(name)}, {new:true});
        res.status(200).send({
            success: true,
            message: "Brand updated successfully!",
            brand
        })
    }
    catch(error)
    {
        console.log(`update brand controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: 'Error occured while updating brand!',
            error
        })
    }
}