import express from "express";
import { createStudent, getStudent, listStudentsByInstitute } from "../controllers/studentController.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/", authMiddleware, createStudent);
router.get("/", authMiddleware, listStudentsByInstitute);
router.get("/:id", authMiddleware, getStudent);

export default router;
