const morgan = require("morgan");
const express = require("express");
const userRouter = require("./routes/userRouter.routes");
const tourRouter = require("./routes/tourRouter.routes");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
    console.log("Hello from the middleware");
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);

module.exports = app;
