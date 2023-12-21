const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

const tours = fs.readFileSync();

app.get("/api/v1/tours", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
