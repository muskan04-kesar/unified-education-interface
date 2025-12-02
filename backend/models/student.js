import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

  // Internal public-safe ID for student (used in URLs / mapping)
  studentUUID: {
    type: String,
    unique: true,
    sparse: true // allows existing docs without this field
  },

  // Link to generic User login account
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Aadhaar (for prototype) – in production prefer storing a hash instead
  aadhaar: {
    type: String,
    required: true,
    unique: true
  },

  // KYC / Aadhaar verification status
  aadhaarVerified: {
    type: Boolean,
    default: false
  },

  aadhaarVerifiedAt: Date,

  // Basic identity fields
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

  // Institute & class mapping
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

  // Onboarding – previous records & certificates (Digilocker, etc.)
  previousRecords: {
    type: [mongoose.Schema.Types.Mixed], // can store various structures
    default: []
  },

  certificates: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },

  // Gamification / analytics
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

// unique indexes
studentSchema.index({ aadhaar: 1 }, { unique: true });
studentSchema.index({ studentUUID: 1 }, { unique: true, sparse: true });

export default mongoose.model("Student", studentSchema);

