const express = require("express");

const {
    getPayments,
    createPayment
} = require("../controllers/paymentC.js");

const router = express.Router();

router.get("/", getPayments);

router.post("/", createPayment);

module.exports = router;