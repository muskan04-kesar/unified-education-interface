import StudentPerformance from "../models/performance.js";
import Student from "../models/student.js";
import mongoose from "mongoose";

// CLASS AVERAGE
export const getClassAverage = async (req, res) => {
  try {
    const classId = req.params.classId;

    const result = await StudentPerformance.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student"
        }
      },
      { $unwind: "$student" },
      { $match: { "student.classId": new mongoose.Types.ObjectId(classId) } },
      { $group: { _id: null, averageClassMarks: { $avg: "$marks" } } }
    ]);

    res.json(result[0] || { averageClassMarks: 0 });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CLASS ATTENDANCE
export const getClassAttendance = async (req, res) => {
  try {
    const classId = req.params.classId;

    const result = await StudentPerformance.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student"
        }
      },
      { $unwind: "$student" },
      { $match: { "student.classId": new mongoose.Types.ObjectId(classId) } },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          presentCount: { $sum: { $cond: [{ $eq: ["$attendance", true] }, 1, 0] } }
        }
      },
      {
        $project: {
          attendancePercentage: {
            $multiply: [{ $divide: ["$presentCount", "$totalSessions"] }, 100]
          }
        }
      }
    ]);

    res.json(result[0] || { attendancePercentage: 0 });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOP STUDENTS
export const getTopStudents = async (req, res) => {
  try {
    const classId = req.params.classId;

    const result = await StudentPerformance.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student"
        }
      },
      { $unwind: "$student" },
      { $match: { "student.classId": new mongoose.Types.ObjectId(classId) } },
      {
        $group: {
          _id: "$student._id",
          name: { $first: "$student.name" },
          avgMarks: { $avg: "$marks" }
        }
      },
      { $sort: { avgMarks: -1 } },
      { $limit: 3 }
    ]);

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// FIXED WEAK STUDENT LOGIC
export const getWeakStudents = async (req, res) => {
  try {
    const classId = req.params.classId;

    const weak = await StudentPerformance.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student"
        }
      },
      { $unwind: "$student" },
      { $match: { "student.classId": new mongoose.Types.ObjectId(classId) } },
      {
        $group: {
          _id: "$student._id",
          name: { $first: "$student.name" },
          avgMarks: { $avg: "$marks" }
        }
      },
      { $match: { avgMarks: { $lt: 40 } } },
      { $sort: { avgMarks: 1 } }
    ]);

    res.json(weak);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
