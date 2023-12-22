const { Router } = require("express");
const router = Router();
const {
    aliasTopTours,
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
} = require("../controllers/tour.controller");

router.route("/top-5-cheap").get(aliasTopTours, getAllTours);

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
