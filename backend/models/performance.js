import mongoose from "mongoose";

const studentPerformanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  subject: { type: String },

  attendance: { 
    type: Boolean,
    required: true
  },

  marks: {
    type: Number,
    min: 0,
    max: 100
  },

  behaviourNotes: { type: String },

  aiSummary: { type: String }
}, { timestamps: true });

studentPerformanceSchema.index({ studentId: 1 });

export default mongoose.model("StudentPerformance", studentPerformanceSchema);
