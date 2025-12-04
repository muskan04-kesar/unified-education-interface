import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  
  const [role, setRole] = useState(roleParam || 'government');
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier) {
      toast.error('Please enter your credentials');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/login`, {
        identifier,
        role
      });

      if (response.data.success) {
        setUser(response.data.user);
        toast.success('Login successful!');
        navigate(`/${role}`);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 shadow-2xl border-2 border-indigo-100">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Shield className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">U-EDIP Login</h1>
          <p className="text-gray-600">Secure access to education data platform</p>
        </div>

        <Tabs value={role} onValueChange={setRole} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger data-testid="tab-government" value="government">Government</TabsTrigger>
            <TabsTrigger data-testid="tab-institution" value="institution">Institution</TabsTrigger>
          </TabsList>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger data-testid="tab-teacher" value="teacher">Teacher</TabsTrigger>
            <TabsTrigger data-testid="tab-student" value="student">Student</TabsTrigger>
          </TabsList>

          <form onSubmit={handleLogin} className="space-y-6">
            <TabsContent value="government" className="space-y-4">
              <div>
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  data-testid="input-aadhaar"
                  placeholder="XXXX-XXXX-XXXX"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="mt-2"
                />
              </div>
            </TabsContent>

            <TabsContent value="institution" className="space-y-4">
              <div>
                <Label htmlFor="aishe">AISHE Code</Label>
                <Input
                  id="aishe"
                  data-testid="input-aishe"
                  placeholder="C-12345"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="mt-2"
                />
              </div>
            </TabsContent>

            <TabsContent value="teacher" className="space-y-4">
              <div>
                <Label htmlFor="apar">APAR ID</Label>
                <Input
                  id="apar"
                  data-testid="input-apar"
                  placeholder="APAR-2024-XXXXX"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="mt-2"
                />
              </div>
            </TabsContent>

            <TabsContent value="student" className="space-y-4">
              <div>
                <Label htmlFor="email">Email or Student ID</Label>
                <Input
                  id="email"
                  data-testid="input-email"
                  placeholder="student@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="mt-2"
                />
              </div>
            </TabsContent>

            <div>
              <Label htmlFor="otp">OTP / Password</Label>
              <Input
                id="otp"
                data-testid="input-otp"
                type="password"
                placeholder="Enter OTP or Password"
                className="mt-2"
              />
            </div>

            <Button
              data-testid="submit-login-btn"
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg"
              disabled={loading}
            >
              {loading ? 'Logging in...' : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Secure Login
                </>
              )}
            </Button>
          </form>
        </Tabs>

        <div className="mt-6 text-center">
          <Button
            data-testid="back-home-btn"
            variant="link"
            onClick={() => navigate('/')}
            className="text-indigo-600"
          >
            ← Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}