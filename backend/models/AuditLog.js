// src/models/AuditLog.js
import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
  action: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now },
  previousHash: { type: String, default: null },
  hash: { type: String, required: true }
}, { timestamps: true });

// index for fast retrieval of latest
auditSchema.index({ createdAt: -1 });

export default mongoose.model("AuditLog", auditSchema);
