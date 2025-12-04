import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Mail, Phone, MapPin, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ user }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            data-testid="back-btn"
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="p-8 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="text-4xl bg-indigo-600 text-white">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {user?.name || 'Demo User'}
                  </h1>
                  <p className="text-lg text-indigo-600 font-medium capitalize">
                    {user?.role || 'User'} Account
                  </p>
                </div>
                <Button data-testid="edit-profile-btn" className="bg-indigo-600 hover:bg-indigo-700">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>demo.user@uedip.gov.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Account Details</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex justify-between">
                <span>Account Type:</span>
                <span className="font-medium capitalize">{user?.role || 'Standard'}</span>
              </div>
              <div className="flex justify-between">
                <span>Member Since:</span>
                <span className="font-medium">January 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Security</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Two-Factor Auth:</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Login:</span>
                <span className="text-gray-900 font-medium">Today, 10:30 AM</span>
              </div>
              <Button data-testid="change-password-btn" variant="outline" className="w-full mt-4">
                Change Password
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}