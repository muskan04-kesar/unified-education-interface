import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },

  aadhaar: { 
    type: String, 
    required: true, 
    unique: true 
  },

  guardianName: { type: String },
  guardianPhone: { type: String },

  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },

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
  }
}, { timestamps: true });

studentSchema.index({ aadhaar: 1 }, { unique: true });
studentSchema.index({ instituteId: 1 });

export default mongoose.model("Student", studentSchema);
