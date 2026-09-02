const express = require("express");

const {
    getUtilities,
    createUtility
} = require("../controllers/utilityC.js");

const router = express.Router();

router.get("/", getUtilities);

router.post("/", createUtility);

module.exports = router;