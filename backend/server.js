import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authroutes.js";
import institutionRoutes from "./routes/institutionRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import performanceRoutes from "./routes/performanceroutes.js";
import govReportRoutes from "./routes/govReportRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import governmentAuthRoutes from "./routes/governmentRoutes.js";




// Middleware
import { authMiddleware } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/govreports", govReportRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/gov/auth", governmentAuthRoutes);

// Protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed 😎",
    user: req.user,
  });
});

// Health route
app.get("/", (req, res) => {
  res.send("Hey ❤️ Your backend is running perfectly 🚀");
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/kpi", (req, res) => {
  res.json({
    total_institutions: 5234,
    total_students: 2156890,
    total_teachers: 145230,
    active_schemes: 27,
    dropout_rate: 7.2,
  });
});

