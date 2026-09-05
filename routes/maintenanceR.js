import express from "express";

import {
    getMaintenances,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance
} from "../controllers/maintenanceC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getMaintenances);
router.post("/", authMiddleware, createMaintenance);
router.put("/:id", authMiddleware, updateMaintenance);
router.delete("/:id", authMiddleware, deleteMaintenance);

export default router;