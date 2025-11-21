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

  department: { type: String },
  subjects: { type: [String], default: [] }
}, { timestamps: true });

teacherSchema.index({ instituteId: 1 });

export default mongoose.model("Teacher", teacherSchema);
