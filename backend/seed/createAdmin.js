import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const run = async () => {
  try {
    await connectDB();
    const email = process.env.ADMIN_EMAIL || "admin@example.com";
    const password = process.env.ADMIN_PASSWORD || "admin123";

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Admin already exists:", email);
      process.exit(0);
    }

    const hash = await bcrypt.hash(password, 10);
    const admin = await User.create({ name: "Admin", email, password: hash, role: "admin" });
    console.log("Admin created:", admin.email);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
