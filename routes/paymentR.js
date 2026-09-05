import express from "express";

import {
    getPayments,
    createPayment,
    updatePayment,
    deletePayment
} from "../controllers/paymentC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getPayments);
router.post("/", authMiddleware, createPayment);
router.put("/:id", authMiddleware, updatePayment);
router.delete("/:id", authMiddleware, deletePayment);

export default router;