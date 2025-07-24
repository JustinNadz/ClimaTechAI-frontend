"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Activity,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  UserPlus,
  Download,
  Upload,
  RefreshCw,
  Server,
  HardDrive,
} from "lucide-react"

export default function AdminPage() {
  const [selectedUser, setSelectedUser] = useState("")
  const [systemMaintenance, setSystemMaintenance] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)

  const users = [
    {
      id: "USR-001",
      name: "Juan Dela Cruz",
      email: "juan.delacruz@ndrrmc.gov.ph",
      role: "Emergency Coordinator",
      agency: "NDRRMC",
      status: "active",
      lastLogin: "2024-01-31 14:30:25",
      permissions: ["view_data", "create_alerts", "manage_protocols"],
    },
    {
      id: "USR-002",
      name: "Maria Santos",
      email: "maria.santos@pagasa.dost.gov.ph",
      role: "Weather Analyst",
      agency: "PAGASA",
      status: "active",
      lastLogin: "2024-01-31 13:45:12",
      permissions: ["view_data", "update_weather"],
    },
    {
      id: "USR-003",
      name: "Roberto Garcia",
      email: "roberto.garcia@phivolcs.dost.gov.ph",
      role: "Seismic Specialist",
      agency: "PHIVOLCS",
      status: "inactive",
      lastLogin: "2024-01-29 09:15:33",
      permissions: ["view_data", "update_seismic"],
    },
    {
      id: "USR-004",
      name: "Ana Reyes",
      email: "ana.reyes@manila.gov.ph",
      role: "LGU Coordinator",
      agency: "Manila LGU",
      status: "active",
      lastLogin: "2024-01-31 11:22:18",
      permissions: ["view_data", "local_alerts"],
    },
  ]

  const systemStats = [
    { label: "Total Users", value: "247", change: "+12", icon: Users },
    { label: "Active Sessions", value: "89", change: "+5", icon: Activity },
    { label: "System Uptime", value: "99.8%", change: "+0.1%", icon: Server },
    { label: "Data Storage", value: "2.4 TB", change: "+150 GB", icon: HardDrive },
  ]

  const systemHealth = [
    { component: "Weather API", status: "operational", uptime: "99.9%", response: "120ms" },
    { component: "Seismic Monitoring", status: "operational", uptime: "99.7%", response: "85ms" },
    { component: "Power Grid API", status: "maintenance", uptime: "98.5%", response: "200ms" },
    { component: "Emergency Alerts", status: "operational", uptime: "100%", response: "50ms" },
    { component: "AI Prediction Engine", status: "operational", uptime: "99.2%", response: "300ms" },
  ]

  const auditLogs = [
    {
      id: "AUD-001",
      timestamp: "2024-01-31 14:30:25",
      user: "Admin User",
      action: "User Created",
      details: "Created new user account for Maria Santos (PAGASA)",
      severity: "info",
    },
    {
      id: "AUD-002",
      timestamp: "2024-01-31 13:45:12",
      user: "Juan Dela Cruz",
      action: "Alert Issued",
      details: "Flood warning alert issued for Marikina River Basin",
      severity: "warning",
    },
    {
      id: "AUD-003",
      timestamp: "2024-01-31 12:15:08",
      user: "System",
      action: "Backup Completed",
      details: "Automated daily backup completed successfully",
      severity: "info",
    },
    {
      id: "AUD-004",
      timestamp: "2024-01-31 11:30:45",
      user: "Roberto Garcia",
      action: "Data Export",
      details: "Exported seismic data for January 2024",
      severity: "info",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "operational":
        return "bg-green-100 text-green-800"
      case "inactive":
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "info":
        return "bg-blue-100 text-blue-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 w-full px-8 lg:px-16">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-1">System administration and user management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch checked={systemMaintenance} onCheckedChange={setSystemMaintenance} id="maintenance" />
              <label htmlFor="maintenance" className="text-sm font-medium text-red-600">
                Maintenance Mode
              </label>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-yellow-400 text-white hover:from-blue-600 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-md">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh System
            </Button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change} from last week</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-50">
            <TabsTrigger value="users" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              User Management
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              System Health
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              System Settings
            </TabsTrigger>
            <TabsTrigger value="audit" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              Audit Logs
            </TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-3">
                <Input placeholder="Search users..." className="border-gray-200" />
                <Select>
                  <SelectTrigger className="w-[180px] border-gray-200">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="coordinator">Emergency Coordinator</SelectItem>
                    <SelectItem value="analyst">Weather Analyst</SelectItem>
                    <SelectItem value="specialist">Seismic Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all transform hover:scale-105 shadow-md">
                <UserPlus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {users.map((user) => (
                <Card key={user.id} className="border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col bg-white overflow-hidden">
                  <div className="p-6 flex flex-col h-full">
                    {/* Icon and Name Section */}
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Users className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      </div>
                    </div>
                    
                    {/* Email */}
                    <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                    
                    {/* Role and Agency */}
                    <p className="text-sm text-gray-700 mb-1">{user.role} - {user.agency}</p>
                    
                    {/* Last Login */}
                    <p className="text-xs text-gray-500 mb-3">Last login: {user.lastLogin}</p>
                    
                    {/* Permissions */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {user.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="border-gray-200 text-gray-700 text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Status Badge */}
                    <Badge className={`${getStatusColor(user.status)} mb-6 w-fit`}>{user.status.toUpperCase()}</Badge>
                    
                    {/* Action Buttons */}
                    <div className="mt-auto flex justify-between">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50 w-10 h-10 p-0 flex items-center justify-center">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50 w-10 h-10 p-0 flex items-center justify-center">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50 w-10 h-10 p-0 flex items-center justify-center">
                          {user.status === "active" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </Button>
                      </div>
                      <Button size="sm" variant="outline" className="border-red-200 text-red-700 bg-transparent hover:bg-red-50 w-10 h-10 p-0 flex items-center justify-center">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* System Health Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid gap-6">
              {systemHealth.map((component, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <Server className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{component.component}</h3>
                          <p className="text-sm text-gray-600">System component monitoring</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{component.uptime}</div>
                          <div className="text-xs text-gray-600">Uptime</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{component.response}</div>
                          <div className="text-xs text-gray-600">Response Time</div>
                        </div>
                        <Badge className={getStatusColor(component.status)}>{component.status.toUpperCase()}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-gray-900">Backup Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Automatic Backup</label>
                    <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Backup Frequency</label>
                    <Select>
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 transition-all transform hover:scale-105 shadow-md flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Create Backup
                    </Button>
                    <Button variant="outline" className="border-gray-200 text-gray-700 flex-1 bg-transparent hover:bg-gray-50">
                      <Upload className="w-4 h-4 mr-2" />
                      Restore
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-gray-900">Alert Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Alert Level</label>
                    <Select>
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Alert Timeout (minutes)</label>
                    <Input type="number" defaultValue="30" className="border-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Emergency Contact</label>
                    <Input defaultValue="911" className="border-gray-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-gray-900">API Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">PAGASA API Endpoint</label>
                    <Input defaultValue="https://api.pagasa.dost.gov.ph" className="border-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">PHIVOLCS API Endpoint</label>
                    <Input defaultValue="https://api.phivolcs.dost.gov.ph" className="border-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Rate Limit (requests/hour)</label>
                    <Input type="number" defaultValue="1000" className="border-gray-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-gray-900">Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Session Timeout (hours)</label>
                    <Input type="number" defaultValue="8" className="border-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password Policy</label>
                    <Select>
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8 characters)</SelectItem>
                        <SelectItem value="medium">Medium (12 characters + symbols)</SelectItem>
                        <SelectItem value="strong">Strong (16 characters + complexity)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Two-Factor Authentication</label>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-3">
                <Input placeholder="Search logs..." className="border-gray-200" />
                <Select>
                  <SelectTrigger className="w-[180px] border-gray-200">
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <div className="space-y-3">
              {auditLogs.map((log) => (
                <Card key={log.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Activity className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{log.action}</h4>
                            <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>User: {log.user}</span>
                              <span>Time: {log.timestamp}</span>
                            </div>
                          </div>
                          <Badge className={getSeverityColor(log.severity)}>{log.severity.toUpperCase()}</Badge>
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
