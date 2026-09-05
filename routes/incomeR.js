import express from "express";

import {
    getIncomes,
    createIncome,
    updateIncome,
    deleteIncome
} from "../controllers/incomeC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getIncomes);
router.post("/", authMiddleware, createIncome);
router.put("/:id", authMiddleware, updateIncome);
router.delete("/:id", authMiddleware, deleteIncome);

export default router;