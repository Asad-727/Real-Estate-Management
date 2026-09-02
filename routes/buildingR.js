const express = require("express");

const {
    getBuildings,
    createBuilding
} = require("../controllers/buildingC.js");

const authMiddleware = require("../middleware/authM.js");

const router = express.Router();

router.get("/", authMiddleware, getBuildings);

router.post("/", authMiddleware, createBuilding);

module.exports = router;