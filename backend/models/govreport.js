import mongoose from "mongoose";

const govReportSchema = new mongoose.Schema({
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: true
  },

  month: { type: String, required: true },

  attendanceRate: Number,

  classWisePerformance: {
    type: Object,
    default: {}
  },

  dropoutRiskList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }],

  summary: { type: String }
}, { timestamps: true });

govReportSchema.index({ instituteId: 1 });

export default mongoose.model("GovReport", govReportSchema);
