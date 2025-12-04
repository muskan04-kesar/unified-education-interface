import express from "express";
import { governmentLogin } from "../controllers/governmentAuthController.js";

const router = express.Router();

router.post("/login", governmentLogin);

export default router;
