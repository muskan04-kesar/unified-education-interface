import express from "express";
import { addRecord, getStudentRecords } from "../controllers/performancecontroller.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.post("/", authMiddleware, addRecord);
router.get("/student/:studentId", authMiddleware, getStudentRecords);

export default router;
