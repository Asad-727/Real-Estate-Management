import express from "express";

import {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
} from "../controllers/expenseC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getExpenses);
router.post("/", authMiddleware, createExpense);
router.put("/:id", authMiddleware, updateExpense);
router.delete("/:id", authMiddleware, deleteExpense);

export default router;