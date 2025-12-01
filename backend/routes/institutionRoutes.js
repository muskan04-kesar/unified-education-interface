import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
// Import your controller functions
import {
  listInstitutions,
  getInstitution,
  createInstitution,
  updateInstitution,  // ← Make sure this is imported
  deleteInstitution
} from '../controllers/institutionController.js';

const router = express.Router();

// GET all institutions
router.get('/', authMiddleware, listInstitutions);

// GET single institution
router.get('/:id', authMiddleware, getInstitution);

// POST create institution
router.post('/', authMiddleware, requireRole(['admin']), createInstitution);

// PUT update institution ← ADD THIS IF MISSING
router.put('/:id', authMiddleware, requireRole(['admin']), updateInstitution);

// DELETE institution
router.delete('/:id', authMiddleware, requireRole(['admin']), deleteInstitution);

export default router;