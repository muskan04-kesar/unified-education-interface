// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "./models/user.js";
import Student from "./models/student.js";
import Teacher from "./models/teacher.js";
import Institution from "./models/institution.js";
import ClassModel from "./models/class.js";
import StudentPerformance from "./models/performance.js";
import GovReport from "./models/govreport.js";

dotenv.config();

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const subjects = ["Maths", "Science", "English", "Social", "Hindi"];
const teacherNames = [
  "Ravi Kumar", "Neha Sharma", "Sunil Verma", "Priya Singh", "Amit Joshi"
];
const studentFirst = [
  "Aman", "Rohit", "Neelam", "Sakshi", "Priyanka", "Vikram", "Karan",
  "Rhea", "Simran", "Tarun", "Kavita", "Aditya", "Sana", "Mohit", "Ritu",
  "Ankit", "Deepa", "Ishaan", "Maya", "Anjali", "Rahul", "Pooja", "Yash",
  "Kriti", "Aisha", "Manish", "Shreya", "Vansh", "Ritu", "Siddharth"
];
const domains = ["uei.edu", "student.edu", "mail.com"];

const randomAadhaar = (used) => {
  while (1) {
    const s = String(rnd(100000000000, 999999999999));
    if (!used.has(s)) {
      used.add(s);
      return s;
    }
  }
};

const randomAPAR = (i) => `APAR-T-${1000 + i}`;

const randomEmail = (name, idx) => {
  const n = name.toLowerCase().replace(/\s+/g, ".");
  return `${n}${idx}@${pick(domains)}`;
};

const makeDOB = () => {
  // students around 13-17 years for class 8-12 -> use 2007-2011
  const year = rnd(2007, 2011);
  const month = rnd(1, 12);
  const day = rnd(1, 28);
  return new Date(year, month - 1, day);
};

const hashPassword = async (plaintext) => await bcrypt.hash(plaintext, 10);

const run = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI not set in .env. Aborting.");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");

    // Clear collections
    await Promise.all([
      User.deleteMany({}),
      Student.deleteMany({}),
      Teacher.deleteMany({}),
      Institution.deleteMany({}),
      ClassModel.deleteMany({}),
      StudentPerformance.deleteMany({}),
      GovReport.deleteMany({})
    ]);
    console.log("Cleared old data");

    // -----------------------
    // Create institution
    // -----------------------
    const inst = await Institution.create({
      name: "Unified Education Institute",
      code: "AISHE1001",
      type: "school",
      address: "Sector 4, Lucknow",
      district: "Lucknow",
      state: "Uttar Pradesh",
      principalName: "Dr. S. Sharma",
      contact: "9876543210",
      nirfScore: 72.4,
      accreditation: "A",
      infraRatings: { classrooms: 12, labs: 6, library: 5, sports: 4 }
    });
    console.log("Institution created:", inst._id.toString());

    const usedAadhaars = new Set();

    // -----------------------
    // Create admin user
    // -----------------------
    const adminPass = await hashPassword("Admin@123");
    const adminUser = await User.create({
      name: "Platform Admin",
      email: "admin@uei.edu",
      password: adminPass,
      role: "admin",
      phone: "9000000000",
      instituteId: inst._id
    });
    console.log("Admin user created:", adminUser._id.toString());

    // -----------------------
    // Create teachers (5)
    // -----------------------
    const teachers = [];
    for (let i = 0; i < teacherNames.length; i++) {
      const name = teacherNames[i];
      const email = randomEmail(name, i + 1);
      const rawPass = `Teach${i + 1}@123`;
      const hashed = await hashPassword(rawPass);

      const aadhaar = randomAadhaar(usedAadhaars);
      const aparId = randomAPAR(i + 1);

      const user = await User.create({
        name,
        email,
        password: hashed,
        role: "teacher",
        phone: `88${rnd(10000000, 99999999)}`,
        aadhaar,
        aparId,
        instituteId: inst._id
      });

      const teacher = await Teacher.create({
        userId: user._id,
        instituteId: inst._id,
        aadhaar,
        aparId,
        department: pick(["Science", "Maths", "Languages", "Social"]),
        subjects: [subjects[i % subjects.length], subjects[(i + 1) % subjects.length]],
        experienceYears: rnd(2, 12),
        qualifications: pick(["B.Ed", "M.Sc", "M.A", "B.Tech"]),
        aiPerformanceSummary: "Teacher performance baseline"
      });

      teachers.push({ user, teacher });
    }
    console.log("Teachers created:", teachers.length);

    // -----------------------
    // Create classes (3 sections)
    // -----------------------
    const classes = [];
    const classNames = ["10", "11", "12"];
    const sections = ["A", "B", "C"];
    for (let i = 0; i < classNames.length; i++) {
      for (let s = 0; s < 1; s++) { // 1 section per class (you can expand)
        const classDoc = await ClassModel.create({
          instituteId: inst._id,
          className: classNames[i],
          section: sections[s],
          academicYear: "2024-2025",
          classTeacherId: teachers[(i + s) % teachers.length].teacher._id,
          subjects
        });
        classes.push(classDoc);
      }
    }
    console.log("Classes created:", classes.length);

    // -----------------------
    // Create students (30)
    // -----------------------
    const students = [];
    for (let i = 0; i < 30; i++) {
      const name = studentFirst[i % studentFirst.length] + ` ${pick(["Kumar","Sharma","Singh","Verma","Gupta"])}`;
      const email = randomEmail(name, i + 1);
      const rawPass = `Stud${i + 1}@123`;
      const hashed = await hashPassword(rawPass);
      const aadhaar = randomAadhaar(usedAadhaars);

      const user = await User.create({
        name,
        email,
        password: hashed,
        role: "student",
        phone: `77${rnd(10000000, 99999999)}`,
        aadhaar,
        instituteId: inst._id
      });

      // assign to classes round-robin
      const cls = classes[i % classes.length];

      const student = await Student.create({
        userId: user._id,
        aadhaar,
        aadhaarVerified: true,
        aadhaarVerifiedAt: new Date(),
        dob: makeDOB(),
        gender: pick(["male", "female", "other"]),
        address: `${rnd(10, 200)} Residency, Lucknow`,
        district: "Lucknow",
        state: "Uttar Pradesh",
        guardianName: `${pick(["Raj","Suresh","Anita","Meena"])} ${pick(["Singh","Sharma"])}`,
        guardianPhone: `66${rnd(10000000, 99999999)}`,
        instituteId: inst._id,
        classId: cls._id,
        badges: [],
        performanceScore: rnd(40, 90),
        riskLevel: pick(["low", "medium", "low", "low"]),
        aiInsights: "Baseline student profile"
      });

      students.push({ user, student, class: cls });
    }
    console.log("Students created:", students.length);

    // -----------------------
    // Create performance records (~300)
    // -----------------------
    const perfDocs = [];
    const totalRecords = 300;
    for (let i = 0; i < totalRecords; i++) {
      const sIdx = Math.floor(Math.random() * students.length);
      const studentObj = students[sIdx];
      const subj = pick(subjects);
      const teacherObj = pick(teachers).teacher;

      // Randomly choose test type with more attendance records
      const testType = Math.random() < 0.6 ? "attendance" : (Math.random() < 0.7 ? "quiz" : "exam");

      // marks only for quizzes/exams
      const marks = testType === "attendance" ? null : rnd(30, 100);
      const attendance = testType === "attendance" ? (Math.random() < 0.9) : true;

      const date = new Date(2024, rnd(0, 11), rnd(1, 28)); // spread over year

      const rec = {
        studentId: studentObj.student._id,
        teacherId: teacherObj._id,
        subjectId: subj,
        date,
        testType,
        attendance,
        marks,
        behaviourNotes: pick([
          "Participative", "Quiet", "Needs Attention", "Improving", "Good"
        ]),
        aiSummary: `${subj} performance: ${marks ? marks : (attendance ? "Present" : "Absent")}`
      };

      perfDocs.push(rec);
    }

    // Insert in bulk
    await StudentPerformance.insertMany(perfDocs);
    console.log("StudentPerformance records created:", perfDocs.length);

    // -----------------------
    // Create Gov Reports (3 months)
    // -----------------------
    const months = ["January", "February", "March"];
    for (let m of months) {
      // compute classWisePerformance: average marks per class based on inserted performance
      const classWisePerformance = {};
      for (const cls of classes) {
        // sample: compute average marks for students of this class
        const classStuds = students.filter(s => s.class._id.toString() === cls._id.toString());
        const studIds = classStuds.map(s => s.student._id);
        const agg = await StudentPerformance.aggregate([
          { $match: { studentId: { $in: studIds } } },
          { $group: { _id: "$studentId", avgMarks: { $avg: "$marks" } } }
        ]);
        // average of averages (fallback)
        const vals = agg.map(a => a.avgMarks).filter(v => v != null);
        classWisePerformance[`${cls.className}-${cls.section}`] =
          vals.length ? Number((vals.reduce((s,x)=>s+x,0)/vals.length).toFixed(1)) : null;
      }

      const dropoutRiskList = students
        .filter(s => s.student.performanceScore < 45 || s.student.riskLevel === "high")
        .slice(0, 5)
        .map(s => s.student._id);

      await GovReport.create({
        instituteId: inst._id,
        month: m,
        attendanceRate: rnd(70, 95),
        classWisePerformance,
        dropoutRiskList,
        nirfMetrics: { teaching: rnd(60, 90), learning: rnd(60, 90) },
        infraMetrics: { labs: "Good", library: "Average", sports: "Good" },
        aparSummary: { averageTeacherScore: rnd(65, 90) },
        aiInsights: "Monthly trend stable with slight improvement",
        summary: `${m} snapshot for ${inst.name}`
      });
    }

    console.log("GovReports created for months:", months.join(", "));

    console.log("SEED COMPLETE ✅");
    process.exit(0);

  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

run();
