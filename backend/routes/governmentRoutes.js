import express from "express";
import {
  registerGovernmentUser,
  loginGovernmentUser
} from "../controllers/governmentAuthController.js";

const router = express.Router();

router.post("/register", registerGovernmentUser);
router.post("/login", loginGovernmentUser);

export default router;
