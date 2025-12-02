import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({

  // Basic info
  name: { type: String, required: true },

  // AISHE code
  code: { type: String, required: true, unique: true },

  type: {
    type: String,
    enum: ["school", "college", "university"],
    default: "school"
  },

  address: String,
  district: String,
  state: String,

  principalName: String,
  contact: String,

  // NIRF / accreditation
  nirfScore: Number,
  accreditation: String,

  infraRatings: {
    classrooms: Number,
    labs: Number,
    library: Number,
    sports: Number
  },

  // 🔹 Admin & ownership mapping
  // Link institution admins (User documents with role="admin")
  adminUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  // Overall onboarding/approval status
  status: {
    type: String,
    enum: ["pending", "active", "rejected"],
    default: "pending"
  },

  // 🔹 Govt verification
  verifiedByGovt: {
    type: Boolean,
    default: false
  },

  govtVerifiedAt: {
    type: Date
  },

  // 🔹 Documents uploaded during onboarding (approval by govt)
  documents: [
    {
      name: String,         // e.g. "Affiliation Letter"
      url: String,          // where the file is stored (S3, local, etc.)
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
      }
    }
  ],

  // 🔹 Optional: reverse mapping for dashboards
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher"
    }
  ],

  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
  ]

}, { timestamps: true });

// Unique AISHE code index
institutionSchema.index({ code: 1 }, { unique: true });

export default mongoose.model("Institution", institutionSchema);
