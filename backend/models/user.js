import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "teacher"],
    required: true,
  },

  phone: {
    type: String,
  },

  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
  }
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
