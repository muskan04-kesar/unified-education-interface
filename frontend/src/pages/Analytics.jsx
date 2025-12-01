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

      {/* Metric Cards */}
      <div style={styles.cardGrid}>
        <div style={styles.card}>
          <h3>📘 Average Marks</h3>
          <p style={styles.highlightNumber}>{average}</p>
        </div>

        <div style={styles.card}>
          <h3>🟦 Attendance</h3>
          <p style={styles.highlightNumber}>{attendance}%</p>
        </div>
      </div>

      {/* Top Students */}
      <div style={styles.section}>
        <h2>🏆 Top 3 Students</h2>
        <ul style={styles.list}>
          {topStudents.map((s) => (
            <li key={s._id} style={styles.listItem}>
              <span>{s.name}</span>
              <span style={styles.goodScore}>{s.avgMarks}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weak Students */}
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
    background: "#ffffff",
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
};

export default Analytics;
