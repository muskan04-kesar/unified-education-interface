import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    sparse: true
  },

  password: {
    type: String,
  },

  phone: {
    type: String
  },

  role: {
    type: String,
    enum: ["student", "teacher", "admin", "government"],
    required: true,
  },

  // Aadhaar for student/teacher identity verification
  aadhaar: {
    type: String,
    index: true
  },

  // APAR ID — required for teachers
  aparId: {
    type: String,
    index: true
  },

  // Government users
  govDepartment: {
    type: String
  },

  // Institute mapping for student, teacher, admin
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution"
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);
