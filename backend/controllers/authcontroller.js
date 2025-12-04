import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const login = async (req, res, next) => {
  try {
    const { identifier, role } = req.body;

    if (!identifier || !role) {
      return res.status(400).json({ message: "Identifier and role are required" });
    }

    let query = {};

    switch (role) {
      case "government":
        query = { email: identifier };
        break;

      case "institution":
        query = { aisheCode: identifier };
        break;

      case "teacher":
        query = { aparId: identifier };
        break;

      case "student":
        query = { aadhaar: identifier };
        break;

      default:
        return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findOne(query);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        aadhaar: user.aadhaar,
      }
    });

  } catch (err) {
    next(err);
  }
};
