import express from "express";
import {
  getClassAverage,
  getClassAttendance,
  getTopStudents,
  getWeakStudents
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/class/:classId/average", getClassAverage);
router.get("/class/:classId/attendance", getClassAttendance);
router.get("/class/:classId/top", getTopStudents);
router.get("/class/:classId/weak", getWeakStudents);

export default router;
