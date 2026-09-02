const express = require("express");

const {
    getStaff,
    createStaff
} = require("../controllers/staffC.js");

const router = express.Router();

router.get("/", getStaff);

router.post("/", createStaff);

module.exports = router;