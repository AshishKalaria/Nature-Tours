const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log("MongoDB connection failed with error: ", err);
        process.exit(1);
    }
};

module.exports = connectDB;
