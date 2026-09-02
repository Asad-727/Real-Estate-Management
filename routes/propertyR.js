const express = require("express");

const {
    getProperties,
    createProperty
} = require("../controllers/propertyC.js");

const authMiddleware = require("../middleware/authM.js");

const router = express.Router();

router.get("/", authMiddleware, getProperties);

router.post("/", authMiddleware, createProperty);

module.exports = router;