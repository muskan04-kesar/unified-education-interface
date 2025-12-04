import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security</p>
        </div>

        {/* Profile Settings */}
        <Card className="p-6 mb-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" data-testid="input-name" placeholder="Enter your name" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" data-testid="input-email" type="email" placeholder="your.email@example.com" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" data-testid="input-phone" placeholder="+91 XXXXX XXXXX" className="mt-2" />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6 mb-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications on your device</p>
              </div>
              <Switch
                data-testid="switch-notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Alerts</p>
                <p className="text-sm text-gray-600">Get important updates via email</p>
              </div>
              <Switch
                data-testid="switch-email"
                checked={emailAlerts}
                onCheckedChange={setEmailAlerts}
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6 mb-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <Switch
                data-testid="switch-2fa"
                checked={twoFactor}
                onCheckedChange={setTwoFactor}
              />
            </div>
            <div>
              <Label htmlFor="password">Change Password</Label>
              <Input id="password" data-testid="input-password" type="password" placeholder="Enter new password" className="mt-2" />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            data-testid="save-settings-btn"
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 px-8"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}