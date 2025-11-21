import express from "express";
import { createReport, listReports } from "../controllers/govReportController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";
const router = express.Router();

router.post("/", authMiddleware, requireRole("admin"), createReport);
router.get("/", authMiddleware, listReports);

export default router;
