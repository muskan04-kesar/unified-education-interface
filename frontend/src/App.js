import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// NEW PAGE (Govt Schemes)
import Schemes from "./pages/Schemes";

// COMPONENTS
import Splash from "./components/Splash";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Chatbot from "./components/Chatbot";

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


// ----------- LAYOUT WRAPPER (Hides Sidebar on Login) ------------
function LayoutWithSidebar({ children }) {
  const location = useLocation();

  // Only hide sidebar on login page
  const hideSidebar = location.pathname === "/";

  return (
    <div className="app-shell">
      {!hideSidebar && <Sidebar />}   {/* Sidebar visible AFTER login */}
      <main className="main-area">{children}</main>
      {!hideSidebar && <Chatbot />}   {/* Chatbot hidden on login */}
    </div>
  );
}



// ----------------------- MAIN APP ------------------------------
export default function App() {
  const [loading, setLoading] = useState(true);

  // Show Splash Screen for 2 seconds
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <Splash />;

  return (
    <BrowserRouter>
      <LayoutWithSidebar>

        <Routes>

          {/* Public Login */}
          <Route path="/" element={<Login />} />



          {/* Dashboard (ALL ROLES) */}
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



          {/* Analytics (not for students) */}
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



          {/* Leaderboard (all users) */}
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



          {/* ✔️ New Govt Schemes Page (all users can access) */}
          <Route
            path="/schemes"
            element={
              <ProtectedRoute
                allowedRoles={[
                  ROLES.STUDENT,
                  ROLES.TEACHER,
                  ROLES.INSTITUTION,
                  ROLES.GOVERNMENT,
                ]}
              >
                <Schemes />
              </ProtectedRoute>
            }
          />

        </Routes>

      </LayoutWithSidebar>
    </BrowserRouter>
  );
}
