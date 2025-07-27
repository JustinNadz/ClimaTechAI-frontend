"use client"

import React, { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Clock,
  Users,
  Activity,
  Filter,
  Search,
} from "lucide-react"

// Move recentReports definition to the very top, before any useState or function calls
const recentReports = [
  {
    id: "RPT-2024-001",
    title: "Monthly Disaster Response Summary - January 2024",
    type: "summary",
    date: "2024-01-31",
    size: "2.4 MB",
    format: "PDF",
    status: "completed",
    downloads: 45,
    downloadUrl: "/downloads/report-1.pdf"
  },
  {
    id: "RPT-2024-002", 
    title: "Flood Risk Assessment - Metro Manila",
    type: "assessment",
    date: "2024-01-28",
    size: "5.1 MB",
    format: "PDF",
    status: "completed",
    downloads: 78,
    downloadUrl: "/downloads/report-2.pdf"
  },
  {
    id: "RPT-2024-003",
    title: "Clean Energy Performance Report - Q4 2023",
    type: "energy",
    date: "2024-01-25",
    size: "3.8 MB", 
    format: "PDF",
    status: "completed",
    downloads: 32,
    downloadUrl: "/downloads/report-3.pdf"
  },
  {
    id: "RPT-2024-004",
    title: "Emergency Response Time Analysis",
    type: "performance",
    date: "2024-01-22",
    size: "1.9 MB",
    format: "PDF",
    status: "processing",
    downloads: 0,
    downloadUrl: "/downloads/report-4.pdf"
  }
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedType, setSelectedType] = useState("all")
  const [exportingLogs, setExportingLogs] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [exportingEvents, setExportingEvents] = useState(false);
  const [exportEventsSuccess, setExportEventsSuccess] = useState(false);
  type DisasterEvent = typeof disasterEvents[number];
  const [selectedEvent, setSelectedEvent] = useState<DisasterEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [generatingReport, setGeneratingReport] = useState(false);
  const [generateSuccess, setGenerateSuccess] = useState(false);
  const [reports, setReports] = useState(recentReports);
  const handleGenerateReport = () => {
    setGeneratingReport(true);
    setTimeout(() => {
      const now = new Date();
      const newReport = {
        id: `RPT-${now.getTime()}`,
        title: `Generated Report - ${now.toISOString().slice(0, 10)}`,
        type: selectedType === 'all' ? 'summary' : selectedType,
        date: now.toISOString().slice(0, 10),
        size: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
        format: 'PDF',
        status: 'completed',
        downloads: 0,
        downloadUrl: `/downloads/generated-report-${now.getTime()}.pdf`
      };
      setReports([newReport, ...reports]);
      setGeneratingReport(false);
      setGenerateSuccess(true);
      setTimeout(() => setGenerateSuccess(false), 2000);
    }, 1500);
  };

  const activityLogs = [
    {
      id: "LOG-001",
      timestamp: "2024-01-31 14:30:25",
      user: "Admin User",
      action: "Generated Monthly Report",
      details: "Monthly Disaster Response Summary for January 2024",
      type: "report_generation",
      status: "success"
    },
    {
      id: "LOG-002",
      timestamp: "2024-01-31 13:45:12",
      user: "Emergency Coordinator",
      action: "Activated Flood Protocol",
      details: "Flood warning issued for Marikina River Basin",
      type: "protocol_activation",
      status: "success"
    },
    {
      id: "LOG-003",
      timestamp: "2024-01-31 12:15:08",
      user: "System",
      action: "AI Prediction Update",
      details: "Updated flood risk assessment for Metro Manila",
      type: "ai_prediction",
      status: "success"
    },
    {
      id: "LOG-004",
      timestamp: "2024-01-31 11:30:45",
      user: "Energy Manager",
      action: "Microgrid Switch",
      details: "Switched hospital backup power to solar grid",
      type: "energy_management",
      status: "success"
    },
    {
      id: "LOG-005",
      timestamp: "2024-01-31 10:22:33",
      user: "Data Analyst",
      action: "Export Data",
      details: "Exported seismic monitoring data for analysis",
      type: "data_export",
      status: "success"
    }
  ]

  const responseMetrics = [
    {
      metric: "Average Response Time",
      value: "12.5 minutes",
      change: "-8%",
      trend: "down",
      period: "Last 30 days"
    },
    {
      metric: "Successful Evacuations",
      value: "2,847 people",
      change: "+15%",
      trend: "up",
      period: "Last 30 days"
    },
    {
      metric: "AI Prediction Accuracy",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      period: "Last 30 days"
    },
    {
      metric: "Clean Energy Savings",
      value: "₱1.8M",
      change: "+22%",
      trend: "up",
      period: "Last 30 days"
    }
  ]

  const disasterEvents = [
    {
      id: "EVT-001",
      type: "Flood",
      location: "Marikina River Basin",
      date: "2024-01-28",
      severity: "High",
      affected: "15,000 residents",
      responseTime: "8 minutes",
      evacuated: "2,400 people",
      status: "resolved"
    },
    {
      id: "EVT-002",
      type: "Landslide",
      location: "Baguio Mountain Slopes",
      date: "2024-01-25",
      severity: "Medium",
      affected: "850 residents",
      responseTime: "15 minutes",
      evacuated: "320 people",
      status: "resolved"
    },
    {
      id: "EVT-003",
      type: "Power Outage",
      location: "Northern Luzon Grid",
      date: "2024-01-22",
      severity: "Low",
      affected: "45,000 customers",
      responseTime: "5 minutes",
      evacuated: "0 people",
      status: "resolved"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "processing": return "bg-yellow-100 text-yellow-800"
      case "failed": return "bg-red-100 text-red-800"
      case "success": return "bg-green-100 text-green-800"
      case "resolved": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "summary": return "bg-blue-100 text-blue-800"
      case "assessment": return "bg-purple-100 text-purple-800"
      case "energy": return "bg-green-100 text-green-800"
      case "performance": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleExportLogs = () => {
    setExportingLogs(true);
    const csvRows = [
      'ID,Timestamp,User,Action,Details,Type,Status',
      ...activityLogs.map(log =>
        [log.id, log.timestamp, log.user, log.action, log.details, log.type, log.status].map(field => '"' + String(field).replace(/"/g, '""') + '"').join(',')
      )
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activity-logs.csv';
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

  const handleExportEvents = () => {
    setExportingEvents(true);
    const csvRows = [
      'ID,Type,Location,Date,Severity,Affected,ResponseTime,Evacuated,Status',
      ...disasterEvents.map(event =>
        [event.id, event.type, event.location, event.date, event.severity, event.affected, event.responseTime, event.evacuated, event.status].map(field => '"' + String(field).replace(/"/g, '""') + '"').join(',')
      )
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'disaster-events.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      setExportingEvents(false);
      setExportEventsSuccess(true);
      setTimeout(() => setExportEventsSuccess(false), 2000);
      URL.revokeObjectURL(url);
      a.remove();
    }, 1000);
  };

  return (
    <React.Fragment>
      <DashboardLayout>
        <div className="space-y-6 w-full px-8 lg:px-16">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Logs</h1>
              <p className="text-gray-600 mt-1">Comprehensive reporting and activity monitoring</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[180px] border-gray-200">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-blue-500 to-yellow-400 text-white hover:from-blue-600 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-md" onClick={handleGenerateReport} disabled={generatingReport}>
                <BarChart3 className="w-4 h-4 mr-2" />
                {generatingReport ? 'Generating...' : 'Generate Report'}
              </Button>
            </div>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {responseMetrics.map((metric, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">{metric.period}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      ) : (
                        <TrendingUp className="w-6 h-6 text-red-600 transform rotate-180" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reports Tabs */}
          <Tabs defaultValue="reports" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-gray-50">
              <TabsTrigger value="reports" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
                <FileText className="w-4 h-4 mr-2" />
                Recent Reports
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
                <Activity className="w-4 h-4 mr-2" />
                Activity Logs
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Disaster Events
              </TabsTrigger>
            </TabsList>

            {/* Reports Tab Content */}
            <TabsContent value="reports" className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search reports..."
                    className="pl-10 border-gray-200"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[150px] border-gray-200">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="summary">Summary</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {reports
                  .filter(report => (selectedType === 'all' || report.type === selectedType))
                  .filter(report => report.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((report) => (
                    <Card key={report.id} className="border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col bg-white overflow-hidden">
                      <div className="p-6 flex flex-col h-full">
                        {/* Icon and Title */}
                        <div className="flex items-start mb-3">
                          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <FileText className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 leading-tight">{report.title}</h3>
                          </div>
                        </div>
                        
                        {/* Status Badges */}
                        <div className="flex flex-wrap gap-1 mb-4 mt-2">
                          <Badge className={`${getStatusColor(report.status)} text-xs font-medium px-2 py-1 rounded-md`}>
                            {report.status}
                          </Badge>
                          <Badge className={`${getTypeColor(report.type)} text-xs font-medium px-2 py-1 rounded-md ml-1`}>
                            {report.type}
                          </Badge>
                        </div>
                        
                        {/* Date Section with Icon */}
                        <div className="flex items-center mt-2 mb-2">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600">{report.date}</span>
                        </div>
                        
                        {/* File Size and Format */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-700">{report.size}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-700">{report.format}</span>
                        </div>
                        
                        {/* Downloads Info */}
                        <div className="flex items-center mb-6">
                          <Download className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600">{report.downloads} downloads</span>
                        </div>
                        
                        {/* Download Button */}
                        <div className="mt-auto">
                          <a href={report.downloadUrl} download>
                            <Button variant="outline" className="border-gray-200 text-gray-700 w-full hover:bg-gray-50 flex items-center justify-center h-10">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {/* Activity Logs Tab Content */}
            <TabsContent value="activity" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Recent System Activity</h3>
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50" onClick={handleExportLogs} disabled={exportingLogs}>
                  <Download className="w-4 h-4 mr-1" />
                  {exportingLogs ? 'Exporting...' : 'Export Logs'}
                </Button>
              </div>
              {exportSuccess && <div className="text-green-600 text-sm font-semibold mt-2 flex items-center gap-2"><svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Logs exported!</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {activityLogs.map((log) => (
                  <Card key={log.id} className="border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col">
                    <CardContent className="p-4 h-full flex flex-col">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Activity className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex flex-col gap-2 mb-2">
                              <span className="font-medium text-gray-900">{log.action}</span>
                            <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{log.timestamp}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{log.details}</p>
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <Users className="w-3 h-3 mr-1" />
                            <span>{log.user}</span>
                          </div>
                          <div className="mt-auto" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Disaster Events Tab Content */}
            <TabsContent value="events" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Recent Disaster Events</h3>
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-700 hover:bg-gray-50" onClick={handleExportEvents} disabled={exportingEvents}>
                  <Download className="w-4 h-4 mr-1" />
                  {exportingEvents ? 'Exporting...' : 'Export Events'}
                </Button>
              </div>
              {exportEventsSuccess && <div className="text-green-600 text-sm font-semibold mt-2 flex items-center gap-2"><svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Events exported!</div>}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {disasterEvents.map((event) => (
                  <Card key={event.id} className="border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col bg-white overflow-hidden">
                    <div className="p-6 flex flex-col h-full">
                      {/* Icon and Event Type */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{event.type} - {event.location}</h3>
                          
                          {/* Severity Badge */}
                          <div className="flex flex-wrap gap-1 mt-1 mb-1">
                            <Badge className={`${getSeverityColor(event.severity)} text-xs px-2 py-1 rounded-full font-normal`}>
                              {event.severity} Severity
                            </Badge>
                            <Badge className={`${getStatusColor(event.status)} text-xs px-2 py-1 rounded-full font-normal ml-auto`}>
                              {event.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      {/* Date with Icon */}
                      <div className="flex items-center gap-2 mb-3 mt-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600">{event.date}</span>
                        </div>
                      </div>
                      
                      {/* Affected People */}
                      <div className="flex flex-col mb-2">
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">Affected:</span> {event.affected}
                        </div>
                      </div>
                      
                      {/* Response Information */}
                      <div className="flex items-center mb-2">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-600">Response Time: {event.responseTime}</span>
                      </div>
                      
                      {/* Evacuated Information */}
                      <div className="flex flex-col mb-6">
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">Evacuated:</span> {event.evacuated}
                        </div>
                      </div>
                      
                      {/* View Details Button */}
                      <div className="mt-auto">
                        <Button variant="outline" className="border-gray-200 text-gray-700 w-full hover:bg-gray-50 h-10" onClick={() => { setSelectedEvent(event); setShowEventModal(true); }}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowEventModal(false)} aria-label="Close event modal">×</button>
            <h2 className="text-lg font-bold mb-2">Event Details</h2>
            <div className="mb-2 text-gray-900 font-semibold">{selectedEvent.type} - {selectedEvent.location}</div>
            <div className="mb-1 text-sm text-gray-600">Date: {selectedEvent.date}</div>
            <div className="mb-1 text-sm text-gray-600">Severity: {selectedEvent.severity}</div>
            <div className="mb-1 text-sm text-gray-600">Affected: {selectedEvent.affected}</div>
            <div className="mb-1 text-sm text-gray-600">Response Time: {selectedEvent.responseTime}</div>
            <div className="mb-1 text-sm text-gray-600">Evacuated: {selectedEvent.evacuated}</div>
            <div className="mb-1 text-sm text-gray-600">Status: {selectedEvent.status}</div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white mt-2" onClick={() => setShowEventModal(false)}>Close</Button>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
