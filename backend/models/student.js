import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  aadhaar: {
    type: String,
    required: true,
    unique: true
  },

  aadhaarVerified: {
    type: Boolean,
    default: false
  },

  aadhaarVerifiedAt: Date,

  dob: Date,

  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },

  address: String,
  district: String,
  state: String,

  guardianName: String,
  guardianPhone: String,

  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: true
  },

  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true
  },

  badges: {
    type: [String],
    default: []
  },

  performanceScore: {
    type: Number,
    default: 0
  },

  riskLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  },

  aiInsights: {
    type: String
  }

}, { timestamps: true });

studentSchema.index({ aadhaar: 1 }, { unique: true });

export default mongoose.model("Student", studentSchema);
