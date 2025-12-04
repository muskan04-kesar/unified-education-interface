import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, TrendingUp, Menu, Settings, LogOut, FileText, Briefcase } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API}/student/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const skillsRadarData = profile?.skills.map(skill => ({
    skill,
    proficiency: Math.floor(Math.random() * 30) + 70
  }));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-purple-600 to-purple-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-purple-500">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h2 className="text-xl font-bold">Student Portal</h2>}
            <Button
              data-testid="toggle-sidebar-btn"
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-purple-700"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Button data-testid="nav-overview" variant="ghost" className="w-full justify-start text-white hover:bg-purple-700">
            <TrendingUp className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Overview</span>}
          </Button>
          <Button data-testid="nav-academics" variant="ghost" className="w-full justify-start text-white hover:bg-purple-700">
            <BookOpen className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Academics</span>}
          </Button>
          <Button data-testid="nav-projects" variant="ghost" className="w-full justify-start text-white hover:bg-purple-700">
            <FileText className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Projects</span>}
          </Button>
          <Button data-testid="nav-placements" variant="ghost" className="w-full justify-start text-white hover:bg-purple-700">
            <Briefcase className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Placements</span>}
          </Button>
        </nav>

        <div className="p-4 border-t border-purple-500 space-y-2">
          <Button data-testid="nav-settings" variant="ghost" className="w-full justify-start text-white hover:bg-purple-700" onClick={() => navigate('/settings')}>
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </Button>
          <Button data-testid="nav-logout" variant="ghost" className="w-full justify-start text-white hover:bg-purple-700" onClick={() => navigate('/')}>
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            {profile && (
              <>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                <p className="text-gray-600">{profile.roll_no}</p>
              </>
            )}
          </div>

          {/* Overview Cards */}
          {profile && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card data-testid="card-cgpa" className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                  <Award className="w-8 h-8 mb-3 opacity-90" />
                  <p className="text-sm opacity-90">CGPA</p>
                  <p className="text-3xl font-bold mt-1">{profile.cgpa}</p>
                </Card>
                <Card data-testid="card-attendance" className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                  <TrendingUp className="w-8 h-8 mb-3 opacity-90" />
                  <p className="text-sm opacity-90">Attendance</p>
                  <p className="text-3xl font-bold mt-1">{profile.attendance}%</p>
                </Card>
                <Card data-testid="card-certifications" className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                  <Award className="w-8 h-8 mb-3 opacity-90" />
                  <p className="text-sm opacity-90">Certifications</p>
                  <p className="text-3xl font-bold mt-1">{profile.certifications}</p>
                </Card>
                <Card data-testid="card-scholarship" className={`p-6 bg-gradient-to-br ${profile.scholarship_eligible ? 'from-green-500 to-green-600' : 'from-gray-400 to-gray-500'} text-white shadow-lg`}>
                  <Award className="w-8 h-8 mb-3 opacity-90" />
                  <p className="text-sm opacity-90">Scholarship</p>
                  <p className="text-lg font-bold mt-1">{profile.scholarship_eligible ? 'Eligible' : 'Not Eligible'}</p>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Academic Performance */}
                <Card className="p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Academic Performance Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={profile.academic_performance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="semester" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="cgpa" stroke="#9333ea" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>

                {/* Skills Radar */}
                <Card className="p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Skills Assessment</h3>
                  {skillsRadarData && (
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={skillsRadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Proficiency" dataKey="proficiency" stroke="#9333ea" fill="#9333ea" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {profile.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Projects */}
              <Card className="p-6 shadow-lg mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Projects & Internships</h3>
                <div className="space-y-4">
                  {profile.projects.map((project, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{project.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">Duration: {project.duration}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Placement Recommendations */}
              <Card className="p-6 shadow-lg mb-6 border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Placement Recommendations</h3>
                <div className="space-y-3">
                  {profile.placement_recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-emerald-50 to-white rounded-lg border border-emerald-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900">{rec.company}</p>
                          <p className="text-sm text-gray-600">Based on your skills and performance</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-600">{rec.match}%</p>
                          <p className="text-xs text-gray-500">Match</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Digital CV */}
              <Card className="p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Digital CV</h3>
                  <Button data-testid="download-cv-btn" className="bg-purple-600 hover:bg-purple-700">
                    <FileText className="w-4 h-4 mr-2" />
                    Download CV
                  </Button>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Your digital CV is ready with all your academic records, skills, projects, and certifications.</p>
                </div>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}