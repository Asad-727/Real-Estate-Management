import express from "express";

import {
    getProperties,
    createProperty,
    updateProperty,
    deleteProperty
} from "../controllers/propertyC.js";

import authMiddleware from "../middleware/authM.js";

const router = express.Router();

router.get("/", authMiddleware, getProperties);
router.post("/", authMiddleware, createProperty);
router.put("/:id", authMiddleware, updateProperty);
router.delete("/:id", authMiddleware, deleteProperty);

export default router;