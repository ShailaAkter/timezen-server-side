import brandModel from "../../models/brandModel/brandModel.js";

export const getAllBrandController = async (req, res) =>
{
    try
    {
        const brands = await brandModel.find({});
        res.status(200).send({
            success: true,
            message: "All brand list",
            brands
        })

    }
    catch(error)
    {
        console.log(`get all brand controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: 'Error occured getting all brands!',
            error
        })
    }
}