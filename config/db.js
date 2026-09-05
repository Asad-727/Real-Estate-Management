import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const DB = await mongoose.connect(process.env.MONGO_URI);

        console.log(
            "DATABASE SUCCESSFULLY CONNECTED",
            DB.connection.host
        );
    } catch (error) {
        console.error(
            "DATABASE CONNECTION FAILED:",
            error.message
        );

        process.exit(1);
    }
};

export default connectDB;