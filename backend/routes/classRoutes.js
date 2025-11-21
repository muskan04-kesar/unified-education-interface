import express from "express";
import { createClass, listClasses } from "../controllers/classController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";
const router = express.Router();

router.post("/", authMiddleware, requireRole("admin"), createClass);
router.get("/", authMiddleware, listClasses);

export default router;
