import Student from "../models/student.js";

export const createStudent = async (req, res, next) => {
  try {
    const s = await Student.create(req.body);
    res.status(201).json(s);
  } catch (err) { next(err); }
};

export const getStudent = async (req, res, next) => {
  try {
    const s = await Student.findById(req.params.id).populate("classId instituteId");
    if (!s) return res.status(404).json({ message: "Student not found" });
    res.json(s);
  } catch (err) { next(err); }
};

export const listStudentsByInstitute = async (req, res, next) => {
  try {
    const { instituteId } = req.query;
    const filter = instituteId ? { instituteId } : {};
    const list = await Student.find(filter).sort({ name: 1 });
    res.json(list);
  } catch (err) { next(err); }
};
