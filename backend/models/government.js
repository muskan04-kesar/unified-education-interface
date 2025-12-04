import mongoose from "mongoose";

const governmentUserSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Government Official" },

    email: { type: String, required: true, unique: true },

    // Login without password (future-ready)
    password: { type: String, default: null },  // NOT REQUIRED

    // Ministry (optional for now)
    ministry: { type: String, default: "Government of India" },  // NOT REQUIRED

    role: { type: String, default: "government" }
  },
  { timestamps: true }
);

export default mongoose.model("GovernmentUser", governmentUserSchema);
