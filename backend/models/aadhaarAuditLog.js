// models/aadhaarAuditLog.js
const auditSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  action: String, // 'verified', 'viewed', 'updated'
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  ipAddress: String
});