// backend/controllers/studentOnboardingController.js
import Student from "../models/student.js";
import User from "../models/user.js";
import Institution from "../models/institution.js";
import { verifyAadhaar } from "../services/aadhaarService.js";
import { fetchPreviousEducationData } from "../services/digilockerService.js";
import { generateStudentUUID } from "../utils/idGenerator.js";

/**
 * POST /api/onboard/student/start
 * Body: { aadhaar, dob, gender, address, district, state, guardianName, guardianPhone }
 * Uses logged in user (role=student), creates or updates Student document, runs Aadhaar verification (mock).
 */
export const startStudentOnboarding = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "student") {
      return res.status(403).json({ message: "Only students can start onboarding" });
    }

    const {
      aadhaar,
      dob,
      gender,
      address,
      district,
      state,
      guardianName,
      guardianPhone
    } = req.body;

    if (!aadhaar) {
      return res.status(400).json({ message: "Aadhaar is required" });
    }

    // Call mock Aadhaar verification service
    const verifyResult = await verifyAadhaar({
      aadhaar,
      name: user.name,
      dob
    });

    if (!verifyResult.success || !verifyResult.match) {
      return res.status(400).json({
        message: "Aadhaar verification failed (mock)",
        detail: verifyResult.message
      });
    }

    // Find existing student doc or create a new one
    let student = await Student.findOne({ userId });

    if (!student) {
      student = new Student({
        userId,
        aadhaar,
        dob,
        gender,
        address,
        district,
        state,
        guardianName,
        guardianPhone,
        aadhaarVerified: true,
        aadhaarVerifiedAt: new Date()
      });

      // If schema has studentUUID, generate it
      if (student.schema.path("studentUUID")) {
        student.studentUUID = generateStudentUUID();
      }

      await student.save();
    } else {
      // Update existing profile
      student.aadhaar = aadhaar;
      student.dob = dob || student.dob;
      student.gender = gender || student.gender;
      student.address = address || student.address;
      student.district = district || student.district;
      student.state = state || student.state;
      student.guardianName = guardianName || student.guardianName;
      student.guardianPhone = guardianPhone || student.guardianPhone;
      student.aadhaarVerified = true;
      student.aadhaarVerifiedAt = new Date();
      await student.save();
    }

    // Optionally reflect Aadhaar into User as well
    user.aadhaar = aadhaar;
    await user.save();

    return res.status(200).json({
      message: "Student onboarding (basic profile + Aadhaar) completed",
      student
    });

  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/onboard/student/map-institute
 * Body: { instituteId, classId }
 * Maps student to institution & class.
 */
export const mapStudentToInstitute = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "student") {
      return res.status(403).json({ message: "Only students can map institute" });
    }

    const { instituteId, classId } = req.body;

    if (!instituteId || !classId) {
      return res.status(400).json({ message: "instituteId and classId are required" });
    }

    const institute = await Institution.findById(instituteId);
    if (!institute) {
      return res.status(404).json({ message: "Institution not found" });
    }

    let student = await Student.findOne({ userId });
    if (!student) {
      return res.status(404).json({ message: "Student profile not found. Complete onboarding start first." });
    }

    student.instituteId = instituteId;
    student.classId = classId;
    await student.save();

    // optionally maintain reverse mapping
    if (institute.schema.path("students")) {
      if (!Array.isArray(institute.students)) institute.students = [];
      const already = institute.students.some(id => id.toString() === student._id.toString());
      if (!already) {
        institute.students.push(student._id);
        await institute.save();
      }
    }

    // update user mapping as well
    user.instituteId = instituteId;
    await user.save();

    return res.status(200).json({
      message: "Student mapped to institute and class successfully",
      student
    });

  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/onboard/student/fetch-previous-data
 * Body: { consent: boolean }
 * Uses Aadhaar to fetch mock previous records & certificates from DigiLocker.
 */
export const fetchStudentPreviousData = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "student") {
      return res.status(403).json({ message: "Only students can fetch previous data" });
    }

    const { consent } = req.body;
    if (!consent) {
      return res.status(400).json({ message: "Consent is required to fetch previous data" });
    }

    const student = await Student.findOne({ userId });
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    if (!student.aadhaar && !user.aadhaar) {
      return res.status(400).json({ message: "Aadhaar is required to fetch previous data" });
    }

    const aadhaar = student.aadhaar || user.aadhaar;

    const data = await fetchPreviousEducationData(aadhaar);

    if (student.schema.path("previousRecords")) {
      student.previousRecords = data.previousRecords || [];
    }
    if (student.schema.path("certificates")) {
      student.certificates = data.certificates || [];
    }
    await student.save();

    return res.status(200).json({
      message: "Previous education data fetched (mock) and stored",
      previousRecords: data.previousRecords,
      certificates: data.certificates
    });

  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/student/dashboard
 * Returns a simple student dashboard payload.
 */
export const getStudentDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "student") {
      return res.status(403).json({ message: "Only students can view this dashboard" });
    }

    const student = await Student.findOne({ userId })
      .populate("instituteId", "name code state district")
      .populate("classId", "name");

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    const dashboard = {
      student: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        aadhaarVerified: student.aadhaarVerified,
        riskLevel: student.riskLevel,
        performanceScore: student.performanceScore,
        badges: student.badges
      },
      institute: student.instituteId || null,
      class: student.classId || null,
      aiInsights: student.aiInsights || null
    };

    return res.status(200).json(dashboard);

  } catch (err) {
    next(err);
  }
};
