import express from "express";

import {
    getUtilities,
    createUtility,
    updateUtility,
    deleteUtility
} from "../controllers/utilityC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getUtilities);
router.post("/", authMiddleware, createUtility);
router.put("/:id", authMiddleware, updateUtility);
router.delete("/:id", authMiddleware, deleteUtility);

export default router;