import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  aadhaar: { type: String },
  institute: { type: String },
  className: { type: String },
  progressScore: { type: Number, default: 0 },
  badges: [{ type: String }]
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
export default Student;
