const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            status: "success",
            results: users.length,
            data: {
                users,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: err,
        });
    }
};

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } else {
        res.status(404).json({
            status: "failed",
            message: "The User does not exist",
        });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(201).json({
            status: "success",
            data: {
                user: updateUser,
            },
        });
    } catch (err) {
        return res.status(404).json({
            status: "failed",
            message: err,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        return res.status(404).json({
            status: "failed",
            data: err,
        });
    }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
