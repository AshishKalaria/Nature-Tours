const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = require("./app");
const connectDB = require("./db/db");

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
