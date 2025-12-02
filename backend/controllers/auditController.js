// src/controllers/auditController.js
import AuditLog from "../models/AuditLog.js";
import { addAuditLog } from "./utils/blockchainLogger.js";
import { stableStringify } from "./utils/stableStringify.js";

/**
 * POST /api/audit
 * Body: { action: string, data: object }
 */
export const createAudit = async (req, res, next) => {
  try {
    const { action, data } = req.body;
    if (!action) return res.status(400).json({ message: "action required" });
    const doc = await addAuditLog(action, data);
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/audit
 * Query: ?limit=50&skip=0
 * - for admins/teachers only (wrap with protect+authorize in routes)
 */
export const listAudits = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "100", 10), 1000);
    const skip = parseInt(req.query.skip || "0", 10);
    const docs = await AuditLog.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/audit/verify
 * Optional: reads entire chain and verifies all hashes/previousHash links.
 */
export const verifyChain = async (req, res, next) => {
  try {
    const docs = await AuditLog.find().sort({ createdAt: 1 }).lean(); // oldest → newest
    const problems = [];
    for (let i = 0; i < docs.length; i++) {
      const d = docs[i];
      const expectedPrevious = i === 0 ? null : docs[i - 1].hash;

      // recompute hash of record (note: timestamp in DB is Date object; use ISO)
      const entryForHash = {
        action: d.action,
        data: d.data,
        timestamp: new Date(d.timestamp).toISOString(),
        previousHash: d.previousHash
      };
      const payload = stableStringify(entryForHash);
      const recomputed = require("crypto").createHash("sha256").update(payload).digest("hex");

      if (recomputed !== d.hash) {
        problems.push({ index: i, id: d._id, reason: "hash mismatch", recomputed, stored: d.hash });
      }
      if (d.previousHash !== expectedPrevious) {
        problems.push({ index: i, id: d._id, reason: "previousHash mismatch", expectedPrevious, found: d.previousHash });
      }
    }

    res.json({ total: docs.length, problems });
  } catch (err) {
    next(err);
  }
};
