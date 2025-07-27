"use client"

import { useState, useEffect } from "react"
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
  Cloud,
  Bell,
  Shield,
  Database,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Info,
  BarChart2,
  FileText,
  Clock,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function AdminPage() {
  const initialUsers = [
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
  type User = typeof initialUsers[number];
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLockModal, setShowLockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [systemMaintenance, setSystemMaintenance] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);

  // Add User form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    agency: '',
    status: 'active',
    lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 19),
    permissions: [] as string[],
  });
  const [addUserError, setAddUserError] = useState('');

  // Add User handler
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.role.trim() || !newUser.agency.trim()) {
      setAddUserError('Please fill in all fields.');
      return;
    }
    setAddUserError('');
    setUsers([
      {
        ...newUser,
        id: `USR-${(users.length + 1).toString().padStart(3, '0')}`,
        lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 19),
      },
      ...users,
    ]);
    setShowAddUserModal(false);
    setNewUser({ name: '', email: '', role: '', agency: '', status: 'active', lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 19), permissions: [] });
  };

  // Delete User handler
  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  const handleRefreshSystem = () => {
    setRefreshing(true);
    setRefreshSuccess(false);
    setTimeout(() => {
      setRefreshing(false);
      setRefreshSuccess(true);
      setTimeout(() => setRefreshSuccess(false), 2000);
    }, 1500);
  };

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

  // Backup history and last backup state
  const [backupHistory, setBackupHistory] = useState([
    { id: 1, date: '2024-06-01 14:22', size: '120MB' },
    { id: 2, date: '2024-05-25 09:10', size: '115MB' },
    { id: 3, date: '2024-05-18 16:45', size: '110MB' },
  ]);
  const lastBackup = backupHistory[0]?.date;
  // API usage and test connection state
  const [apiUsage, setApiUsage] = useState({ used: 432, limit: 1000 });
  const [apiTestStatus, setApiTestStatus] = useState<'idle'|'testing'|'success'|'error'>('idle');
  // Password strength meter state
  const [newPassword, setNewPassword] = useState('');
  const getPasswordStrength = (pw: string) => {
    if (pw.length < 8) return { label: 'Weak', color: 'bg-red-400' };
    if (pw.match(/[A-Z]/) && pw.match(/[0-9]/) && pw.match(/[^A-Za-z0-9]/) && pw.length >= 12) return { label: 'Strong', color: 'bg-green-500' };
    if (pw.length >= 10) return { label: 'Medium', color: 'bg-yellow-400' };
    return { label: 'Weak', color: 'bg-red-400' };
  };
  // Collapsible cards state
  const [collapse, setCollapse] = useState({
    backup: false,
    alert: false,
    api: false,
    security: false,
  });
  // Backup saving state
  const [backupSaving, setBackupSaving] = useState(false);
  const [backupSaved, setBackupSaved] = useState(false);
  // Alert saving state
  const [alertSaving, setAlertSaving] = useState(false);
  const [alertSaved, setAlertSaved] = useState(false);
  // API saving state
  const [apiSaving, setApiSaving] = useState(false);
  const [apiSaved, setApiSaved] = useState(false);
  // Security saving state
  const [securitySaving, setSecuritySaving] = useState(false);
  const [securitySaved, setSecuritySaved] = useState(false);
  const [showBackupConfirm, setShowBackupConfirm] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  const [restoreId, setRestoreId] = useState<number|null>(null);
  const [downloadId, setDownloadId] = useState<number|null>(null);
  const handleDownload = (id: number) => {
    setDownloadId(id);
    setTimeout(() => {
      setDownloadId(null);
      alert('Backup downloaded!');
    }, 1000);
  };
  const handleRestore = (id: number) => {
    setRestoreId(id);
  };
  const confirmRestore = () => {
    setTimeout(() => {
      alert('Backup restored!');
      setRestoreId(null);
    }, 1000);
  };
  const [exportingLogs, setExportingLogs] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const handleExportLogs = () => {
    setExportingLogs(true);
    // Simulate CSV export
    const csvRows = [
      'ID,Timestamp,User,Action,Details,Severity',
      ...auditLogs.map(log =>
        [log.id, log.timestamp, log.user, log.action, log.details, log.severity].map(field => '"' + String(field).replace(/"/g, '""') + '"').join(',')
      )
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-logs.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      setExportingLogs(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2000);
      URL.revokeObjectURL(url);
      a.remove();
    }, 1000);
  };

  const [editUser, setEditUser] = useState({ name: '', email: '', role: '', agency: '' });
  const [editUserError, setEditUserError] = useState('');
  const [editUserSuccess, setEditUserSuccess] = useState(false);
  useEffect(() => {
    if (showEditModal && selectedUser) {
      setEditUser({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        agency: selectedUser.agency,
      });
      setEditUserError('');
      setEditUserSuccess(false);
    }
  }, [showEditModal, selectedUser]);
  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser.name.trim() || !editUser.email.trim() || !editUser.role.trim() || !editUser.agency.trim()) {
      setEditUserError('Please fill in all fields.');
      return;
    }
    setUsers(users.map(u => u.id === selectedUser?.id ? { ...u, ...editUser } : u));
    setEditUserSuccess(true);
    setTimeout(() => {
      setShowEditModal(false);
      setEditUserSuccess(false);
    }, 1200);
  };

  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [lastHealthUpdate, setLastHealthUpdate] = useState<string>(new Date().toLocaleTimeString());
  const [healthRefreshing, setHealthRefreshing] = useState(false);

  const handleHealthRefresh = () => {
    setHealthRefreshing(true);
    setTimeout(() => {
      setLastHealthUpdate(new Date().toLocaleTimeString());
      setHealthRefreshing(false);
    }, 1500);
  };

  const [expandedLogIndex, setExpandedLogIndex] = useState<number | null>(null);
  const [lastLogsUpdate, setLastLogsUpdate] = useState<string>(new Date().toLocaleTimeString());
  const [logsRefreshing, setLogsRefreshing] = useState(false);

  const handleLogsRefresh = () => {
    setLogsRefreshing(true);
    setTimeout(() => {
      setLastLogsUpdate(new Date().toLocaleTimeString());
      setLogsRefreshing(false);
    }, 1500);
  };

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
            <Button className="bg-gradient-to-r from-blue-500 to-yellow-400 text-white hover:from-blue-600 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-md" onClick={handleRefreshSystem} disabled={refreshing}>
              {refreshing ? (
                <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path></svg>
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Refresh System
            </Button>
            {refreshSuccess && (
              <div className="text-green-600 text-sm font-semibold mt-2 flex items-center gap-2"><svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> System refreshed!</div>
            )}
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
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[180px] border-gray-200">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Emergency Coordinator">Emergency Coordinator</SelectItem>
                    <SelectItem value="Weather Analyst">Weather Analyst</SelectItem>
                    <SelectItem value="Seismic Specialist">Seismic Specialist</SelectItem>
                    <SelectItem value="LGU Coordinator">LGU Coordinator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all transform hover:scale-105 shadow-md" onClick={() => setShowAddUserModal(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {users.filter(user => selectedRole === 'all' || user.role === selectedRole).map((user) => (
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
                        <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50 w-10 h-10 p-0 flex items-center justify-center" onClick={() => { setSelectedUser(user); setShowViewModal(true); }}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50 w-10 h-10 p-0 flex items-center justify-center" onClick={() => { setSelectedUser(user); setShowEditModal(true); }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50 w-10 h-10 p-0 flex items-center justify-center" onClick={() => { setSelectedUser(user); setShowLockModal(true); }}>
                          {user.status === "active" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </Button>
                      </div>
                      <Button size="sm" variant="outline" className="border-red-200 text-red-700 bg-transparent hover:bg-red-50 w-10 h-10 p-0 flex items-center justify-center" onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }}>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">System Health Overview</h2>
                <p className="text-gray-600 mt-1 text-sm">
                  {systemHealth.filter(s => s.status === "operational").length}/{systemHealth.length} Operational
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">Last updated: {lastHealthUpdate}</span>
                <Button
                  onClick={handleHealthRefresh}
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 transition-all transform hover:scale-105 shadow-md"
                  aria-label="Refresh system health"
                  disabled={healthRefreshing}
                >
                  <RefreshCw className={`w-4 h-4 mr-1 ${healthRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>
            <div className="grid gap-6">
              {systemHealth.map((component, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <Card key={index} className={`border-l-4 ${component.status === "operational" ? "border-green-400" : component.status === "maintenance" ? "border-yellow-400" : "border-red-400"} bg-white/90 hover:shadow-lg transition-shadow w-full`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex items-center gap-4">
                          {/* Animated status dot */}
                          <span className={`w-3 h-3 rounded-full ${component.status === "operational" ? "bg-green-400 animate-pulse" : component.status === "maintenance" ? "bg-yellow-400 animate-pulse" : "bg-red-400 animate-pulse"}`} aria-label={`${component.status} status`}></span>
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Server className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 flex items-center">
                              {component.component}
                              <TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="w-4 h-4 ml-2 text-gray-400 cursor-pointer" aria-label="More info" /></TooltipTrigger><TooltipContent>System component monitoring</TooltipContent></Tooltip></TooltipProvider>
                            </h3>
                            <p className="text-sm text-gray-600">System component monitoring</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <TooltipProvider><Tooltip><TooltipTrigger asChild>
                            <div className="text-center cursor-help">
                              <div className="text-lg font-bold text-gray-900">{component.uptime}</div>
                              <div className="text-xs text-gray-600">Uptime</div>
                            </div>
                          </TooltipTrigger><TooltipContent>Uptime over the last 30 days</TooltipContent></Tooltip></TooltipProvider>
                          <TooltipProvider><Tooltip><TooltipTrigger asChild>
                            <div className="text-center cursor-help">
                              <div className="text-lg font-bold text-gray-900">{component.response}</div>
                              <div className="text-xs text-gray-600">Response Time</div>
                            </div>
                          </TooltipTrigger><TooltipContent>Average response time</TooltipContent></Tooltip></TooltipProvider>
                          <TooltipProvider><Tooltip><TooltipTrigger asChild>
                            <Badge className={getStatusColor(component.status)} aria-label={`Status: ${component.status}`}>{component.status.toUpperCase()}</Badge>
                          </TooltipTrigger><TooltipContent>
                            {component.status === "operational" ? "All systems normal" : component.status === "maintenance" ? "Scheduled maintenance" : "Service down"}
                          </TooltipContent></Tooltip></TooltipProvider>
                          <button
                            className="ml-2 p-1 rounded hover:bg-gray-100 transition-colors"
                            aria-label={isExpanded ? "Collapse details" : "Expand for more details"}
                            onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      {/* Expandable details */}
                      {isExpanded && (
                        <div className="mt-6 border-t pt-4 space-y-3 animate-fadeIn">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <BarChart2 className="w-4 h-4 text-blue-400" />
                            <span>Uptime/Response Trend (7d):</span>
                            <span className="italic text-gray-400">[Sparkline Placeholder]</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Info className="w-4 h-4 text-gray-400" />
                            <span>Last incident: <span className="font-semibold">2 days ago</span></span>
                          </div>
                          <div className="text-xs text-gray-500">Incident History: <span className="italic">No major incidents in the last 30 days.</span></div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => setCollapse(c => ({ ...c, backup: !c.backup }))}>
                  <Cloud className="w-6 h-6 text-blue-400" />
                  <CardTitle className="text-gray-900 flex-1">Backup Settings</CardTitle>
                  {collapse.backup ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardHeader>
                {!collapse.backup && (
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-500 mb-2">Manage your system backups. You can create, restore, and view backup history.</div>
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
                      <Button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 transition-all transform hover:scale-105 shadow-md flex-1" onClick={() => setShowBackupConfirm(true)}>
                        <Download className="w-4 h-4 mr-2" />
                        Create Backup
                      </Button>
                      <Button variant="outline" className="border-gray-200 text-gray-700 flex-1 bg-transparent hover:bg-gray-50" onClick={() => setShowRestoreConfirm(true)}>
                        <Upload className="w-4 h-4 mr-2" />
                        Restore
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500">Last backup: <span className="font-semibold text-gray-700">{lastBackup || 'Never'}</span></div>
                    <div className="mt-2">
                      <div className="font-semibold text-sm mb-1">Backup History</div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-xs border rounded">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-2 py-1 text-left">Date</th>
                              <th className="px-2 py-1 text-left">Size</th>
                              <th className="px-2 py-1 text-left">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {backupHistory.map(b => (
                              <tr key={b.id} className="border-t">
                                <td className="px-2 py-1">{b.date}</td>
                                <td className="px-2 py-1">{b.size}</td>
                                <td className="px-2 py-1">
                                  <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 px-2 py-0.5 mr-1" onClick={() => handleDownload(b.id)} disabled={downloadId === b.id}>
                                    {downloadId === b.id ? 'Downloading...' : 'Download'}
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-green-600 border-green-200 px-2 py-0.5" onClick={() => handleRestore(b.id)}>
                                    Restore
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <Button className="w-full mt-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white" onClick={() => { setBackupSaving(true); setTimeout(() => { setBackupSaving(false); setBackupSaved(true); setTimeout(() => setBackupSaved(false), 2000); }, 1200); }} disabled={backupSaving}>
                      {backupSaving ? 'Saving...' : 'Save Backup Settings'}
                    </Button>
                    {backupSaved && <div className="text-green-600 text-sm font-semibold flex items-center gap-2 mt-1"><CheckCircle className="w-4 h-4" /> Settings saved!</div>}
                  </CardContent>
                )}
              </Card>

              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => setCollapse(c => ({ ...c, alert: !c.alert }))}>
                  <Bell className="w-6 h-6 text-yellow-400" />
                  <CardTitle className="text-gray-900 flex-1">Alert Settings</CardTitle>
                  {collapse.alert ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardHeader>
                {!collapse.alert && (
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-500 mb-2">Configure how alerts are sent and who receives them.</div>
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
                    <Button className="w-full mt-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white" onClick={() => { setAlertSaving(true); setTimeout(() => { setAlertSaving(false); setAlertSaved(true); setTimeout(() => setAlertSaved(false), 2000); }, 1200); }} disabled={alertSaving}>
                      {alertSaving ? 'Saving...' : 'Save Alert Settings'}
                    </Button>
                    {alertSaved && <div className="text-green-600 text-sm font-semibold flex items-center gap-2 mt-1"><CheckCircle className="w-4 h-4" /> Settings saved!</div>}
                  </CardContent>
                )}
              </Card>

              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => setCollapse(c => ({ ...c, api: !c.api }))}>
                  <Database className="w-6 h-6 text-purple-400" />
                  <CardTitle className="text-gray-900 flex-1">API Configuration</CardTitle>
                  {collapse.api ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardHeader>
                {!collapse.api && (
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-500 mb-2">Manage API endpoints and monitor usage.</div>
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
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500">API Usage</div>
                        <div className="font-semibold text-gray-800">{apiUsage.used} / {apiUsage.limit} requests this hour</div>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-teal-400 text-white" onClick={() => { setApiTestStatus('testing'); setTimeout(() => setApiTestStatus(Math.random() > 0.2 ? 'success' : 'error'), 1200); }}>
                        {apiTestStatus === 'testing' ? <RefreshCw className="animate-spin w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />} Test Connection
                      </Button>
                      {apiTestStatus === 'success' && <span className="text-green-600 text-xs font-semibold flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Success</span>}
                      {apiTestStatus === 'error' && <span className="text-red-600 text-xs font-semibold flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> Error</span>}
                    </div>
                    <Button className="w-full mt-2 bg-gradient-to-r from-purple-500 to-indigo-400 text-white" onClick={() => { setApiSaving(true); setTimeout(() => { setApiSaving(false); setApiSaved(true); setTimeout(() => setApiSaved(false), 2000); }, 1200); }} disabled={apiSaving}>
                      {apiSaving ? 'Saving...' : 'Save API Settings'}
                    </Button>
                    {apiSaved && <div className="text-green-600 text-sm font-semibold flex items-center gap-2 mt-1"><CheckCircle className="w-4 h-4" /> Settings saved!</div>}
                  </CardContent>
                )}
              </Card>

              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => setCollapse(c => ({ ...c, security: !c.security }))}>
                  <Shield className="w-6 h-6 text-red-400" />
                  <CardTitle className="text-gray-900 flex-1">Security Settings</CardTitle>
                  {collapse.security ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardHeader>
                {!collapse.security && (
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-500 mb-2">Manage password policy, session timeout, and two-factor authentication.</div>
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
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Set New Password</label>
                      <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="border-gray-200" placeholder="Enter new password" />
                      {newPassword && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`h-2 w-24 rounded ${getPasswordStrength(newPassword).color}`}></div>
                          <span className={`text-xs font-semibold ${getPasswordStrength(newPassword).color.replace('bg-', 'text-')}`}>{getPasswordStrength(newPassword).label}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Two-Factor Authentication</label>
                      <Switch />
                    </div>
                    <Button className="w-full mt-2 bg-gradient-to-r from-red-500 to-pink-400 text-white" onClick={() => { setSecuritySaving(true); setTimeout(() => { setSecuritySaving(false); setSecuritySaved(true); setTimeout(() => setSecuritySaved(false), 2000); }, 1200); }} disabled={securitySaving}>
                      {securitySaving ? 'Saving...' : 'Save Security Settings'}
                    </Button>
                    {securitySaved && <div className="text-green-600 text-sm font-semibold flex items-center gap-2 mt-1"><CheckCircle className="w-4 h-4" /> Settings saved!</div>}
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
                <p className="text-gray-600 mt-1 text-sm">
                  Showing {auditLogs.filter(log => selectedSeverity === 'all' || log.severity === selectedSeverity).length} of {auditLogs.length} logs
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">Last updated: {lastLogsUpdate}</span>
                <Button
                  onClick={handleLogsRefresh}
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 transition-all transform hover:scale-105 shadow-md"
                  aria-label="Refresh audit logs"
                  disabled={logsRefreshing}
                >
                  <RefreshCw className={`w-4 h-4 mr-1 ${logsRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50" onClick={handleExportLogs} disabled={exportingLogs} aria-label="Export logs">
                  <Download className="w-4 h-4 mr-2" />
                  {exportingLogs ? 'Exporting...' : 'Export Logs'}
                </Button>
              </div>
            </div>
            <div className="flex gap-3">
              <Input placeholder="Search logs..." className="border-gray-200" />
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
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
            <div className="space-y-3">
              {auditLogs.filter(log => selectedSeverity === 'all' || log.severity === selectedSeverity).map((log, idx) => {
                const isExpanded = expandedLogIndex === idx;
                return (
                  <Card key={log.id} className={`border-l-4 ${log.severity === "info" ? "border-blue-400" : log.severity === "warning" ? "border-yellow-400" : "border-red-400"} bg-white/90 hover:shadow-lg transition-shadow w-full`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Animated severity dot */}
                        <span className={`w-3 h-3 rounded-full mt-1 ${log.severity === "info" ? "bg-blue-400 animate-pulse" : log.severity === "warning" ? "bg-yellow-400 animate-pulse" : "bg-red-400 animate-pulse"}`} aria-label={`${log.severity} severity`}></span>
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Activity className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h4 className="font-medium text-gray-900 flex items-center">
                                {log.action}
                                <TooltipProvider><Tooltip><TooltipTrigger asChild><Info className="w-4 h-4 ml-2 text-gray-400 cursor-pointer" aria-label="More info" /></TooltipTrigger><TooltipContent>Audit log entry</TooltipContent></Tooltip></TooltipProvider>
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <span>User: {log.user}</span>
                                <TooltipProvider><Tooltip><TooltipTrigger asChild>
                                  <span className="flex items-center cursor-help"><Clock className="w-3 h-3 mr-1" />{log.timestamp}</span>
                                </TooltipTrigger><TooltipContent>Timestamp of this log entry</TooltipContent></Tooltip></TooltipProvider>
                              </div>
                            </div>
                            <TooltipProvider><Tooltip><TooltipTrigger asChild>
                              <Badge className={getSeverityColor(log.severity)} aria-label={`Severity: ${log.severity}`}>{log.severity.toUpperCase()}</Badge>
                            </TooltipTrigger><TooltipContent>
                              {log.severity === "info" ? "Informational log" : log.severity === "warning" ? "Warning log" : "Error log"}
                            </TooltipContent></Tooltip></TooltipProvider>
                            <button
                              className="ml-2 p-1 rounded hover:bg-gray-100 transition-colors"
                              aria-label={isExpanded ? "Collapse details" : "Expand for more details"}
                              onClick={() => setExpandedLogIndex(isExpanded ? null : idx)}
                            >
                              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                          </div>
                          {/* Expandable details */}
                          {isExpanded && (
                            <div className="mt-4 border-t pt-3 space-y-2 animate-fadeIn">
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <FileText className="w-4 h-4 text-blue-400" />
                                <span>Raw log data:</span>
                                <span className="italic text-gray-400">[JSON Placeholder]</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <BarChart2 className="w-4 h-4 text-blue-400" />
                                <span>Related actions:</span>
                                <span className="italic text-gray-400">[Related actions placeholder]</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowAddUserModal(false)} aria-label="Close add user modal">×</button>
            <h2 className="text-lg font-bold mb-2">Add New User</h2>
            <form onSubmit={handleAddUser} className="space-y-3">
              <input className="w-full border p-2 rounded" placeholder="Full Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
              <input className="w-full border p-2 rounded" placeholder="Email" type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
              <input className="w-full border p-2 rounded" placeholder="Role" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} />
              <input className="w-full border p-2 rounded" placeholder="Agency" value={newUser.agency} onChange={e => setNewUser({ ...newUser, agency: e.target.value })} />
              {addUserError && <div className="text-red-600 text-sm">{addUserError}</div>}
              <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white mt-2">Add User</Button>
            </form>
          </div>
        </div>
      )}
      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowViewModal(false)} aria-label="Close view user modal">×</button>
            <h2 className="text-lg font-bold mb-2">User Details</h2>
            <div className="mb-2 text-gray-900 font-semibold">{selectedUser.name}</div>
            <div className="mb-1 text-sm text-gray-600">Email: {selectedUser.email}</div>
            <div className="mb-1 text-sm text-gray-600">Role: {selectedUser.role}</div>
            <div className="mb-1 text-sm text-gray-600">Agency: {selectedUser.agency}</div>
            <div className="mb-1 text-sm text-gray-600">Status: {selectedUser.status}</div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white mt-2" onClick={() => setShowViewModal(false)}>Close</Button>
          </div>
        </div>
      )}
      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowEditModal(false)} aria-label="Close edit user modal">×</button>
            <h2 className="text-lg font-bold mb-2">Edit User</h2>
            <form onSubmit={handleEditUser} className="space-y-3">
              <input className="w-full border p-2 rounded" placeholder="Full Name" value={editUser.name} onChange={e => setEditUser({ ...editUser, name: e.target.value })} />
              <input className="w-full border p-2 rounded" placeholder="Email" type="email" value={editUser.email} onChange={e => setEditUser({ ...editUser, email: e.target.value })} />
              <input className="w-full border p-2 rounded" placeholder="Role" value={editUser.role} onChange={e => setEditUser({ ...editUser, role: e.target.value })} />
              <input className="w-full border p-2 rounded" placeholder="Agency" value={editUser.agency} onChange={e => setEditUser({ ...editUser, agency: e.target.value })} />
              {editUserError && <div className="text-red-600 text-sm">{editUserError}</div>}
              {editUserSuccess && <div className="text-green-600 text-sm">User updated successfully!</div>}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white mt-2">Save Changes</Button>
            </form>
          </div>
        </div>
      )}
      {/* Lock/Unlock User Modal */}
      {showLockModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowLockModal(false)} aria-label="Close lock user modal">×</button>
            <h2 className="text-lg font-bold mb-2">{selectedUser.status === 'active' ? 'Lock' : 'Unlock'} User</h2>
            <div className="mb-4 text-gray-700">Are you sure you want to {selectedUser.status === 'active' ? 'lock' : 'unlock'} {selectedUser.name}?</div>
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white mt-2" onClick={() => setShowLockModal(false)}>Confirm</Button>
          </div>
        </div>
      )}
      {/* Delete User Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowDeleteModal(false)} aria-label="Close delete user modal">×</button>
            <h2 className="text-lg font-bold mb-2">Delete User</h2>
            <div className="mb-4 text-gray-700">Are you sure you want to delete {selectedUser.name}?</div>
            <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white mt-2" onClick={handleDeleteUser}>Delete</Button>
          </div>
        </div>
      )}
      {restoreId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setRestoreId(null)} aria-label="Close restore confirm">×</button>
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2"><Upload className="w-5 h-5 text-green-500" /> Confirm Restore</h2>
            <div className="mb-4 text-gray-700">Are you sure you want to restore backup from {backupHistory.find(b => b.id === restoreId)?.date}? This will overwrite current data.</div>
            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white mt-2" onClick={confirmRestore}>Confirm</Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
