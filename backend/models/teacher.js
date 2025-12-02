import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({

  // Link to generic User login account
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Institute mapping (AISHE handled via Institution model's code field)
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: true
  },

  // Internal public-safe ID (for mapping, URLs, integration)
  teacherUUID: {
    type: String,
    unique: true,
    sparse: true // allows existing documents that don't have it yet
  },

  // Aadhaar (for prototype; in a real system you’d usually store a hash)
  aadhaar: {
    type: String,
    required: true
  },

  // Aadhaar verification status
  aadhaarVerified: {
    type: Boolean,
    default: false
  },

  aadhaarVerifiedAt: {
    type: Date
  },

  // APAR ID and verification status
  aparId: {
    type: String,
    required: true
  },

  aparVerified: {
    type: Boolean,
    default: false
  },

  aparVerifiedAt: {
    type: Date
  },

  // Employment details
  department: String,

  subjects: {
    type: [String],
    default: []
  },

  experienceYears: Number,
  qualifications: String,

  // Approval / lifecycle status
  approvedByInstitute: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: ["pending", "active", "rejected"],
    default: "pending"
  },

  // AI analytics, performance summaries, etc.
  aiPerformanceSummary: String

}, { timestamps: true });

// Indexes
teacherSchema.index({ instituteId: 1 });
teacherSchema.index({ teacherUUID: 1 }, { unique: true, sparse: true });

// Optional helpful indexes (uncomment if you want them unique)
// Make Aadhaar unique per system:
// teacherSchema.index({ aadhaar: 1 }, { unique: true });

// Make APAR unique per system or per institute:
// teacherSchema.index({ aparId: 1 }, { unique: true });
// or:
// teacherSchema.index({ instituteId: 1, aparId: 1 }, { unique: true });

export default mongoose.model("Teacher", teacherSchema);
