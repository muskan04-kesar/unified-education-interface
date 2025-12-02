import mongoose from "mongoose";
import Student from "../models/student.js";
import StudentPerformance from "../models/performance.js";

// ----------------------
// 1. CLASS AVERAGE
// ----------------------
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
      { $match: { marks: { $ne: null } } },
      {
        $group: {
          _id: null,
          averageClassMarks: { $avg: "$marks" }
        }
      }
    ]);

    res.json(result[0] || { averageClassMarks: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------------
// 2. CLASS ATTENDANCE
// ----------------------
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
          presentCount: { 
            $sum: { 
              $cond: [{ $eq: ["$attendance", true] }, 1, 0] 
            } 
          }
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

// ----------------------
// 3. TOP STUDENTS
// ----------------------
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
      { $match: { marks: { $ne: null } } },
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

// ----------------------
// 4. WEAK STUDENTS
// ----------------------
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
      { $match: { marks: { $ne: null } } },
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

// --------------------------------------------------------
// NEW ANALYTICS ADDED BELOW
// --------------------------------------------------------

// ----------------------
// 5. SUBJECT-WISE PERFORMANCE
// ----------------------
export const getSubjectPerformance = async (req, res) => {
  try {
    const classId = req.params.classId;

    const data = await StudentPerformance.aggregate([
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
      { $match: { marks: { $ne: null } } },
      {
        $group: {
          _id: "$subjectId",
          avgMarks: { $avg: "$marks" }
        }
      },
      {
        $project: {
          subject: "$_id",
          avgMarks: 1,
          _id: 0
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------------
// 6. MONTHLY PERFORMANCE TREND
// ----------------------
export const getMonthlyTrend = async (req, res) => {
  try {
    const classId = req.params.classId;

    const data = await StudentPerformance.aggregate([
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
      { $match: { marks: { $ne: null } } },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          avgMarks: { $avg: "$marks" }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    res.json(
      data.map(d => ({
        month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d._id.month - 1],
        avgMarks: d.avgMarks
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------------
// 7. MONTHLY ATTENDANCE TREND
// ----------------------
export const getAttendanceTrend = async (req, res) => {
  try {
    const classId = req.params.classId;

    const data = await StudentPerformance.aggregate([
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
          _id: { month: { $month: "$date" } },
          attendance: {
            $avg: {
              $cond: [{ $eq: ["$attendance", true] }, 100, 0]
            }
          }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    res.json(
      data.map(d => ({
        month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d._id.month - 1],
        attendance: d.attendance
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------------
// 8. RISK LEVEL ANALYTICS
// ----------------------
export const getRiskLevels = async (req, res) => {
  try {
    const classId = req.params.classId;

    const data = await Student.aggregate([
      { $match: { classId: new mongoose.Types.ObjectId(classId) } },
      {
        $group: {
          _id: "$riskLevel",
          count: { $sum: 1 }
        }
      }
    ]);

    const formatted = { low: 0, medium: 0, high: 0 };
    data.forEach(d => (formatted[d._id] = d.count));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------------
// 9. TEACHER EFFECTIVENESS
// ----------------------
export const getTeacherEffectiveness = async (req, res) => {
  try {
    const classId = req.params.classId;

    const data = await StudentPerformance.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student"
        }
      },
      { $unwind: "$student" },
      {
        $lookup: {
          from: "teachers",
          localField: "teacherId",
          foreignField: "_id",
          as: "teacher"
        }
      },
      { $unwind: "$teacher" },
      { $match: { "student.classId": new mongoose.Types.ObjectId(classId) } },
      { $match: { marks: { $ne: null } } },
      {
        $group: {
          _id: "$teacher.userId",
          teacherName: { $first: "$teacher.name" },
          avgMarks: { $avg: "$marks" }
        }
      },
      { $sort: { avgMarks: -1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------------
// 10. WEAK SUBJECT ANALYSIS
// ----------------------
export const getWeakSubjects = async (req, res) => {
  try {
    const classId = req.params.classId;

    const data = await StudentPerformance.aggregate([
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
      { $match: { marks: { $ne: null } } },
      {
        $group: {
          _id: "$subjectId",
          weakCount: { 
            $sum: { $cond: [{ $lt: ["$marks", 40] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          subject: "$_id",
          weakCount: 1,
          _id: 0
        }
      },
      { $sort: { weakCount: -1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
