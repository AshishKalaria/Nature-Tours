const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
const app = require("../../app");
const connectDB = require("../../db/db");
const Tour = require("../../models/tour.model");

dotenv.config({ path: "./.env" });
const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listning on port ${port}...`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed!!! ", err);
    });

//read json file
const tours = JSON.parse(
    fs.readFileSync(path.join(__dirname, "tours-simple.json"), "utf-8")
);

//import data into MongoDB database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("data successfully loaded");
    } catch (err) {
        console.log(err);
    }
    process.exit(0);
};

//delete all the data from MongoDB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("data deleted successfully");
    } catch (err) {
        console.log(err);
    }
    process.exit(0);
};

console.log(process.argv);

if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}
