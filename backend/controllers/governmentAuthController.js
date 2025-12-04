import GovernmentUser from "../models/government.js";
import jwt from "jsonwebtoken";

export const governmentLogin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    let user = await GovernmentUser.findOne({ email });

    // Auto-create user if not exists
    if (!user) {
      user = await GovernmentUser.create({
        email,
        name: "Government Officer",
        role: "government"
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Government login successful",
      token,
      user
    });

  } catch (error) {
    console.error("Gov login error: ", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
