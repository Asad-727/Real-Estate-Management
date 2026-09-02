const express = require("express");

const {
    getExpenses,
    createExpense
} = require("../controllers/expenseC.js");

const router = express.Router();

router.get("/", getExpenses);

router.post("/", createExpense);

module.exports = router;