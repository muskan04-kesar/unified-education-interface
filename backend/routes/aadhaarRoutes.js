// routes/aadhaarRoutes.js
import express from 'express';
import { validateAadhaarFormat, maskAadhaar } from '../utils/aadhaarValidator.js';
import Student from '../models/student.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Validate Aadhaar format
router.post('/validate', authMiddleware, async (req, res) => {
  try {
    const { aadhaar } = req.body;
    
    if (!aadhaar) {
      return res.status(400).json({ message: 'Aadhaar number required' });
    }

    const validation = validateAadhaarFormat(aadhaar);
    
    if (!validation.valid) {
      return res.status(400).json({ 
        valid: false, 
        message: validation.error 
      });
    }

    // Check if already exists
    const existing = await Student.findOne({ aadhaar: validation.aadhaar });
    if (existing) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Aadhaar already registered' 
      });
    }

    res.json({ 
      valid: true, 
      message: 'Aadhaar format is valid',
      maskedAadhaar: maskAadhaar(validation.aadhaar)
    });
  } catch (error) {
    res.status(500).json({ message: 'Validation failed', error: error.message });
  }
});

// Manual verification by admin (mark as verified)
router.post('/verify/:studentId', authMiddleware, requireRole('admin'), async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.aadhaarVerified = true;
    student.aadhaarVerifiedAt = new Date();
    await student.save();

    res.json({ 
      message: 'Aadhaar verified successfully',
      student 
    });
  } catch (error) {
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
});

export default router;