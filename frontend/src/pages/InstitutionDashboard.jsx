import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, BookOpen, Award, Menu, BarChart3, Settings, LogOut, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const COLORS = ['#6366f1', '#10b981', '#f59e0b'];

export default function InstitutionDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API}/institution/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-emerald-600 to-emerald-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-emerald-500">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h2 className="text-xl font-bold">Institution</h2>}
            <Button
              data-testid="toggle-sidebar-btn"
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-emerald-700"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Button data-testid="nav-overview" variant="ghost" className="w-full justify-start text-white hover:bg-emerald-700">
            <BarChart3 className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Overview</span>}
          </Button>
          <Button data-testid="nav-academics" variant="ghost" className="w-full justify-start text-white hover:bg-emerald-700">
            <BookOpen className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Academics</span>}
          </Button>
          <Button data-testid="nav-faculty" variant="ghost" className="w-full justify-start text-white hover:bg-emerald-700">
            <Users className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Faculty</span>}
          </Button>
        </nav>

        <div className="p-4 border-t border-emerald-500 space-y-2">
          <Button data-testid="nav-settings" variant="ghost" className="w-full justify-start text-white hover:bg-emerald-700" onClick={() => navigate('/settings')}>
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </Button>
          <Button data-testid="nav-logout" variant="ghost" className="w-full justify-start text-white hover:bg-emerald-700" onClick={() => navigate('/')}>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Institution Dashboard</h1>
            {profile && <p className="text-gray-600">{profile.name} - {profile.aishe_code}</p>}
          </div>

          {/* Overview Cards */}
          {profile && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card data-testid="card-aishe" className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                  <Building2 className="w-8 h-8 mb-3 opacity-90" />
                  <p className="text-sm opacity-90">AISHE Code</p>
                  <p className="text-2xl font-bold mt-1">{profile.aishe_code}</p>
                </Card>
                <Card data-testid="card-nirf" className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg">
                  <Award className="w-8 h-8 mb-3 opacity-90" />
                  <p className="text-sm opacity-90">NIRF Score</p>
                  <p className="text-2xl font-bold mt-1">{profile.nirf_score}</p>
                </Card>
                <Card data-testid="card-students" className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                  <Users className="w-8 h-8 mb-3 opacity-90" />
                  <p className="text-sm opacity-90">Total Students</p>
                  <p className="text-2xl font-bold mt-1">{profile.total_students.toLocaleString()}</p>
                </Card>
                <Card data-testid="card-faculty" className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                  <Users className="w-8 h-8 mb-3 opacity-90" />
                  <p className="text-sm opacity-90">Total Faculty</p>
                  <p className="text-2xl font-bold mt-1">{profile.total_faculty}</p>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-l-4 border-emerald-500">
                  <p className="text-gray-600 mb-1">Programs Offered</p>
                  <p className="text-3xl font-bold text-gray-900">{profile.programs}</p>
                </Card>
                <Card className="p-6 border-l-4 border-indigo-500">
                  <p className="text-gray-600 mb-1">Pass Percentage</p>
                  <p className="text-3xl font-bold text-gray-900">{profile.pass_percentage}%</p>
                </Card>
                <Card className="p-6 border-l-4 border-purple-500">
                  <p className="text-gray-600 mb-1">Accreditation</p>
                  <p className="text-3xl font-bold text-gray-900">{profile.accreditation}</p>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Academic Performance */}
                <Card className="p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Academic Performance by Program</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={profile.academics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="program" angle={-15} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="pass_rate" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                {/* Faculty Distribution */}
                <Card className="p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Faculty Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Professors', value: profile.faculty_stats.professors },
                          { name: 'Assoc. Prof', value: profile.faculty_stats.associate_professors },
                          { name: 'Asst. Prof', value: profile.faculty_stats.assistant_professors }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({name, value}) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Smart Alerts */}
              <Card className="p-6 shadow-lg mb-6 border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                  <AlertCircle className="w-6 h-6 text-yellow-600 mr-2" />
                  Smart Alerts
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="font-semibold text-yellow-900">NAAC Accreditation Renewal Due</p>
                    <p className="text-sm text-yellow-700 mt-1">Your NAAC accreditation expires in 3 months. Start preparation now.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-blue-900">NIRF Submission Window Open</p>
                    <p className="text-sm text-blue-700 mt-1">Submit your NIRF data before 31st March 2025.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="font-semibold text-green-900">Research Publications: {profile.faculty_stats.research_publications}</p>
                    <p className="text-sm text-green-700 mt-1">Great work! Faculty published {profile.faculty_stats.research_publications} papers this year.</p>
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