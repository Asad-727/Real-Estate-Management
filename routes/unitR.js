import express from "express";

import {
    getUnits,
    createUnit,
    updateUnit,
    deleteUnit
} from "../controllers/unitC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getUnits);
router.post("/", authMiddleware, createUnit);
router.put("/:id", authMiddleware, updateUnit);
router.delete("/:id", authMiddleware, deleteUnit);

export default router;