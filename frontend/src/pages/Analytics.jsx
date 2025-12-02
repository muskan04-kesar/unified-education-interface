import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";

import React, { useEffect, useState } from "react";
import {
  getClassAverage,
  getClassAttendance,
  getTopStudents,
  getWeakStudents,
} from "../services/analyticsService.js";

const Analytics = () => {
  const classId = "6925e3c73b0b7c3478063fe0";

  const [average, setAverage] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [topStudents, setTopStudents] = useState([]);
  const [weakStudents, setWeakStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const avgData = await getClassAverage(classId);
        const attData = await getClassAttendance(classId);
        const topData = await getTopStudents(classId);
        const weakData = await getWeakStudents(classId);

        console.log("AVG DATA", avgData);
        console.log("ATT DATA", attData);
        console.log("TOP DATA", topData);
        console.log("WEAK DATA", weakData);

        setAverage(avgData?.averageClassMarks || 0);
        setAttendance(attData?.attendancePercentage || 0);
        setTopStudents(Array.isArray(topData) ? topData : []);
        setWeakStudents(Array.isArray(weakData) ? weakData : []);

      } catch (error) {
        console.error("Error loading analytics:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading analytics...</h2>;
  }

  return (
    <div style={styles.container}>
  <h1 style={styles.heading}>📊 Class Analytics Dashboard</h1>

  {/* CHARTS SECTION */}
  <div style={styles.chartGrid}>

    {/* Line Chart - Average Marks */}
    <div style={styles.chartCard}>
      <h3 style={styles.chartTitle}>📈 Average Marks Trend</h3>
      <LineChart width={350} height={250} data={[
        { name: "Overall", marks: average }
      ]}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="marks" stroke="#005eff" strokeWidth={3} />
      </LineChart>
    </div>

    {/* Pie Chart - Attendance */}
    <div style={styles.chartCard}>
      <h3 style={styles.chartTitle}>🟦 Attendance Percentage</h3>
      <PieChart width={350} height={250}>
        <Pie
          data={[
            { name: "Present", value: attendance },
            { name: "Absent", value: 100 - attendance },
          ]}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          label
          dataKey="value"
        >
          <Cell fill="#007bff" />
          <Cell fill="#cccccc" />
        </Pie>
        <Tooltip />
      </PieChart>
    </div>

  </div>

  {/* TOP STUDENTS BAR CHART */}
  <div style={styles.chartCardWide}>
    <h3 style={styles.chartTitle}>🏆 Top Students Comparison</h3>

    <BarChart width={700} height={300} data={topStudents}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="avgMarks" fill="#28a745" />
    </BarChart>
  </div>

  {/* Weak Students Section */}
  <div style={styles.section}>
    <h2>⚠️ Weak Students (Below 40%)</h2>
    {weakStudents.length === 0 ? (
      <p style={{ color: "green" }}>🎉 No weak students!</p>
    ) : (
      <ul style={styles.list}>
        {weakStudents.map((s) => (
          <li key={s._id} style={styles.listItem}>
            <span>{s.name}</span>
            <span style={styles.badScore}>{s.avgMarks}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

  );
};

// --------------------------
// Beautiful Dashboard Styles
// --------------------------
const styles = {
  container: {
    padding: "30px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    marginBottom: "30px",
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "bold",
  },
  cardGrid: {
    display: "flex",
    gap: "20px",
    marginBottom: "40px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    background: "#24dfa7ff",
    padding: "20px",
    borderRadius: "12px",
    width: "250px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  highlightNumber: {
    fontSize: "28px",
    color: "#005eff",
    fontWeight: "bold",
    marginTop: "10px",
  },
  section: {
    marginBottom: "35px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    background: "#fff",
    padding: "12px 18px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  goodScore: {
    color: "green",
    fontWeight: "bold",
  },
  badScore: {
    color: "red",
    fontWeight: "bold",
  },
  chartGrid: {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: "40px",
},
chartCard: {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textAlign: "center",
},
chartCardWide: {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  marginTop: "40px",
  textAlign: "center",
},
chartTitle: {
  fontSize: "20px",
  marginBottom: "10px",
  fontWeight: "600",
},

};

export default Analytics;
