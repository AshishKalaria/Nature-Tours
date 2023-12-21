const { Router } = require("express");
const router = Router();
const {
    checkId,
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
} = require("../controllers/tour.controller");

router.param("id", checkId);

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
