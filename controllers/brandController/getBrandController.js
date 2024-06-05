import brandModel from "../../models/brandModel/brandModel.js";

export const getBrandController = async (req, res) =>
{
    try
    {
        const {slug} = req.params;
        const brand = await brandModel.findOne({slug})
        res.status(200).send({
            success: true, 
            message: "Get brand successfully!",
            brand
        })

    }
    catch(error)
    {
        console.log(`get brand by id controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: 'Error occured getting brand!',
            error
        })
    }
}