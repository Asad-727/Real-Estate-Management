const express = require("express");

const {
    getFloors,
    createFloor
} = require("../controllers/floorC.js");

const authMiddleware = require("../middleware/authM.js");

const router = express.Router();

router.get("/", authMiddleware, getFloors);

router.post("/", authMiddleware, createFloor);

module.exports = router;