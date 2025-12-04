import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Users, GraduationCap, TrendingUp, Shield, Database, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function LandingPage() {
  const navigate = useNavigate();
  const [kpiData, setKpiData] = useState(null);

  useEffect(() => {
    fetchKPI();
  }, []);

  const fetchKPI = async () => {
    try {
      const response = await axios.get(`${API}/kpi`);
      setKpiData(response.data);
    } catch (error) {
      console.error("Error fetching KPI:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      {/* Header */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">U-EDIP</span>
          </div>
          <Button 
            data-testid="nav-login-btn"
            onClick={() => navigate('/login')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-semibold mb-4">
            Transforming Education Through Data
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            U-EDIP: Unified Education<br/>
            <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              Data Intelligence Platform
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A single national platform to track student lifecycle, teacher performance, institution ranking, and scheme analytics across India.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button 
              data-testid="hero-govt-login-btn"
              onClick={() => navigate('/login?role=government')}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Government Login <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              data-testid="hero-inst-login-btn"
              onClick={() => navigate('/login?role=institution')}
              size="lg"
              variant="outline"
              className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 h-14 text-lg rounded-xl"
            >
              Institution Login
            </Button>
            <Button 
              data-testid="hero-teacher-login-btn"
              onClick={() => navigate('/login?role=teacher')}
              size="lg"
              variant="outline"
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 h-14 text-lg rounded-xl"
            >
              Teacher Login
            </Button>
            <Button 
              data-testid="hero-student-login-btn"
              onClick={() => navigate('/login?role=student')}
              size="lg"
              variant="outline"
              className="border-2 border-gray-600 text-gray-600 hover:bg-gray-50 px-8 h-14 text-lg rounded-xl"
            >
              Student Login
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        {kpiData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <Card data-testid="kpi-institutions" className="p-6 bg-white border-2 border-indigo-100 hover:border-indigo-300 transition-all hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Building2 className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Institutions</p>
                  <p className="text-3xl font-bold text-gray-900">{kpiData.total_institutions.toLocaleString()}</p>
                </div>
              </div>
            </Card>
            <Card data-testid="kpi-students" className="p-6 bg-white border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <GraduationCap className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">{kpiData.total_students.toLocaleString()}</p>
                </div>
              </div>
            </Card>
            <Card data-testid="kpi-teachers" className="p-6 bg-white border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Teachers</p>
                  <p className="text-3xl font-bold text-gray-900">{kpiData.total_teachers.toLocaleString()}</p>
                </div>
              </div>
            </Card>
            <Card data-testid="kpi-schemes" className="p-6 bg-white border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Active Schemes</p>
                  <p className="text-3xl font-bold text-gray-900">{kpiData.active_schemes}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 bg-gradient-to-br from-indigo-50 to-white border-indigo-200 hover:shadow-xl transition-all">
            <Database className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unified Data</h3>
            <p className="text-gray-600">Single source of truth for all education data across institutions, teachers, and students nationwide.</p>
          </Card>
          <Card className="p-8 bg-gradient-to-br from-emerald-50 to-white border-emerald-200 hover:shadow-xl transition-all">
            <TrendingUp className="w-12 h-12 text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Analytics</h3>
            <p className="text-gray-600">Track performance metrics, enrollment trends, and scheme utilization with live dashboards.</p>
          </Card>
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-white border-purple-200 hover:shadow-xl transition-all">
            <Shield className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Access</h3>
            <p className="text-gray-600">Aadhaar-based authentication with role-based access control for data security.</p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600">
          <p>© 2025 U-EDIP - Ministry of Education, Government of India</p>
        </div>
      </footer>
    </div>
  );
}