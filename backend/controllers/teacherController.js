import Teacher from "../models/teacher.js";

export const createTeacher = async (req, res, next) => {
  try {
    const t = await Teacher.create(req.body);
    res.status(201).json(t);
  } catch (err) { next(err); }
};

export const listTeachers = async (req, res, next) => {
  try {
    const list = await Teacher.find().populate("userId", "name email").sort({ createdAt: -1 });
    res.json(list);
  } catch (err) { next(err); }
};
