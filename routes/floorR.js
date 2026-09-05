import express from "express";

import {
    getFloors,
    createFloor,
    updateFloor,
    deleteFloor
} from "../controllers/floorC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getFloors);
router.post("/", authMiddleware, createFloor);
router.put("/:id", authMiddleware, updateFloor);
router.delete("/:id", authMiddleware, deleteFloor);

export default router;