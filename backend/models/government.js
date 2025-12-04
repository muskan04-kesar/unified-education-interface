import mongoose from "mongoose";

const governmentUserSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Government Official" },

    email: { type: String, required: [true, "Email is required"], unique: true },

    // Not required anymore
    password: { type: String, default: null },

    // Not required anymore
    ministry: { type: String, default: null },

    role: { type: String, default: "government" }
  },
  { timestamps: true }
);

export default mongoose.model("GovernmentUser", governmentUserSchema);
