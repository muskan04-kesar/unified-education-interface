import Student from "../models/student.js";
import User from "../models/user.js";

export const createStudent = async (req, res, next) => {
  try {
    const {
      name, email, phone, aadhaar, dob, gender, address, district, state,
      guardianName, guardianPhone,
      instituteId, classId
    } = req.body;

    // Create user first
    const user = await User.create({
      name,
      email,
      phone,
      role: "student",
      aadhaar,
      instituteId
    });

    // Create student entry
    const student = await Student.create({
      userId: user._id,
      aadhaar,
      dob,
      gender,
      address,
      district,
      state,
      guardianName,
      guardianPhone,
      instituteId,
      classId
    });

    res.status(201).json(student);

  } catch (err) {
    next(err);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const s = await Student.findById(req.params.id)
      .populate("classId")
      .populate("instituteId");

    if (!s) return res.status(404).json({ message: "Student not found" });

    res.json(s);

  } catch (err) {
    next(err);
  }
};

export const listStudentsByInstitute = async (req, res, next) => {
  try {
    const filter = req.query.instituteId
      ? { instituteId: req.query.instituteId }
      : {};

    const list = await Student.find(filter).sort({ name: 1 });
    res.json(list);

  } catch (err) {
    next(err);
  }
};
