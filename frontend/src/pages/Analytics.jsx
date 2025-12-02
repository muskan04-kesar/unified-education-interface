import React, { useEffect, useState } from "react";
import axios from "axios";
import ClassSelector from "../components/ClassSelector";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line,
  AreaChart, Area,
  PieChart, Pie, Cell,
  ResponsiveContainer,
} from "recharts";

// COLORS FOR PIE CHART
const COLORS = ["#0088FE", "#FFBB28", "#FF4444"];

function Analytics() {
  // CLASS SELECTOR STATE
  const [selectedClassId, setSelectedClassId] = useState("");

  // DATA STATES
  const [avgMarks, setAvgMarks] = useState(null);
  const [attendancePct, setAttendancePct] = useState(null);
  const [subjectPerformance, setSubjectPerformance] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [attendanceTrend, setAttendanceTrend] = useState([]);
  const [riskLevels, setRiskLevels] = useState({});
  const [teacherEffectiveness, setTeacherEffectiveness] = useState([]);
  const [weakSubjects, setWeakSubjects] = useState([]);
  const [topStudents, setTopStudents] = useState([]);
  const [weakStudents, setWeakStudents] = useState([]);

  // FETCH DATA ONLY IF classId SELECTED
  useEffect(() => {
    console.log("Selected classId =", selectedClassId);

    if (!selectedClassId) return;

    const API = `/api/analytics/class/${selectedClassId}`;

    axios.get(`${API}/average`).then(res => setAvgMarks(res.data.averageClassMarks));
    axios.get(`${API}/attendance`).then(res => setAttendancePct(res.data.attendancePercentage));
    axios.get(`${API}/subjects`).then(res => setSubjectPerformance(res.data));
    axios.get(`${API}/monthly-performance`).then(res => setMonthlyTrend(res.data));
    axios.get(`${API}/attendance-trend`).then(res => setAttendanceTrend(res.data));
    axios.get(`${API}/risk-levels`).then(res => setRiskLevels(res.data));
    axios.get(`${API}/teacher-effectiveness`).then(res => setTeacherEffectiveness(res.data));
    axios.get(`${API}/weak-subjects`).then(res => setWeakSubjects(res.data));
    axios.get(`${API}/top`).then(res => setTopStudents(res.data));
    axios.get(`${API}/weak`).then(res => setWeakStudents(res.data));
  }, [selectedClassId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Class Analytics Dashboard</h2>

      {/* CLASS SELECTOR */}
      <ClassSelector onSelect={setSelectedClassId} />

      {!selectedClassId && (
        <p style={{ fontSize: "18px", marginTop: "20px" }}>
          Please select a class to view analytics.
        </p>
      )}

      {selectedClassId && (
        <>
          {/* TOP CARDS */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={cardStyle}>
              <h3>Average Marks</h3>
              <p style={numberStyle}>{avgMarks ? avgMarks.toFixed(1) : "—"}</p>
            </div>

            <div style={cardStyle}>
              <h3>Attendance %</h3>
              <p style={numberStyle}>{attendancePct ? attendancePct.toFixed(1) : "—"}%</p>
            </div>
          </div>

          {/* SUBJECT PERFORMANCE */}
          <Section title="📘 Subject-wise Average Performance">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgMarks" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Section>

          {/* MONTHLY TREND */}
          <Section title="📆 Monthly Performance Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgMarks" stroke="#82ca9d" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Section>

          {/* ATTENDANCE TREND */}
          <Section title="🟦 Monthly Attendance Trend">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceTrend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="attendance" fill="#0088FE" stroke="#005BBB" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </Section>

          {/* RISK PIE CHART */}
          <Section title="🚨 Risk Levels">
            <ResponsiveContainer width="50%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Low", value: riskLevels.low || 0 },
                    { name: "Medium", value: riskLevels.medium || 0 },
                    { name: "High", value: riskLevels.high || 0 },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {COLORS.map((color, i) => (
                    <Cell key={i} fill={color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Section>

          {/* TEACHER EFFECTIVENESS */}
          <Section title="👨‍🏫 Teacher Effectiveness">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teacherEffectiveness}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="teacherName" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgMarks" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </Section>

          {/* WEAK SUBJECTS */}
          <Section title="❗ Weak Subjects (Students < 40 marks)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weakSubjects}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="weakCount" fill="#FF4444" />
              </BarChart>
            </ResponsiveContainer>
          </Section>

        </>
      )}
    </div>
  );
}

// REUSABLE SECTION
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "35px" }}>
    <h3>{title}</h3>
    {children}
  </div>
);

const cardStyle = {
  flex: 1,
  padding: "20px",
  background: "#f8f8f8",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const numberStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  marginTop: "10px",
};

export default Analytics;
