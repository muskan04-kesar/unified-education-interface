import GovernmentUser from "../models/government.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER Govt User
export const registerGovernmentUser = async (req, res) => {
  try {
    const { name, email, password, ministry } = req.body;

    const exists = await GovernmentUser.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await GovernmentUser.create({
      name,
      email,
      password: hashed,
      ministry
    });

    res.status(201).json({ message: "Government user created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN Govt User
export const loginGovernmentUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await GovernmentUser.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        ministry: user.ministry,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
