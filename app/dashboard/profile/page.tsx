"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Eye,
  EyeOff,
  Camera,
  Save,
  Activity,
  Calendar,
  Clock,
  Award,
  Settings,
  Bell,
  Lock,
  Key,
  Monitor,
  Smartphone,
  Globe,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react"

export default function ProfilePage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)

  const [profileData, setProfileData] = useState({
    fullName: "Juan Dela Cruz",
    email: "juan.delacruz@ndrrmc.gov.ph",
    phone: "+63 917 123 4567",
    designation: "Emergency Response Coordinator",
    agency: "National Disaster Risk Reduction and Management Council",
    department: "Operations Division",
    employeeId: "NDRRMC-2024-001",
    location: "Quezon City, Metro Manila",
    bio: "Experienced emergency response coordinator with 8 years in disaster management and climate resilience programs.",
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
  })

  const activityLog = [
    {
      id: 1,
      action: "Issued flood warning alert",
      location: "Marikina River Basin",
      timestamp: "2024-01-31 14:30:25",
      type: "alert",
      icon: AlertTriangle,
    },
    {
      id: 2,
      action: "Updated weather monitoring settings",
      location: "System Settings",
      timestamp: "2024-01-31 13:45:12",
      type: "settings",
      icon: Settings,
    },
    {
      id: 3,
      action: "Generated monthly report",
      location: "Reports Module",
      timestamp: "2024-01-31 12:15:08",
      type: "report",
      icon: FileText,
    },
    {
      id: 4,
      action: "Activated emergency protocol",
      location: "Emergency Response Center",
      timestamp: "2024-01-30 16:22:33",
      type: "protocol",
      icon: Shield,
    },
    {
      id: 5,
      action: "Login from new device",
      location: "Manila Office",
      timestamp: "2024-01-30 09:30:15",
      type: "security",
      icon: Monitor,
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "Emergency Response Expert",
      description: "Successfully coordinated 50+ emergency responses",
      date: "2024-01-15",
      icon: Shield,
      color: "bg-red-50 text-red-700 border-red-200",
    },
    {
      id: 2,
      title: "Data Analysis Specialist",
      description: "Completed advanced weather data analysis training",
      date: "2023-12-20",
      icon: TrendingUp,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: 3,
      title: "System Administrator",
      description: "Certified in ClimaTech AI system administration",
      date: "2023-11-10",
      icon: Settings,
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: 4,
      title: "Community Leader",
      description: "Led disaster preparedness training for 500+ residents",
      date: "2023-10-05",
      icon: Users,
      color: "bg-green-50 text-green-700 border-green-200",
    },
  ]

  const systemStats = [
    { label: "Total Logins", value: "1,247", period: "All time", icon: Monitor, color: "text-blue-600" },
    { label: "Alerts Issued", value: "89", period: "This year", icon: AlertTriangle, color: "text-red-600" },
    { label: "Reports Generated", value: "156", period: "This year", icon: FileText, color: "text-green-600" },
    { label: "System Uptime", value: "99.8%", period: "Last 30 days", icon: CheckCircle, color: "text-emerald-600" },
  ]

  const getActionTypeColor = (type: string) => {
    switch (type) {
      case "alert":
        return "bg-red-50 text-red-700 border border-red-200"
      case "settings":
        return "bg-blue-50 text-blue-700 border border-blue-200"
      case "report":
        return "bg-green-50 text-green-700 border border-green-200"
      case "protocol":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200"
      case "security":
        return "bg-purple-50 text-purple-700 border border-purple-200"
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200"
    }
  }

  const handleProfileUpdate = () => {
    // Handle profile update logic
    console.log("Profile updated:", profileData)
  }

  const handlePasswordChange = () => {
    // Handle password change logic
    console.log("Password change requested")
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-12 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              <Eye className="w-4 h-4 mr-2" />
              Preview Profile
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Profile Overview Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src="/api/placeholder/96/96" alt={profileData.fullName} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-semibold">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 p-0 shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{profileData.fullName}</h2>
                    <p className="text-blue-600 font-medium mb-2">{profileData.designation}</p>
                    <p className="text-gray-600 mb-4">{profileData.agency}</p>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{profileData.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{profileData.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className="bg-green-50 text-green-700 border border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified Account
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-gray-600 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.period}</div>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-50 p-1 rounded-lg">
            <TabsTrigger 
              value="personal" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md"
            >
              Personal Info
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="activity" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md"
            >
              Activity Log
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md"
            >
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900">Personal Information</CardTitle>
                <p className="text-gray-600">Update your personal details and contact information</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Employee ID</label>
                    <Input value={profileData.employeeId} disabled className="border-gray-200 bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Designation</label>
                    <Input
                      value={profileData.designation}
                      onChange={(e) => setProfileData({ ...profileData, designation: e.target.value })}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Department</label>
                    <Input
                      value={profileData.department}
                      onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Agency/Organization</label>
                  <Input
                    value={profileData.agency}
                    onChange={(e) => setProfileData({ ...profileData, agency: e.target.value })}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <Input
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                    placeholder="Tell us about yourself and your role..."
                  />
                </div>
                <Button onClick={handleProfileUpdate} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900">Change Password</CardTitle>
                <p className="text-gray-600">Update your password to keep your account secure</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Current Password</label>
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      placeholder="Confirm new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button onClick={handlePasswordChange} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Change Password
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900">Two-Factor Authentication</CardTitle>
                <p className="text-gray-600">Add an extra layer of security to your account</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Key className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Enable Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <Switch
                    checked={securityData.twoFactorEnabled}
                    onCheckedChange={(checked) => setSecurityData({ ...securityData, twoFactorEnabled: checked })}
                  />
                </div>
                {securityData.twoFactorEnabled && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-medium text-blue-800">Two-factor authentication is enabled</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 bg-white hover:bg-blue-50">
                      Manage 2FA Settings
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900">Login Sessions</CardTitle>
                <p className="text-gray-600">Manage your active login sessions</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Monitor className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Current Session</h4>
                        <p className="text-sm text-gray-600">Manila Office - Chrome on Windows</p>
                        <p className="text-xs text-gray-500">Active now</p>
                      </div>
                    </div>
                    <Badge className="bg-green-50 text-green-700 border border-green-200">Current</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Mobile Session</h4>
                        <p className="text-sm text-gray-600">Mobile App - Android</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-red-200 text-red-700 bg-white hover:bg-red-50">
                      Revoke
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="border-red-200 text-red-700 w-full bg-white hover:bg-red-50">
                  Sign Out All Other Sessions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900">Notification Preferences</CardTitle>
                <p className="text-gray-600">Choose how you want to receive notifications</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive alerts and updates via email</p>
                      </div>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Smartphone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                        <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                      </div>
                    </div>
                    <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Bell className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Push Notifications</h4>
                        <p className="text-sm text-gray-600">Receive notifications in your browser</p>
                      </div>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Notification Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium">Emergency Alerts</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Weather Updates</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">System Maintenance</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">Report Generation</span>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-medium">Training Updates</span>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900">Recent Activity</CardTitle>
                <p className="text-gray-600">Track your recent actions and system interactions</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLog.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <activity.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{activity.action}</h4>
                            <p className="text-sm text-gray-600">{activity.location}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{activity.timestamp}</span>
                            </div>
                          </div>
                          <Badge className={getActionTypeColor(activity.type)}>{activity.type.toUpperCase()}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${achievement.color}`}>
                        <achievement.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>Earned on {new Date(achievement.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
