const express = require("express");

const {
    getNotifications,
    createNotification
} = require("../controllers/notificationC.js");

const router = express.Router();

router.get("/", getNotifications);

router.post("/", createNotification);

module.exports = router;