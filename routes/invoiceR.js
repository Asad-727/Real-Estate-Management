import express from "express";

import createInvoice from "../controllers/invoiceC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/:paymentId", authMiddleware, createInvoice);

export default router;