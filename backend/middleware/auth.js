import jwt from "jsonwebtoken";
import User from "../models/user.js";

/**
 * AUTH MIDDLEWARE
 * Validates JWT token and attaches the user object to req.user
 */
export const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "No token, authorization denied" });

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // attach full user object
    next();

  } catch (error) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};


/**
 * ROLE AUTHORIZATION MIDDLEWARE
 * Only allows users with required roles to access an endpoint
 * @example requireRole("admin")
 * @example requireRole(["admin", "teacher"])
 */
export const requireRole = (roles) => {
  return (req, res, next) => {

    // if a single role is passed, convert it to array
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!req.user)
      return res.status(401).json({ message: "Unauthorized" });

    if (!allowedRoles.includes(req.user.role))
      return res.status(403).json({ message: "Access denied: insufficient permissions" });

    next();
  };
};
