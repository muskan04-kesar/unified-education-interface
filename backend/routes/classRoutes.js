import express from "express";
import { getClasses } from "../controllers/classController.js";

const router = express.Router();

// CORRECT route for showing all classes
router.get("/", getClasses);

export default router;
