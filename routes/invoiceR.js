const express = require("express");

const {
    createInvoice
} = require("../controllers/invoiceC.js");

const router = express.Router();

router.get("/:paymentId", createInvoice);

module.exports = router;