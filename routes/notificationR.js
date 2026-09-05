import express from "express";

import {
    getNotifications,
    createNotification,
    updateNotification,
    deleteNotification
} from "../controllers/notificationC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getNotifications);
router.post("/", authMiddleware, createNotification);
router.put("/:id", authMiddleware, updateNotification);
router.delete("/:id", authMiddleware, deleteNotification);

export default router;