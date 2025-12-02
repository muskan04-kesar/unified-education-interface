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

  nirfMetrics: {
    type: Object,
    default: {}
  },

  infraMetrics: {
    type: Object,
    default: {}
  },

  aparSummary: {
    type: Object,
    default: {}
  },

  aiInsights: String,

  summary: String

}, { timestamps: true });

export default mongoose.model("GovReport", govReportSchema);
