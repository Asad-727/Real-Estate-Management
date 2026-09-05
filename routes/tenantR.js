import express from "express";

import {
    getTenants,
    createTenant,
    updateTenant,
    deleteTenant
} from "../controllers/tenantC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getTenants);
router.post("/", authMiddleware, createTenant);
router.put("/:id", authMiddleware, updateTenant);
router.delete("/:id", authMiddleware, deleteTenant);

export default router;