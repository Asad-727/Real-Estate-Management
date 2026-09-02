const express = require("express");

const {
    getUnits,
    createUnit
} = require("../controllers/unitC.js");

const authMiddleware = require("../middleware/authM.js");

const router = express.Router();

router.get("/", authMiddleware, getUnits);

router.post("/", authMiddleware, createUnit);

module.exports = router;