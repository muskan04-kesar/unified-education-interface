import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMPONENTS
import Splash from "./components/Splash";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";

// AUTH
import { ROLES } from "./roles";

// PAGES
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentProfile from "./pages/StudentProfile";
import TeacherProfile from "./pages/TeacherProfile";
import StudentTableEditor from "./pages/StudentTableEditor";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import GovernmentDashboard from "./pages/GovernmentDashboard";
import Analytics from "./pages/Analytics";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  const [loading, setLoading] = useState(true);

  // Show SPLASH SCREEN for 2 seconds
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <Splash />;

  return (
    <BrowserRouter>
      <div className="app-shell">
        
        <Sidebar />

        <main className="main-area">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Login />} />

            {/* Dashboard — accessible to ALL logged-in users */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    ROLES.STUDENT,
                    ROLES.TEACHER,
                    ROLES.INSTITUTION,
                    ROLES.GOVERNMENT,
                  ]}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Student */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                  <StudentProfile />
                </ProtectedRoute>
              }
            />

            {/* Teacher */}
            <Route
              path="/teacher"
              element={
                <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                  <TeacherProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/teacher/edit-students"
              element={
                <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                  <StudentTableEditor />
                </ProtectedRoute>
              }
            />

            {/* Institution */}
            <Route
              path="/institution"
              element={
                <ProtectedRoute allowedRoles={[ROLES.INSTITUTION]}>
                  <InstitutionDashboard />
                </ProtectedRoute>
              }
            />

            {/* Government */}
            <Route
              path="/government"
              element={
                <ProtectedRoute allowedRoles={[ROLES.GOVERNMENT]}>
                  <GovernmentDashboard />
                </ProtectedRoute>
              }
            />

            {/* Shared Analytics */}
            <Route
              path="/analytics"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    ROLES.TEACHER,
                    ROLES.INSTITUTION,
                    ROLES.GOVERNMENT,
                  ]}
                >
                  <Analytics />
                </ProtectedRoute>
              }
            />

            {/* Leaderboard */}
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    ROLES.STUDENT,
                    ROLES.TEACHER,
                    ROLES.INSTITUTION,
                    ROLES.GOVERNMENT,
                  ]}
                >
                  <Leaderboard />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
