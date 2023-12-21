const fs = require("fs");
const path = require("path");

const users = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "..", "dev-data", "data", "users.json")
    )
);

const getAllUsers = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: users.length,
        data: {
            users,
        },
    });
};

const getUser = (req, res) => {
    const user = users.find((el) => el._id === req.params._id);
    if (user) {
        res.status(200).json({
            status: "success",
            data: {
                users: user,
            },
        });
    } else {
        res.status(404).json({
            status: "failed",
            message: "The User does not exist",
        });
    }
};

const createUser = (req, res) => {
    const newId = users[users.length - 1].id + 1;
    const newUser = Object.assign({ id: newId }, req.body);
    users.push(newUser);
    fs.writeFile(
        path.join(__dirname, "dev-data", "data", "users.json"),
        JSON.stringify(users),
        (err) => {
            res.status(201).json({
                status: "success",
                data: {
                    user: newUser,
                },
            });
        }
    );
};

const updateUser = (req, res) => {
    if (req.params.id * 1 > users.length) {
        return res.status(404).json({
            status: "failed",
            message: "The User does not exist",
        });
    }

    res.status(201).json({
        status: "success",
        data: {
            User: "<updated User here...>",
        },
    });
};

const deleteUser = (req, res) => {
    if (JSON.stringify(req.params.id)) {
        return res.status(404).json({
            status: "failed",
            message: "The User does not exist",
        });
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
