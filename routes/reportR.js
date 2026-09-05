import express from "express";

import { getReports } from "../controllers/reportC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getReports);

export default router;