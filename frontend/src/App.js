import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@/App.css";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import GovernmentDashboard from "@/pages/GovernmentDashboard";
import InstitutionDashboard from "@/pages/InstitutionDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import StudentDashboard from "@/pages/StudentDashboard";
import SettingsPage from "@/pages/SettingsPage";
import ProfilePage from "@/pages/ProfilePage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/government" element={user?.role === 'government' ? <GovernmentDashboard /> : <Navigate to="/login" />} />
          <Route path="/institution" element={user?.role === 'institution' ? <InstitutionDashboard /> : <Navigate to="/login" />} />
          <Route path="/teacher" element={user?.role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" />} />
          <Route path="/student" element={user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/login" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage user={user} />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;