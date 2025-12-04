import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Clock, FileText, Menu, Settings, LogOut, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API}/teacher/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-600 to-blue-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-blue-500">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h2 className="text-xl font-bold">Teacher Portal</h2>}
            <Button
              data-testid="toggle-sidebar-btn"
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-blue-700"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Button data-testid="nav-overview" variant="ghost" className="w-full justify-start text-white hover:bg-blue-700">
            <TrendingUp className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Overview</span>}
          </Button>
          <Button data-testid="nav-classes" variant="ghost" className="w-full justify-start text-white hover:bg-blue-700">
            <BookOpen className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Classes</span>}
          </Button>
          <Button data-testid="nav-research" variant="ghost" className="w-full justify-start text-white hover:bg-blue-700">
            <FileText className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Research</span>}
          </Button>
        </nav>

        <div className="p-4 border-t border-blue-500 space-y-2">
          <Button data-testid="nav-settings" variant="ghost" className="w-full justify-start text-white hover:bg-blue-700" onClick={() => navigate('/settings')}>
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </Button>
          <Button data-testid="nav-logout" variant="ghost" className="w-full justify-start text-white hover:bg-blue-700" onClick={() => navigate('/')}>
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
                <p className="text-gray-600">{profile.department} - {profile.apar_id}</p>
              </>
            )}
          </div>

          {/* Overview Cards */}
          {profile && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card data-testid="card-apar" className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                  <Award className="w-8 h-8 mb-3 opacity-90" />
                  <p className="text-sm opacity-90">APAR Score</p>
                  <p className="text-3xl font-bold mt-1">{profile.apar_score}/5.0</p>
                </Card>
                <Card data-testid="card-workload" className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                  <Clock className="w-8 h-8 mb-3 opacity-90" />
                  <p className="text-sm opacity-90">Weekly Hours</p>
                  <p className="text-3xl font-bold mt-1">{profile.workload_hours}h</p>
                </Card>
                <Card data-testid="card-publications" className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                  <FileText className="w-8 h-8 mb-3 opacity-90" />
                  <p className="text-sm opacity-90">Publications</p>
                  <p className="text-3xl font-bold mt-1">{profile.research_publications}</p>
                </Card>
                <Card data-testid="card-certifications" className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg">
                  <Award className="w-8 h-8 mb-3 opacity-90" />
                  <p className="text-sm opacity-90">Certifications</p>
                  <p className="text-3xl font-bold mt-1">{profile.certifications}</p>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Timetable */}
                <Card className="p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">This Week's Timetable</h3>
                  <div className="space-y-3">
                    {profile.timetable.map((slot, idx) => (
                      <div key={idx} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-900">{slot.subject}</p>
                            <p className="text-sm text-gray-600 mt-1">{slot.class}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-blue-600">{slot.day}</p>
                            <p className="text-sm text-gray-600">{slot.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Class Performance */}
                <Card className="p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Class Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={profile.class_performance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="class" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avg_score" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-sm text-gray-600 mt-4 text-center">Average student scores across your classes</p>
                </Card>
              </div>

              {/* Research Panel */}
              <Card className="p-6 shadow-lg mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Research & Training</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Publications This Year</p>
                    <p className="text-2xl font-bold text-purple-600">{profile.research_publications}</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Active Certifications</p>
                    <p className="text-2xl font-bold text-indigo-600">{profile.certifications}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Training Status</p>
                    <p className="text-lg font-bold text-green-600">Up to Date</p>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}