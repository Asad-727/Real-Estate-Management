const express = require("express");

const {
    getFinancialReport
} = require("../controllers/reportC.js");

const router = express.Router();

router.get("/", getFinancialReport);

module.exports = router;