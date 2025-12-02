import Teacher from "../models/teacher.js";
import User from "../models/user.js";

export const createTeacher = async (req, res, next) => {
  try {
    const {
      name, email, password, phone, aadhaar, aparId,
      instituteId, department, subjects,
      experienceYears, qualifications
    } = req.body;

    // Create user account
    const hashedPass = password ? await bcrypt.hash(password, 10) : null;

    const user = await User.create({
      name,
      email,
      password: hashedPass,
      phone,
      role: "teacher",
      aadhaar,
      aparId,
      instituteId
    });

    // Create teacher entry
    const teacher = await Teacher.create({
      userId: user._id,
      instituteId,
      aadhaar,
      aparId,
      department,
      subjects,
      experienceYears,
      qualifications
    });

    res.status(201).json(teacher);

  } catch (err) {
    next(err);
  }
};

export const listTeachers = async (req, res, next) => {
  try {
    const list = await Teacher.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(list);

  } catch (err) {
    next(err);
  }
};
