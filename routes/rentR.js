const express = require("express");

const {
    getRents,
    createRent
} = require("../controllers/rentC.js");

const router = express.Router();

router.get("/", getRents);

router.post("/", createRent);

module.exports = router;