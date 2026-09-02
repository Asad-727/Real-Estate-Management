const express = require("express");

const {
    getIncomes,
    createIncome
} = require("../controllers/incomeC.js");

const router = express.Router();

router.get("/", getIncomes);

router.post("/", createIncome);

module.exports = router;