const fs = require("fs");
const path = require("path");

const tours = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "..", "dev-data", "data", "tours-simple.json")
    )
);

const checkId = (req, res, next, val) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "failed",
            message: "Invalid Id",
        });
    }
    next();
};

const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours,
        },
    });
};

const getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);
    if (tour) {
        res.status(200).json({
            status: "success",
            data: {
                tours: tour,
            },
        });
    } else {
        res.status(404).json({
            status: "failed",
            message: "The tour does not exist",
        });
    }
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(
        path.join(__dirname, "dev-data", "data", "tours-simple.json"),
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: "success",
                data: {
                    tour: newTour,
                },
            });
        }
    );
};

const updateTour = (req, res) => {
    res.status(201).json({
        status: "success",
        data: {
            tour: "<updated tour here...>",
        },
    });
};

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "failed",
            message: "The tour does not exist",
        });
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
};

module.exports = {
    checkId,
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
};