import express from "express";
import {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentcontroller.js";  // ✅ Make sure this matches the actual filename
import { protect, authorizeRoles } from "../middleware/authmiddleware.js";

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Student route working" });
});

// Main routes
router.post("/", protect, authorizeRoles("admin", "teacher"), createStudent);
router.get("/", protect, authorizeRoles("admin", "teacher", "govt"), getStudents);
router.get("/:id", protect, authorizeRoles("admin", "teacher", "govt", "student"), getStudent);
router.put("/:id", protect, authorizeRoles("admin", "teacher"), updateStudent);
router.delete("/:id", protect, authorizeRoles("admin"), deleteStudent);

export default router;