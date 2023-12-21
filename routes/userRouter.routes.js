const { Router } = require("express");
const router = Router();

const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/user.controller");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
