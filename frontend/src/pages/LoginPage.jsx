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
  const roleParam = searchParams.get("role");

  const [role, setRole] = useState(roleParam || "government");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState(""); // UI only
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // ROLE → ENDPOINT MAPPING
  // ----------------------------
  const loginEndpoints = {
    government: "/gov/auth/login",
    institution: "/institution/auth/login",
    teacher: "/teacher/auth/login",
    student: "/student/auth/login",
  };

  // ----------------------------
  // ROLE → PAYLOAD MAPPING
  // ----------------------------
  const buildPayload = () => {
    switch (role) {
      case "government":
        return { email: identifier }; // password ignored

      case "institution":
        return { aisheCode: identifier }; // password ignored

      case "teacher":
        return { aparId: identifier }; // password ignored

      case "student":
        return { aadhaar: identifier }; // password ignored

      default:
        return { identifier };
    }
  };

  // ----------------------------
  // HANDLE LOGIN
  // ----------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!identifier) {
      toast.error("Please enter your login details.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API}${loginEndpoints[role]}`,
        buildPayload()
      );

      toast.success("Login successful!");
      setUser(response.data.user);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      navigate(`/${role}`);
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 shadow-2xl border-2 border-indigo-100">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Shield className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">U-EDIP Login</h1>
          <p className="text-gray-600">Select your role to continue</p>
        </div>

        {/* ROLE TABS */}
        <Tabs value={role} onValueChange={setRole} className="w-full mb-4">
          <TabsList className="grid w-full grid-cols-2 mb-3">
            <TabsTrigger value="government">Government</TabsTrigger>
            <TabsTrigger value="institution">Institution</TabsTrigger>
          </TabsList>

          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
            <TabsTrigger value="student">Student</TabsTrigger>
          </TabsList>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6">

            {/* IDENTIFIER FIELD */}
            <TabsContent value="government" className="space-y-4">
              <Label>Government Email</Label>
              <Input
                placeholder="gov@example.in"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </TabsContent>

            <TabsContent value="institution" className="space-y-4">
              <Label>AISHE Code</Label>
              <Input
                placeholder="C-12345"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </TabsContent>

            <TabsContent value="teacher" className="space-y-4">
              <Label>APAR ID</Label>
              <Input
                placeholder="APAR-XXXX"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </TabsContent>

            <TabsContent value="student" className="space-y-4">
              <Label>Aadhaar Number</Label>
              <Input
                placeholder="XXXX-XXXX-XXXX"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </TabsContent>

            {/* PASSWORD FIELD (UI ONLY) */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Login
                </>
              )}
            </Button>

          </form>
        </Tabs>

        {/* BACK BUTTON */}
        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={() => navigate("/")}
            className="text-indigo-600"
          >
            ← Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
