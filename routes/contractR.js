const express = require("express");

const {
    getContracts,
    createContract
} = require("../controllers/contractC.js");

const router = express.Router();

router.get("/", getContracts);

router.post("/", createContract);

module.exports = router;