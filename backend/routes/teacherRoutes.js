import express from "express";
import { createTeacher, listTeachers } from "../controllers/teacherController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";
const router = express.Router();

router.post("/", authMiddleware, requireRole("admin"), createTeacher);
router.get("/", authMiddleware, listTeachers);

export default router;
