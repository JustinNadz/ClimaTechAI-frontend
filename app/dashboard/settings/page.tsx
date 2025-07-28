"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Monitor,
  Bell,
  Shield,
  Database,
  Palette,
  Volume2,
  Moon,
  Sun,
  Smartphone,
  Mail,
  MessageSquare,
  Lock,
  Download,
  Upload,
  RefreshCw,
  Save,
  RotateCcw,
  Settings,
  Eye,
  EyeOff,
  Globe,
  Clock,
  Calendar,
  Zap,
  HardDrive,
  Bug,
  TestTube,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  Activity,
  TrendingUp,
  MapPin,
} from "lucide-react"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [highContrast, setHighContrast] = useState(false)
  const [compactMode, setCompactMode] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState([30])
  const [alertVolume, setAlertVolume] = useState([75])
  const [dataRetention, setDataRetention] = useState([90])

  const [displaySettings, setDisplaySettings] = useState({
    theme: "light",
    language: "en",
    timezone: "Asia/Manila",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    density: "comfortable",
  })

  const [alertSettings, setAlertSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    desktopNotifications: true,
    soundAlerts: true,
    vibration: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "agency",
    activityTracking: true,
    dataSharing: false,
    analyticsOptIn: true,
    locationTracking: true,
  })

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    cacheEnabled: true,
    compressionEnabled: true,
    debugMode: false,
    betaFeatures: false,
  })

  const themeOptions = [
    { value: "light", label: "Light Theme", icon: Sun, description: "Clean and bright interface" },
    { value: "dark", label: "Dark Theme", icon: Moon, description: "Easy on the eyes" },
    { value: "auto", label: "System Default", icon: Monitor, description: "Follows your system" },
  ]

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "fil", label: "Filipino" },
    { value: "es", label: "Español" },
  ]

  const timezoneOptions = [
    { value: "Asia/Manila", label: "Philippines (GMT+8)" },
    { value: "UTC", label: "UTC (GMT+0)" },
    { value: "Asia/Tokyo", label: "Japan (GMT+9)" },
  ]

  const handleSaveSettings = () => {
    console.log("Settings saved:", {
      display: displaySettings,
      alerts: alertSettings,
      privacy: privacySettings,
      system: systemSettings,
    })
  }

  const handleResetSettings = () => {
    // Reset to default values
    setDisplaySettings({
      theme: "light",
      language: "en",
      timezone: "Asia/Manila",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h",
      density: "comfortable",
    })
    setAlertSettings({
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
      desktopNotifications: true,
      soundAlerts: true,
      vibration: false,
    })
    setPrivacySettings({
      profileVisibility: "agency",
      activityTracking: true,
      dataSharing: false,
      analyticsOptIn: true,
      locationTracking: true,
    })
    setSystemSettings({
      autoBackup: true,
      cacheEnabled: true,
      compressionEnabled: true,
      debugMode: false,
      betaFeatures: false,
    })
  }

  const handleExportSettings = () => {
    const settings = {
      display: displaySettings,
      alerts: alertSettings,
      privacy: privacySettings,
      system: systemSettings,
    }
    const dataStr = JSON.stringify(settings, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "climatech-settings.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-12 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
            <p className="text-gray-600">Customize your ClimaTech AI experience and preferences</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleResetSettings}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
            <Button
              variant="outline"
              onClick={handleExportSettings}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Settings
            </Button>
            <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="display" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-50 p-1 rounded-lg">
            <TabsTrigger 
              value="display" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md"
            >
              <Monitor className="w-4 h-4 mr-2" />
              Display
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="privacy" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger 
              value="system" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md"
            >
              <Database className="w-4 h-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>

          {/* Display Settings Tab */}
          <TabsContent value="display" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-blue-600" />
                  Appearance & Display
                </CardTitle>
                <p className="text-gray-600">Customize how the interface looks and behaves</p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Theme Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">Theme</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {themeOptions.map((theme) => (
                      <div
                        key={theme.value}
                        className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          displaySettings.theme === theme.value
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300 bg-white"
                        }`}
                        onClick={() => setDisplaySettings({ ...displaySettings, theme: theme.value })}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className={`p-3 rounded-lg ${
                            displaySettings.theme === theme.value ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <theme.icon className={`w-6 h-6 ${
                              displaySettings.theme === theme.value ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-medium text-gray-900">{theme.label}</span>
                            <p className="text-xs text-gray-500 mt-1">{theme.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Language and Regional Settings */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Regional Settings</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Language</label>
                      <Select
                        value={displaySettings.language}
                        onValueChange={(value) => setDisplaySettings({ ...displaySettings, language: value })}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languageOptions.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Timezone</label>
                      <Select
                        value={displaySettings.timezone}
                        onValueChange={(value) => setDisplaySettings({ ...displaySettings, timezone: value })}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timezoneOptions.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Date Format</label>
                      <Select
                        value={displaySettings.dateFormat}
                        onValueChange={(value) => setDisplaySettings({ ...displaySettings, dateFormat: value })}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Time Format</label>
                      <Select
                        value={displaySettings.timeFormat}
                        onValueChange={(value) => setDisplaySettings({ ...displaySettings, timeFormat: value })}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12 Hour</SelectItem>
                          <SelectItem value="24h">24 Hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Accessibility and Performance */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900">Accessibility & Performance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Eye className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">High Contrast Mode</h4>
                          <p className="text-sm text-gray-600">Improve visibility with higher contrast colors</p>
                        </div>
                      </div>
                      <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Zap className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Compact Mode</h4>
                          <p className="text-sm text-gray-600">Reduce spacing for more content on screen</p>
                        </div>
                      </div>
                      <Switch checked={compactMode} onCheckedChange={setCompactMode} />
                    </div>

                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <RefreshCw className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Auto Refresh Interval</h4>
                          <p className="text-sm text-gray-600">How often to refresh data automatically</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Refresh every</span>
                        <span className="text-sm text-blue-600 font-medium">{refreshInterval[0]} seconds</span>
                      </div>
                      <Slider
                        value={refreshInterval}
                        onValueChange={setRefreshInterval}
                        max={300}
                        min={10}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>10s</span>
                        <span>5min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-blue-600" />
                  Alert & Notification Preferences
                </CardTitle>
                <p className="text-gray-600">Choose how you want to receive alerts and notifications</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Email Alerts</h4>
                        <p className="text-sm text-gray-600">Receive emergency alerts via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.emailAlerts}
                      onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, emailAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                        <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.smsAlerts}
                      onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, smsAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Bell className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Push Notifications</h4>
                        <p className="text-sm text-gray-600">Browser notifications for real-time updates</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.pushNotifications}
                      onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, pushNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Monitor className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Desktop Notifications</h4>
                        <p className="text-sm text-gray-600">System notifications on your desktop</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.desktopNotifications}
                      onCheckedChange={(checked) =>
                        setAlertSettings({ ...alertSettings, desktopNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Volume2 className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Sound Alerts</h4>
                        <p className="text-sm text-gray-600">Audio notifications for alerts</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.soundAlerts}
                      onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, soundAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Smartphone className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Vibration</h4>
                        <p className="text-sm text-gray-600">Vibrate on mobile devices</p>
                      </div>
                    </div>
                    <Switch
                      checked={alertSettings.vibration}
                      onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, vibration: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Volume2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Alert Volume</h4>
                      <p className="text-sm text-gray-600">Adjust the volume for sound alerts</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Volume level</span>
                    <span className="text-sm text-blue-600 font-medium">{alertVolume[0]}%</span>
                  </div>
                  <Slider
                    value={alertVolume}
                    onValueChange={setAlertVolume}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Silent</span>
                    <span>Loud</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Privacy & Security Settings
                </CardTitle>
                <p className="text-gray-600">Control your privacy and data sharing preferences</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Profile Visibility</label>
                    <Select
                      value={privacySettings.profileVisibility}
                      onValueChange={(value) => setPrivacySettings({ ...privacySettings, profileVisibility: value })}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Visible to all users</SelectItem>
                        <SelectItem value="agency">Agency Only - Visible to agency members</SelectItem>
                        <SelectItem value="private">Private - Only visible to you</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Activity className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Activity Tracking</h4>
                        <p className="text-sm text-gray-600">Track your system usage for analytics</p>
                      </div>
                    </div>
                    <Switch
                      checked={privacySettings.activityTracking}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, activityTracking: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Globe className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Data Sharing</h4>
                        <p className="text-sm text-gray-600">Share anonymized data for research</p>
                      </div>
                    </div>
                    <Switch
                      checked={privacySettings.dataSharing}
                      onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, dataSharing: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Analytics Opt-in</h4>
                        <p className="text-sm text-gray-600">Help improve the system with usage analytics</p>
                      </div>
                    </div>
                    <Switch
                      checked={privacySettings.analyticsOptIn}
                      onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, analyticsOptIn: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Location Tracking</h4>
                        <p className="text-sm text-gray-600">Use location for relevant alerts and data</p>
                      </div>
                    </div>
                    <Switch
                      checked={privacySettings.locationTracking}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, locationTracking: checked })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Data Management</h3>
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Data Retention Period</h4>
                        <p className="text-sm text-gray-600">How long to keep your data</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Retain data for</span>
                      <span className="text-sm text-blue-600 font-medium">{dataRetention[0]} days</span>
                    </div>
                    <Slider
                      value={dataRetention}
                      onValueChange={setDataRetention}
                      max={365}
                      min={30}
                      step={30}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>30 days</span>
                      <span>1 year</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="border-blue-200 text-blue-700 bg-white hover:bg-blue-50">
                      <Download className="w-4 h-4 mr-2" />
                      Export My Data
                    </Button>
                    <Button variant="outline" className="border-red-200 text-red-700 bg-white hover:bg-red-50">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-blue-600" />
                  System Configuration
                </CardTitle>
                <p className="text-gray-600">Manage system settings and performance options</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <HardDrive className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Automatic Backup</h4>
                        <p className="text-sm text-gray-600">Automatically backup your settings and data</p>
                      </div>
                    </div>
                    <Switch
                      checked={systemSettings.autoBackup}
                      onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, autoBackup: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Zap className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Cache Enabled</h4>
                        <p className="text-sm text-gray-600">Cache data for faster loading times</p>
                      </div>
                    </div>
                    <Switch
                      checked={systemSettings.cacheEnabled}
                      onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, cacheEnabled: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Settings className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Data Compression</h4>
                        <p className="text-sm text-gray-600">Compress data to save bandwidth</p>
                      </div>
                    </div>
                    <Switch
                      checked={systemSettings.compressionEnabled}
                      onCheckedChange={(checked) =>
                        setSystemSettings({ ...systemSettings, compressionEnabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Bug className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Debug Mode</h4>
                        <p className="text-sm text-gray-600">Enable detailed logging for troubleshooting</p>
                      </div>
                    </div>
                    <Switch
                      checked={systemSettings.debugMode}
                      onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, debugMode: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                          <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <TestTube className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Beta Features</h4>
                          <p className="text-sm text-gray-600">Access experimental features (may be unstable)</p>
                        </div>
                      </div>
                    <Switch
                      checked={systemSettings.betaFeatures}
                      onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, betaFeatures: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">System Maintenance</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline" className="border-blue-200 text-blue-700 bg-white hover:bg-blue-50">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear Cache
                    </Button>
                    <Button variant="outline" className="border-blue-200 text-blue-700 bg-white hover:bg-blue-50">
                      <Download className="w-4 h-4 mr-2" />
                      Download Logs
                    </Button>
                    <Button variant="outline" className="border-blue-200 text-blue-700 bg-white hover:bg-blue-50">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Settings
                    </Button>
                    <Button variant="outline" className="border-yellow-200 text-yellow-700 bg-white hover:bg-yellow-50">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset System
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">System Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Version:</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">ClimaTech AI v2.1.0</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Build:</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">2024.01.31</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Environment:</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Production</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Last Update:</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Jan 31, 2024</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">Server Status:</span>
                        </div>
                        <Badge className="bg-green-50 text-green-700 border border-green-200">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">API Status:</span>
                        </div>
                        <Badge className="bg-green-50 text-green-700 border border-green-200">Operational</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
