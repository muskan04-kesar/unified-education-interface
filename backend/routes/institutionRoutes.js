import express from "express";
import { createInstitution, listInstitutions, getInstitution } from "../controllers/institutionController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";
const router = express.Router();

router.post("/", authMiddleware, requireRole("admin"), createInstitution);
router.get("/", authMiddleware, listInstitutions);
router.get("/:id", authMiddleware, getInstitution);

export default router;
