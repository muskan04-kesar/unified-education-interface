import React from "react";
import Card from "../components/Card";
import { getRole } from "../auth";

export default function Dashboard() {
  const role = getRole(); // logged-in role

  return (
    <div className="page">

      <div className="header">
        <h2>Dashboard</h2>
        <p className="subtitle">Role: <strong>{role.toUpperCase()}</strong></p>
      </div>

      <div className="grid">
        
        {/* ---------------- STUDENT DASHBOARD ---------------- */}
        {role === "student" && (
          <>
            <Card
              title="My Profile"
              desc="View your personal and academic details"
              link="/student"
              pill="Student"
            />

            <Card
              title="Leaderboard"
              desc="Check your ranking and performance"
              link="/leaderboard"
              pill="Rankings"
            />

            <Card
              title="Government Schemes"
              desc="Explore available benefits"
              link="/schemes"
              pill="Schemes"
            />
          </>
        )}

        {/* ---------------- TEACHER DASHBOARD ---------------- */}
        {role === "teacher" && (
          <>
            <Card
              title="Teacher Panel"
              desc="Your tools & responsibilities"
              link="/teacher"
              pill="Teacher"
            />

            <Card
              title="Edit Student Data"
              desc="Update attendance & academics"
              link="/teacher/edit-students"
              pill="Manage"
            />

            <Card
              title="Analytics"
              desc="AI Insights and student analytics"
              link="/analytics"
              pill="Insights"
            />

            <Card
              title="Leaderboard"
              desc="View student rankings"
              link="/leaderboard"
              pill="Students"
            />

            <Card
              title="Government Schemes"
              desc="Education-related schemes"
              link="/schemes"
              pill="Schemes"
            />
          </>
        )}

        {/* ---------------- INSTITUTION DASHBOARD ---------------- */}
        {role === "institution" && (
          <>
            <Card
              title="Institution Dashboard"
              desc="Manage teachers, students, reports"
              link="/institution"
              pill="Institute"
            />

            <Card
              title="Analytics"
              desc="AI-generated institute analytics"
              link="/analytics"
              pill="Insights"
            />

            <Card
              title="Leaderboard"
              desc="Top students institution-wide"
              link="/leaderboard"
              pill="Top"
            />

            <Card
              title="Govt Schemes"
              desc="Student & teacher schemes"
              link="/schemes"
              pill="Schemes"
            />
          </>
        )}

        {/* ---------------- GOVERNMENT DASHBOARD ---------------- */}
        {role === "government" && (
          <>
            <Card
              title="Government Dashboard"
              desc="Monitoring and policy tools"
              link="/government"
              pill="Govt"
            />

            <Card
              title="National Analytics"
              desc="AI insights on education data"
              link="/analytics"
              pill="Analytics"
            />

            <Card
              title="Leaderboard"
              desc="Top ranked schools & students"
              link="/leaderboard"
              pill="Ranking"
            />

            <Card
              title="Schemes"
              desc="Manage and publish schemes"
              link="/schemes"
              pill="Schemes"
            />
          </>
        )}

      </div>
    </div>
  );
}
