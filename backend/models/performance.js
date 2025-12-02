import mongoose from "mongoose";

const studentPerformanceSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },

  subjectId: {
    type: String  // upgrade to Subject schema later
  },

  date: {
    type: Date,
    default: Date.now
  },

  testType: {
    type: String,
    enum: ["attendance", "quiz", "exam", "assignment"],
    default: "attendance"
  },

  attendance: Boolean,

  marks: {
    type: Number,
    min: 0,
    max: 100
  },

  behaviourNotes: String,

  aiSummary: String

}, { timestamps: true });

studentPerformanceSchema.index({ studentId: 1 });

export default mongoose.model("StudentPerformance", studentPerformanceSchema);
