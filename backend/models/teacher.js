import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: true
  },

  aadhaar: {
    type: String,
    required: true
  },

  aparId: {
    type: String,
    required: true
  },

  department: String,
  subjects: {
    type: [String],
    default: []
  },

  experienceYears: Number,
  qualifications: String,

  aiPerformanceSummary: String

}, { timestamps: true });

teacherSchema.index({ instituteId: 1 });

export default mongoose.model("Teacher", teacherSchema);
