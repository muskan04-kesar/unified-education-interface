import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },

  aadhaar: { 
    type: String, 
    required: true, 
    unique: true 
  },

  // ⭐ ADD THESE FIELDS HERE
  aadhaarVerified: {
    type: Boolean,
    default: false
  },
  
  aadhaarVerifiedAt: {
    type: Date
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
studentSchema.pre('save', function(next) {
  if (this.isModified('aadhaar')) {
    // Remove spaces/hyphens
    this.aadhaar = this.aadhaar.replace(/[\s-]/g, '');
  }
  next();
});

export default mongoose.model("Student", studentSchema);