import mongoose from "mongoose";


// connect with mongodb database
const connectDB = async() =>
{
    try
    {
        const connectToDB = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Mongodb Database ${connectToDB.connection.host}`);
    }
    catch(error)
    {
        console.log(`Error in Mongodb ${error}`);
    }
};

export default connectDB;