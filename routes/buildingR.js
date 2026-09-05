import express from "express";

import {
    getBuildings,
    createBuilding,
    updateBuilding,
    deleteBuilding
} from "../controllers/buildingC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getBuildings);
router.post("/", authMiddleware, createBuilding);
router.put("/:id", authMiddleware, updateBuilding);
router.delete("/:id", authMiddleware, deleteBuilding);

export default router;