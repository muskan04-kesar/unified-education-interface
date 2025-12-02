// src/utils/blockchainLogger.js
import crypto from "crypto";
import AuditLog from "../models/AuditLog.js";
import { stableStringify } from "./stableStringify.js";

/**
 * addAuditLog(action, data)
 * - writes a new AuditLog doc
 * - includes previousHash so records form a chain
 * - masks simple sensitive fields (customize as needed)
 *
 * Returns the newly created AuditLog document.
 */
export async function addAuditLog(action, data = {}) {
  // Mask PII (example). Customize with your fields.
  const safeData = maskSensitive(data);

  const timestamp = new Date().toISOString();

  // Get last entry's hash so we can chain. For heavy concurrency consider a transaction or a sequence.
  const last = await AuditLog.findOne().sort({ createdAt: -1 }).lean();
  const previousHash = last ? last.hash : null;

  const entryForHash = { action, data: safeData, timestamp, previousHash };
  const payload = stableStringify(entryForHash);
  const hash = crypto.createHash("sha256").update(payload).digest("hex");

  const doc = await AuditLog.create({
    action,
    data: safeData,
    timestamp,
    previousHash,
    hash
  });

  // optional: also console.log for debugging
  console.log("AUDIT LOG CREATED:", { id: doc._id.toString(), action, hash, previousHash });
  return doc;
}

function maskSensitive(obj) {
  if (!obj || typeof obj !== "object") return obj;
  const copy = JSON.parse(JSON.stringify(obj)); // shallow deep-copy
  // example fields to mask: aadhaar, ssn, email
  if (copy.aadhaar) {
    copy.aadhaar = `hashed:${crypto.createHash("sha256").update(copy.aadhaar).digest("hex").slice(0, 16)}`;
  }
  if (copy.ssn) {
    copy.ssn = `hashed:${crypto.createHash("sha256").update(copy.ssn).digest("hex").slice(0, 16)}`;
  }
  // mask other fields as you need
  return copy;
}
