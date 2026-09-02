const express = require("express");

const {
    getUsers,
    createUser,
    loginUser
} = require("../controllers/userC.js");

const authMiddleware = require("../middleware/authM.js");
const allowRoles = require("../middleware/roleM.js");

const router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.get(
    "/",
    authMiddleware,
    allowRoles("admin"),
    getUsers
);

module.exports = router;