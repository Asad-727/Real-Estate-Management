import express from "express";

import {
    getUsers,
    createUser,
    loginUser,
    updateUser,
    deleteUser
} from "../controllers/userC.js";

import authMiddleware from "../middleware/authM.js";
import allowRoles from "../middleware/roleM.js";

const router = express.Router();

router.post("/", createUser);

router.post("/login", loginUser);

router.get(
    "/",
    authMiddleware,
    allowRoles("admin"),
    getUsers
);

router.put(
    "/:id",
    authMiddleware,
    allowRoles("admin"),
    updateUser
);

router.delete(
    "/:id",
    authMiddleware,
    allowRoles("admin"),
    deleteUser
);

export default router;