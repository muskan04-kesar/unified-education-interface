export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

// Usage in routes/adminRoutes.js
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin only
router.get("/dashboard", authMiddleware, requireRole("admin"), (req, res) => {
  res.json({ message: "Admin Dashboard", user: req.user });
});

// Admin + Government
router.get("/reports", authMiddleware, requireRole("admin", "government"), (req, res) => {
  res.json({ message: "Reports accessed" });
});

// Teacher only
router.get("/my-classes", authMiddleware, requireRole("teacher"), (req, res) => {
  res.json({ message: "Teacher classes" });
});

export default router;