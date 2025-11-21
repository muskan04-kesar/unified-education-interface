import StudentPerformance from "../models/performance.js";

export const addRecord = async (req, res, next) => {
  try {
    const rec = await StudentPerformance.create(req.body);
    res.status(201).json(rec);
  } catch (err) { next(err); }
};

export const getStudentRecords = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const recs = await StudentPerformance.find({ studentId }).sort({ date: -1 });
    res.json(recs);
  } catch (err) { next(err); }
};
