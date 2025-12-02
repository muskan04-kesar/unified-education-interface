// routes/analyticsRoutes.js
import express from "express";
import {
  getClassAverage,
  getClassAttendance,
  getTopStudents,
  getWeakStudents,
  getSubjectPerformance,
  getMonthlyTrend,
  getAttendanceTrend,
  getRiskLevels,
  getTeacherEffectiveness,
  getWeakSubjects
} from "../controllers/analyticsController.js";

const router = express.Router();

/**
 * BASIC ANALYTICS (OLD + FIXED)
 */
router.get("/class/:classId/average", getClassAverage);
router.get("/class/:classId/attendance", getClassAttendance);
router.get("/class/:classId/top", getTopStudents);
router.get("/class/:classId/weak", getWeakStudents);

/**
 * ADVANCED ANALYTICS (NEW)
 */

// ⭐ Subject-wise average performance (Bar Chart)
router.get("/class/:classId/subjects", getSubjectPerformance);

// ⭐ Monthly performance trend (Line Chart)
router.get("/class/:classId/monthly-performance", getMonthlyTrend);

// ⭐ Monthly attendance trend (Area/Line Chart)
router.get("/class/:classId/attendance-trend", getAttendanceTrend);

// ⭐ Risk level distribution (Pie/Donut Chart)
router.get("/class/:classId/risk-levels", getRiskLevels);

// ⭐ Teacher effectiveness scores (Horizontal Bar Chart)
router.get("/class/:classId/teacher-effectiveness", getTeacherEffectiveness);

// ⭐ Weakest subjects heatmap (Bar/Heatmap)
router.get("/class/:classId/weak-subjects", getWeakSubjects);

export default router;
