"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Zap,
  Sun,
  Wind,
  Droplets,
  Battery,
  TrendingUp,
  Power,
  Settings,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Leaf,
} from "lucide-react"

export default function CleanEnergyPage() {
  const [autoSwitching, setAutoSwitching] = useState(true)
  const [emergencyMode, setEmergencyMode] = useState(false)

  const solarSystems = [
    {
      name: "Quezon City Hospital Solar Array",
      location: "QC Medical Center",
      capacity: "500 kW",
      currentOutput: 425,
      maxOutput: 500,
      efficiency: 85,
      status: "operational",
      batteryLevel: 78,
      dailyGeneration: "2,850 kWh",
      monthlySavings: "₱125,000",
    },
    {
      name: "Marikina Emergency Center Solar",
      location: "Marikina Disaster Response Center",
      capacity: "300 kW",
      currentOutput: 245,
      maxOutput: 300,
      efficiency: 82,
      status: "operational",
      batteryLevel: 65,
      dailyGeneration: "1,680 kWh",
      monthlySavings: "₱78,000",
    },
    {
      name: "Pasig City Hall Solar Grid",
      location: "Pasig Government Complex",
      capacity: "400 kW",
      currentOutput: 0,
      maxOutput: 400,
      efficiency: 0,
      status: "maintenance",
      batteryLevel: 45,
      dailyGeneration: "0 kWh",
      monthlySavings: "₱0",
    },
  ]

  const windSystems = [
    {
      name: "Coastal Wind Farm - Bataan",
      location: "Bataan Peninsula",
      capacity: "2.5 MW",
      currentOutput: 1850,
      maxOutput: 2500,
      efficiency: 74,
      status: "operational",
      windSpeed: "12.5 m/s",
      dailyGeneration: "18,500 kWh",
      monthlySavings: "₱850,000",
    },
    {
      name: "Rizal Hills Wind Turbines",
      location: "Antipolo Hills",
      capacity: "1.8 MW",
      currentOutput: 920,
      maxOutput: 1800,
      efficiency: 51,
      status: "operational",
      windSpeed: "8.2 m/s",
      dailyGeneration: "9,200 kWh",
      monthlySavings: "₱420,000",
    },
  ]

  const hydroSystems = [
    {
      name: "Laguna Lake Micro-Hydro",
      location: "Laguna Lake Basin",
      capacity: "800 kW",
      currentOutput: 650,
      maxOutput: 800,
      efficiency: 81,
      status: "operational",
      waterFlow: "15.2 m³/s",
      dailyGeneration: "6,500 kWh",
      monthlySavings: "₱295,000",
    },
  ]

  const microgridStatus = [
    {
      name: "Metro Manila Hospital Network",
      facilities: 8,
      totalCapacity: "3.2 MW",
      currentLoad: 2450,
      maxLoad: 3200,
      batteryBackup: 85,
      status: "optimal",
      criticalSystems: ["ICU", "Emergency Room", "Operating Theaters"],
      backupDuration: "12 hours",
    },
    {
      name: "Emergency Response Centers",
      facilities: 5,
      totalCapacity: "1.8 MW",
      currentLoad: 1200,
      maxLoad: 1800,
      batteryBackup: 72,
      status: "operational",
      criticalSystems: ["Communications", "Command Center", "Data Systems"],
      backupDuration: "8 hours",
    },
    {
      name: "Government Buildings Grid",
      facilities: 12,
      totalCapacity: "2.5 MW",
      currentLoad: 1850,
      maxLoad: 2500,
      batteryBackup: 68,
      status: "operational",
      criticalSystems: ["Security Systems", "IT Infrastructure", "HVAC"],
      backupDuration: "6 hours",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800"
      case "optimal":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return "text-green-600"
    if (efficiency >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clean Energy Management</h1>
            <p className="text-gray-600 mt-1">Renewable energy microgrids and emergency power systems</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch checked={autoSwitching} onCheckedChange={setAutoSwitching} id="auto-switching" />
              <label htmlFor="auto-switching" className="text-sm font-medium">
                Auto Grid Switching
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch checked={emergencyMode} onCheckedChange={setEmergencyMode} id="emergency-mode" />
              <label htmlFor="emergency-mode" className="text-sm font-medium text-red-600">
                Emergency Mode
              </label>
            </div>
          </div>
        </div>

        {/* Energy Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Generation</p>
                  <p className="text-2xl font-bold text-gray-900">8.2 MW</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% from yesterday
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Battery Storage</p>
                  <p className="text-2xl font-bold text-gray-900">72%</p>
                  <p className="text-xs text-gray-600 mt-1">Average across all systems</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Battery className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cost Savings</p>
                  <p className="text-2xl font-bold text-gray-900">₱1.8M</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <DollarSign className="w-3 h-3 mr-1" />
                    Monthly savings
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Carbon Offset</p>
                  <p className="text-2xl font-bold text-gray-900">45.2T</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <Leaf className="w-3 h-3 mr-1" />
                    CO₂ saved this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Energy Systems Tabs */}
        <Tabs defaultValue="solar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-50">
            <TabsTrigger value="solar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              <Sun className="w-4 h-4 mr-2" />
              Solar Systems
            </TabsTrigger>
            <TabsTrigger value="wind" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              <Wind className="w-4 h-4 mr-2" />
              Wind Power
            </TabsTrigger>
            <TabsTrigger value="hydro" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              <Droplets className="w-4 h-4 mr-2" />
              Hydroelectric
            </TabsTrigger>
            <TabsTrigger value="microgrids" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              <Power className="w-4 h-4 mr-2" />
              Microgrids
            </TabsTrigger>
          </TabsList>

          {/* Solar Systems Tab */}
          <TabsContent value="solar" className="space-y-6">
            <div className="grid gap-6">
              {solarSystems.map((system, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <CardTitle className="text-gray-900 flex items-center">
                          <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                          {system.name}
                        </CardTitle>
                        <p className="text-gray-600 text-sm mt-1">{system.location}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(system.status)}>{system.status.toUpperCase()}</Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{system.capacity}</div>
                          <div className="text-xs text-gray-600">Capacity</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className="text-2xl font-bold text-gray-900">{system.currentOutput} kW</div>
                        <div className="text-xs text-gray-600">Current Output</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className={`text-2xl font-bold ${getEfficiencyColor(system.efficiency)}`}>
                          {system.efficiency}%
                        </div>
                        <div className="text-xs text-gray-600">Efficiency</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className="text-2xl font-bold text-gray-900">{system.batteryLevel}%</div>
                        <div className="text-xs text-gray-600">Battery Level</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className="text-lg font-bold text-green-600">{system.monthlySavings}</div>
                        <div className="text-xs text-gray-600">Monthly Savings</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Power Output</span>
                          <span>
                            {system.currentOutput}/{system.maxOutput} kW
                          </span>
                        </div>
                        <Progress value={(system.currentOutput / system.maxOutput) * 100} className="h-3" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Battery Storage</span>
                          <span>{system.batteryLevel}%</span>
                        </div>
                        <Progress value={system.batteryLevel} className="h-3" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Daily Generation</div>
                        <div className="text-lg font-bold text-gray-700">{system.dailyGeneration}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        {system.status === "maintenance" ? (
                          <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white transition-all transform hover:scale-105 shadow-md">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Resume
                          </Button>
                        ) : (
                          <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all transform hover:scale-105 shadow-md">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Optimal
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Wind Power Tab */}
          <TabsContent value="wind" className="space-y-6">
            <div className="grid gap-6">
              {windSystems.map((system, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <CardTitle className="text-gray-900 flex items-center">
                          <Wind className="w-5 h-5 mr-2 text-blue-500" />
                          {system.name}
                        </CardTitle>
                        <p className="text-gray-600 text-sm mt-1">{system.location}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(system.status)}>{system.status.toUpperCase()}</Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{system.capacity}</div>
                          <div className="text-xs text-gray-600">Capacity</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className="text-2xl font-bold text-gray-900">{system.currentOutput} kW</div>
                        <div className="text-xs text-gray-600">Current Output</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className={`text-2xl font-bold ${getEfficiencyColor(system.efficiency)}`}>
                          {system.efficiency}%
                        </div>
                        <div className="text-xs text-gray-600">Efficiency</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className="text-2xl font-bold text-gray-900">{system.windSpeed}</div>
                        <div className="text-xs text-gray-600">Wind Speed</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className="text-lg font-bold text-green-600">{system.monthlySavings}</div>
                        <div className="text-xs text-gray-600">Monthly Savings</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Power Output</span>
                          <span>
                            {system.currentOutput}/{system.maxOutput} kW
                          </span>
                        </div>
                        <Progress value={(system.currentOutput / system.maxOutput) * 100} className="h-3" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-blue-900">Daily Generation</div>
                        <div className="text-lg font-bold text-blue-600">{system.dailyGeneration}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 bg-transparent">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Optimal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Hydroelectric Tab */}
          <TabsContent value="hydro" className="space-y-6">
            <div className="grid gap-6">
              {hydroSystems.map((system, index) => (
                <Card key={index} className="border-blue-200">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <CardTitle className="text-blue-900 flex items-center">
                          <Droplets className="w-5 h-5 mr-2 text-cyan-500" />
                          {system.name}
                        </CardTitle>
                        <p className="text-blue-600 text-sm mt-1">{system.location}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(system.status)}>{system.status.toUpperCase()}</Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-900">{system.capacity}</div>
                          <div className="text-xs text-blue-600">Capacity</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-cyan-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-900">{system.currentOutput} kW</div>
                        <div className="text-xs text-blue-600">Current Output</div>
                      </div>
                      <div className="bg-cyan-50 p-4 rounded-lg text-center">
                        <div className={`text-2xl font-bold ${getEfficiencyColor(system.efficiency)}`}>
                          {system.efficiency}%
                        </div>
                        <div className="text-xs text-blue-600">Efficiency</div>
                      </div>
                      <div className="bg-cyan-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-900">{system.waterFlow}</div>
                        <div className="text-xs text-blue-600">Water Flow</div>
                      </div>
                      <div className="bg-cyan-50 p-4 rounded-lg text-center">
                        <div className="text-lg font-bold text-green-600">{system.monthlySavings}</div>
                        <div className="text-xs text-blue-600">Monthly Savings</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Power Output</span>
                          <span>
                            {system.currentOutput}/{system.maxOutput} kW
                          </span>
                        </div>
                        <Progress value={(system.currentOutput / system.maxOutput) * 100} className="h-3" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-blue-900">Daily Generation</div>
                        <div className="text-lg font-bold text-blue-600">{system.dailyGeneration}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 bg-transparent">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Optimal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Microgrids Tab */}
          <TabsContent value="microgrids" className="space-y-6">
            <div className="grid gap-6">
              {microgridStatus.map((grid, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <CardTitle className="text-gray-900 flex items-center">
                          <Power className="w-5 h-5 mr-2 text-purple-500" />
                          {grid.name}
                        </CardTitle>
                        <p className="text-gray-600 text-sm mt-1">{grid.facilities} connected facilities</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(grid.status)}>{grid.status.toUpperCase()}</Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{grid.totalCapacity}</div>
                          <div className="text-xs text-gray-600">Total Capacity</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className="text-2xl font-bold text-gray-900">{grid.currentLoad} kW</div>
                        <div className="text-xs text-gray-600">Current Load</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className="text-2xl font-bold text-gray-900">{grid.batteryBackup}%</div>
                        <div className="text-xs text-gray-600">Battery Backup</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className="text-2xl font-bold text-gray-900">{grid.facilities}</div>
                        <div className="text-xs text-gray-600">Facilities</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                        <div className="text-2xl font-bold text-gray-900">{grid.backupDuration}</div>
                        <div className="text-xs text-gray-600">Backup Duration</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Grid Load</span>
                          <span>
                            {grid.currentLoad}/{grid.maxLoad} kW
                          </span>
                        </div>
                        <Progress value={(grid.currentLoad / grid.maxLoad) * 100} className="h-3" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Battery Backup</span>
                          <span>{grid.batteryBackup}%</span>
                        </div>
                        <Progress value={grid.batteryBackup} className="h-3" />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Critical Systems Protected:</h4>
                      <div className="flex flex-wrap gap-2">
                        {grid.criticalSystems.map((system, systemIndex) => (
                          <Badge key={systemIndex} variant="outline" className="border-gray-200 text-gray-700">
                            {system}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white flex-1 transition-all transform hover:scale-105 shadow-md">
                        <Power className="w-4 h-4 mr-2" />
                        Switch to Backup
                      </Button>
                      <Button variant="outline" className="border-gray-200 text-gray-700 flex-1 bg-transparent hover:bg-gray-50">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure Grid
                      </Button>
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
