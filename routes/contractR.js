import express from "express";

import {
    getContracts,
    createContract,
    updateContract,
    deleteContract
} from "../controllers/contractC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getContracts);
router.post("/", authMiddleware, createContract);
router.put("/:id", authMiddleware, updateContract);
router.delete("/:id", authMiddleware, deleteContract);

export default router;