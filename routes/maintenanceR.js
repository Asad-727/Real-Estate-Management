const express = require("express");

const {
    getMaintenances,
    createMaintenance
} = require("../controllers/maintenanceC.js");

const router = express.Router();

router.get("/", getMaintenances);

router.post("/", createMaintenance);

module.exports = router;