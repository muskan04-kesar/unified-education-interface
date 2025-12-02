import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// NEW PAGE
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


// ---------------- LAYOUT: Hides Sidebar on Login ----------------
function LayoutWithSidebar({ children }) {
  const location = useLocation();

  const hideSidebar = location.pathname === "/";

  return (
    <div className="app-shell">
      {!hideSidebar && <Sidebar />}
      <main className="main-area">{children}</main>
      {!hideSidebar && <Chatbot />}
    </div>
  );
}


// --------------------------- MAIN APP --------------------------
export default function App() {
  const [loading, setLoading] = useState(true);

  // ⭐ GLOBAL SCHEMES STATE (Gov can edit it)
  const [schemes, setSchemes] = useState([
    {
      id: 1,
      name: "National Scholarship Scheme",
      desc: "Financial assistance for meritorious students.",
      link: "https://scholarships.gov.in/",
    },
    {
      id: 2,
      name: "PM e-Vidya",
      desc: "Digital learning resources for all students.",
      link: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1628347",
    }
  ]);

  // SPLASH
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


          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={[
                ROLES.STUDENT,
                ROLES.TEACHER,
                ROLES.INSTITUTION,
                ROLES.GOVERNMENT
              ]}>
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


          {/* Government (with scheme editing power) */}
          <Route
            path="/government"
            element={
              <ProtectedRoute allowedRoles={[ROLES.GOVERNMENT]}>
                <GovernmentDashboard
                  schemes={schemes}
                  setSchemes={setSchemes}
                />
              </ProtectedRoute>
            }
          />


          {/* Analytics */}
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={[
                ROLES.TEACHER,
                ROLES.INSTITUTION,
                ROLES.GOVERNMENT
              ]}>
                <Analytics />
              </ProtectedRoute>
            }
          />


          {/* Leaderboard */}
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute allowedRoles={[
                ROLES.STUDENT,
                ROLES.TEACHER,
                ROLES.INSTITUTION,
                ROLES.GOVERNMENT
              ]}>
                <Leaderboard />
              </ProtectedRoute>
            }
          />


          {/* NEW SCHEMES PAGE (Visible to ALL roles) */}
          <Route
            path="/schemes"
            element={
              <ProtectedRoute allowedRoles={[
                ROLES.STUDENT,
                ROLES.TEACHER,
                ROLES.INSTITUTION,
                ROLES.GOVERNMENT
              ]}>
                <Schemes schemes={schemes} />
              </ProtectedRoute>
            }
          />

        </Routes>

      </LayoutWithSidebar>
    </BrowserRouter>
  );
}
