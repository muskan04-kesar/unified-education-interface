import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, GraduationCap, TrendingUp, AlertTriangle, Download, Menu, BarChart3, FileText, Settings, LogOut } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router-dom";


const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export default function GovernmentDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [kpi, setKpi] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [addSchemeOpen, setAddSchemeOpen] = useState(false);
  const [removeSchemeOpen, setRemoveSchemeOpen] = useState(false);
  const [newSchemeName, setNewSchemeName] = useState("");
  const [schemeToRemove, setSchemeToRemove] = useState("");

  useEffect(() => {
    loadDemoData();
  }, []);

  const loadDemoData = () => {
    setKpi({
      total_institutions: 12500,
      total_students: 5600000,
      total_teachers: 245000,
      active_schemes: 18,
      dropout_rate: 4.8
    });

    setStats({
      state_performance: [
        { state: "Karnataka", value: 85 },
        { state: "Maharashtra", value: 78 },
        { state: "Tamil Nadu", value: 90 },
        { state: "Kerala", value: 95 }
      ],
      enrollment_trend: [
        { year: 2019, students: 4200000 },
        { year: 2020, students: 4300000 },
        { year: 2021, students: 4500000 },
        { year: 2022, students: 4700000 },
        { year: 2023, students: 4900000 }
      ],
      scheme_utilization: [
        { scheme: "PM Scholarship", utilization: 88 },
        { scheme: "Girl Child Grant", utilization: 76 },
        { scheme: "Rural Digital Program", utilization: 65 }
      ],
      nirf_distribution: [
        { rank: "Top 100", count: 15 },
        { rank: "Rank 101-200", count: 25 },
        { rank: "Rank 201-300", count: 30 }
      ],
      red_flag_institutions: [
        { name: "XYZ College", issue: "Low Attendance", state: "UP" },
        { name: "ABC Institute", issue: "Poor Results", state: "Bihar" },
        { name: "LMN University", issue: "Financial Audit Pending", state: "MP" }
      ]
    });
  };

  const handleAddScheme = () => {
    if (!newSchemeName) return;
    setKpi(prev => ({ ...prev, active_schemes: prev.active_schemes + 1 }));
    alert(`Scheme "${newSchemeName}" added!`);
    setNewSchemeName("");
    setAddSchemeOpen(false);
  };

  const handleRemoveScheme = () => {
    if (!schemeToRemove) return;
    setKpi(prev => ({ ...prev, active_schemes: Math.max(prev.active_schemes - 1, 0) }));
    alert(`Scheme "${schemeToRemove}" removed!`);
    setSchemeToRemove("");
    setRemoveSchemeOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-indigo-600 to-indigo-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-indigo-500 flex justify-between items-center">
          {sidebarOpen && <h2 className="text-xl font-bold">U-EDIP</h2>}
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-indigo-700">
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700">
            <BarChart3 className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700">
            <FileText className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Reports</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700">
            <Users className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Users</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700" onClick={() => navigate('/schemes')}>
            <TrendingUp className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Schemes</span>}
          </Button>
        </nav>

        <div className="p-4 border-t border-indigo-500 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700" onClick={() => navigate('/settings')}>
            <Settings className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-indigo-700" onClick={() => navigate('/')}>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Government Dashboard</h1>
            <p className="text-gray-600">National education data intelligence overview</p>
          </div>

          {/* KPI Cards */}
          {kpi && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-4">
              <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg">
                <Building2 className="w-8 h-8 mb-3 opacity-90" />
                <p className="text-sm opacity-90">Total Institutions</p>
                <p className="text-3xl font-bold mt-1">{kpi.total_institutions.toLocaleString()}</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                <GraduationCap className="w-8 h-8 mb-3 opacity-90" />
                <p className="text-sm opacity-90">Total Students</p>
                <p className="text-3xl font-bold mt-1">{kpi.total_students.toLocaleString()}</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <Users className="w-8 h-8 mb-3 opacity-90" />
                <p className="text-sm opacity-90">Total Teachers</p>
                <p className="text-3xl font-bold mt-1">{kpi.total_teachers.toLocaleString()}</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                <TrendingUp className="w-8 h-8 mb-3 opacity-90" />
                <p className="text-sm opacity-90">Active Schemes</p>
                <p className="text-3xl font-bold mt-1">{kpi.active_schemes}</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
                <AlertTriangle className="w-8 h-8 mb-3 opacity-90" />
                <p className="text-sm opacity-90">Dropout Rate</p>
                <p className="text-3xl font-bold mt-1">{kpi.dropout_rate}%</p>
              </Card>
            </div>
          )}

          {/* Add/Remove Scheme Buttons placed BELOW KPI cards */}
          <div className="flex space-x-4 mb-8">
            <Button onClick={() => setAddSchemeOpen(true)}>Add Scheme</Button>
            <Button onClick={() => setRemoveSchemeOpen(true)}>Remove Scheme</Button>
          </div>

          {/* Stats Charts */}
          {stats && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* State Performance */}
              <Card className="p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">State-wise Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.state_performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Enrollment Trend */}
              <Card className="p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Enrollment Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats.enrollment_trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Scheme Utilization */}
              <Card className="p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Scheme Utilization</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.scheme_utilization} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="scheme" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="utilization" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* NIRF Distribution */}
              <Card className="p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">NIRF Ranking Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.nirf_distribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ rank, count }) => `${rank}: ${count}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stats.nirf_distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {/* Red-Flag Institutions */}
          {stats && (
            <Card className="p-6 shadow-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
                  Red-Flag Institutions Alert
                </h3>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Institution</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Issue</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.red_flag_institutions.map((inst, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{inst.name}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">{inst.issue}</span>
                        </td>
                        <td className="py-3 px-4">{inst.state}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Add Scheme Modal */}
          {addSchemeOpen && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Add New Scheme</h2>
                <input
                  type="text"
                  placeholder="Scheme Name"
                  value={newSchemeName}
                  onChange={(e) => setNewSchemeName(e.target.value)}
                  className="w-full border px-3 py-2 rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="secondary" onClick={() => setAddSchemeOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddScheme}>Add</Button>
                </div>
              </div>
            </div>
          )}

          {/* Remove Scheme Modal */}
          {removeSchemeOpen && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Remove Scheme</h2>
                <select
                  value={schemeToRemove}
                  onChange={(e) => setSchemeToRemove(e.target.value)}
                  className="w-full border px-3 py-2 rounded mb-4"
                >
                  <option value="">Select Scheme</option>
                  {stats.scheme_utilization?.map((s) => (
                    <option key={s.scheme} value={s.scheme}>{s.scheme}</option>
                  ))}
                </select>
                <div className="flex justify-end space-x-2">
                  <Button variant="secondary" onClick={() => setRemoveSchemeOpen(false)}>Cancel</Button>
                  <Button onClick={handleRemoveScheme} disabled={!schemeToRemove}>Remove</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
