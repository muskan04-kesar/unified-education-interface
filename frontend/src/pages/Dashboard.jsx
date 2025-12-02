import React from 'react';
import Card from '../components/Card';
import { getRole } from "../auth";
import { ROLES } from "../roles";

export default function Dashboard() {
  const role = getRole();

  return (
    <div className="page">

      {/* Header */}
      <div className="header">
        <div>
          <div className="title">Dashboard</div>
          <div className="subtitle">
            Unified view — Students · Teachers · Institutions · Govt
          </div>
        </div>

        <button className="btn">Create Report</button>
      </div>

      {/* Cards Grid */}
      <div className="grid">

        {/* Student Profile – visible to ALL except government */}
        {role !== ROLES.GOVERNMENT && (
          <Card
            title="Student Profile"
            desc="View student details and performance"
            link="/student"
            pill="Students"
          />
        )}

        {/* Teacher Tools – only teacher */}
        {role === ROLES.TEACHER && (
          <Card
            title="Teacher Tools"
            desc="Manage classes & attendance"
            link="/teacher"
            pill="Teachers"
          />
        )}

        {/* Analytics – not for student */}
        {role !== ROLES.STUDENT && (
          <Card
            title="Analytics"
            desc="AI insights and charts"
            link="/analytics"
            pill="Insights"
          />
        )}

        {/* Leaderboard – ❌ hidden for government */}
        {role !== ROLES.GOVERNMENT && (
          <Card
            title="Leaderboard"
            desc="Top performing students"
            link="/leaderboard"
            pill="Gamify"
          />
        )}

        {/* Institution */}
        {role === ROLES.INSTITUTION && (
          <Card
            title="Institution Reports"
            desc="NIRF & AISHE reports"
            link="/institution"
            pill="Institution"
          />
        )}

        {/* Government Panel */}
        {role === ROLES.GOVERNMENT && (
          <Card
            title="Government Panel"
            desc="Scheme monitoring"
            link="/government"
            pill="Govt"
          />
        )}

      </div>
    </div>
  );
}
