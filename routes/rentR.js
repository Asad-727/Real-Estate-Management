import express from "express";

import {
    getRents,
    createRent,
    updateRent,
    deleteRent
} from "../controllers/rentC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getRents);
router.post("/", authMiddleware, createRent);
router.put("/:id", authMiddleware, updateRent);
router.delete("/:id", authMiddleware, deleteRent);

export default router;