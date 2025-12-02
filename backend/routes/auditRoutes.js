// src/routes/auditRoutes.js
import express from "express";
import { createAudit, listAudits, verifyChain } from "../controllers/auditController.js";
import { protect, authorizeRoles } from "./middleware/auth.js";

const router = express.Router();

// create audit entry (only internal clients, admin/teacher or services should call)
router.post("/", protect, authorizeRoles("admin","teacher"), createAudit);

// list logs (read-only for auditors)
router.get("/", protect, authorizeRoles("admin","teacher","govt"), listAudits);

// verify chain (admin only)
router.get("/verify", protect, authorizeRoles("admin"), verifyChain);

export default router;
