import brandModel from "../../models/brandModel/brandModel.js";

export const deleteBrandController = async (req, res) =>
{
    try
    {
        const {id} = req.params;
        await brandModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true, 
            message: "Brand deleted successfully!"
        })
    }
    catch(error)
    {
        console.log(`delete brand controller error = ${error}`);

        res.status(500).send({
            success: false,
            message: 'Error occured deleting brand!',
            error
        })
    }
}