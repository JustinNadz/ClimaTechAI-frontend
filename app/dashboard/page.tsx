"use client"

import { useState, useEffect, useCallback } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatusCards } from "@/components/status-cards"
import { EmergencyAlerts } from "@/components/emergency-alerts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Satellite, BarChart3, Bot, Activity, 
  MapPin, AlertTriangle, Zap, RefreshCw,
  Layers, Grid3X3, MessageCircle
} from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import heavy components
const GoogleMapsEnhanced = dynamic(() => import("@/components/google-maps-enhanced").then(mod => mod.GoogleMapsEnhanced), { 
  ssr: false,
  loading: () => (
    <Card className="w-full">
      <CardContent className="flex items-center justify-center h-[600px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading enhanced satellite view...</p>
        </div>
      </CardContent>
    </Card>
  )
})

const ClimateBot = dynamic(() => import("@/components/climate-bot").then(mod => mod.ClimateBot), { 
  ssr: false,
  loading: () => (
    <Card className="w-full h-[600px]">
      <CardContent className="flex items-center justify-center h-full">
        <div className="text-center">
          <Bot className="w-8 h-8 mx-auto mb-4 animate-pulse text-blue-600" />
          <p className="text-gray-600">Initializing ClimateBot AI...</p>
        </div>
      </CardContent>
    </Card>
  )
})

const LiveDataFeed = dynamic(() => import("@/components/live-data-feed").then(mod => mod.LiveDataFeed), { ssr: false })
const AIForecastingPanel = dynamic(() => import("@/components/ai-forecasting-panel").then(mod => mod.AIForecastingPanel), { ssr: false })

interface ClimateDetection {
  id: string
  type: 'flood' | 'landslide' | 'fire' | 'storm' | 'drought' | 'earthquake'
  severity: 'low' | 'medium' | 'high' | 'critical'
  lat: number
  lng: number
  title: string
  description: string
  timestamp: string
  confidence: number
  affectedArea: number
}

export default function DashboardPage() {
  const [activeView, setActiveView] = useState("overview")
  const [isOnline, setIsOnline] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [selectedDetectionFilter, setSelectedDetectionFilter] = useState("all")
  const [mapData, setMapData] = useState<any>(null)
  
  // Real-time climate detection data
  const [climateDetections, setClimateDetections] = useState<ClimateDetection[]>([
    {
      id: '1',
      type: 'flood',
      severity: 'high',
      lat: 14.5995,
      lng: 120.9842,
      title: 'Flash Flood Alert - Metro Manila',
      description: 'Heavy rainfall detected, flood risk imminent in low-lying areas',
      timestamp: new Date().toISOString(),
      confidence: 92,
      affectedArea: 15.2
    },
    {
      id: '2',
      type: 'landslide',
      severity: 'medium',
      lat: 16.4023,
      lng: 120.5960,
      title: 'Landslide Risk - Baguio',
      description: 'Soil saturation levels critical, landslide risk elevated',
      timestamp: new Date().toISOString(),
      confidence: 78,
      affectedArea: 8.7
    },
    {
      id: '3',
      type: 'fire',
      severity: 'low',
      lat: 10.3157,
      lng: 123.8854,
      title: 'Fire Risk - Cebu',
      description: 'Dry conditions detected, fire risk monitoring active',
      timestamp: new Date().toISOString(),
      confidence: 65,
      affectedArea: 12.1
    },
    {
      id: '4',
      type: 'storm',
      severity: 'critical',
      lat: 13.4125,
      lng: 123.4175,
      title: 'Typhoon Approaching - Bicol Region',
      description: 'Category 3 typhoon detected, immediate evacuation recommended',
      timestamp: new Date().toISOString(),
      confidence: 96,
      affectedArea: 125.8
    }
  ])

  // Real-time data updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setLastUpdate(new Date())
      // Simulate real-time confidence updates
      setClimateDetections(prev => 
        prev.map(detection => ({
          ...detection,
          confidence: Math.max(50, Math.min(100, detection.confidence + (Math.random() - 0.5) * 5)),
          timestamp: new Date().toISOString()
        }))
      )
    }, 15000) // Update every 15 seconds

    return () => clearInterval(updateInterval)
  }, [])

  // Handle ClimateBot map updates
  const handleMapUpdate = useCallback((newMapData: any) => {
    setMapData(newMapData)
    setActiveView("map") // Switch to map view when bot provides map data
  }, [])

  // Filter detections based on selected type
  const filteredDetections = selectedDetectionFilter === "all" 
    ? climateDetections 
    : climateDetections.filter(d => d.type === selectedDetectionFilter)

  const detectionStats = {
    critical: climateDetections.filter(d => d.severity === 'critical').length,
    high: climateDetections.filter(d => d.severity === 'high').length,
    medium: climateDetections.filter(d => d.severity === 'medium').length,
    low: climateDetections.filter(d => d.severity === 'low').length,
    total: climateDetections.length
  }

  const detectionTypes = [
    { id: "all", label: "All Types", icon: Layers, count: climateDetections.length },
    { id: "flood", label: "Floods", icon: "🌊", count: climateDetections.filter(d => d.type === 'flood').length },
    { id: "storm", label: "Storms", icon: "🌪️", count: climateDetections.filter(d => d.type === 'storm').length },
    { id: "fire", label: "Fires", icon: "🔥", count: climateDetections.filter(d => d.type === 'fire').length },
    { id: "landslide", label: "Landslides", icon: "⛰️", count: climateDetections.filter(d => d.type === 'landslide').length }
  ]

  return (
    <DashboardLayout>
      <div className="w-full max-w-screen-2xl mx-auto px-4 lg:px-8 py-6">
        {/* Enhanced Header with Real-time Status */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                🌏 Climate Intelligence Center
                <Badge 
                  variant="outline" 
                  className={`ml-3 ${isOnline ? 'border-green-200 text-green-700 bg-green-50' : 'border-red-200 text-red-700 bg-red-50'}`}
                >
                  {isOnline ? '🟢 LIVE' : '🔴 OFFLINE'}
                </Badge>
              </h1>
              <p className="text-gray-600 text-lg">
                Real-time climate monitoring and AI-powered disaster prediction
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="text-right text-sm text-gray-500">
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-1" />
                  Last Update: {lastUpdate.toLocaleTimeString()}
                </div>
                <div className="flex items-center mt-1">
                  <Satellite className="w-4 h-4 mr-1" />
                  247 Stations Active
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setLastUpdate(new Date())}
                className="border-blue-200 text-blue-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Alert Summary Bar */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50 px-3 py-1">
              🚨 {detectionStats.critical} Critical Alerts
            </Badge>
            <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50 px-3 py-1">
              ⚠️ {detectionStats.high} High Risk
            </Badge>
            <Badge variant="outline" className="border-yellow-200 text-yellow-700 bg-yellow-50 px-3 py-1">
              ⚡ {detectionStats.medium} Medium Risk
            </Badge>
            <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 px-3 py-1">
              ✅ {detectionStats.low} Low Risk
            </Badge>
            <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 px-3 py-1">
              📊 {detectionStats.total} Total Detections
            </Badge>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Grid3X3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Live Map
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="climatebot" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              ClimateBot
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="xl:col-span-2 space-y-8">
                {/* System Status Cards */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    System Status Overview
                  </h3>
                  <StatusCards />
                </section>

                {/* Enhanced Map Preview */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <Satellite className="w-5 h-5 mr-2 text-blue-600" />
                      Satellite Intelligence Map
                    </h3>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveView("map")}
                      className="border-blue-200 text-blue-700"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Full Screen
                    </Button>
                  </div>
                  <div className="h-[400px]">
                    <GoogleMapsEnhanced 
                      detections={filteredDetections}
                      selectedType={selectedDetectionFilter}
                    />
                  </div>
                </section>

                {/* AI Forecasting */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-600" />
                    AI Forecasting Engine
                  </h3>
                  <AIForecastingPanel />
                </section>

                {/* Live Data Feed */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    Real-Time Data Streams
                  </h3>
                  <LiveDataFeed />
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Emergency Alerts */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                    Emergency Alerts
                  </h3>
                  <EmergencyAlerts />
                </section>

                {/* Detection Filters */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-900 flex items-center">
                      <Layers className="w-5 h-5 mr-2" />
                      Detection Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {detectionTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={selectedDetectionFilter === type.id ? "default" : "outline"}
                        className={`w-full justify-between ${
                          selectedDetectionFilter === type.id 
                            ? "bg-blue-600 text-white" 
                            : "border-blue-200 text-blue-700 hover:bg-blue-50"
                        }`}
                        onClick={() => setSelectedDetectionFilter(type.id)}
                      >
                        <span className="flex items-center">
                          {typeof type.icon === 'string' ? (
                            <span className="mr-2">{type.icon}</span>
                          ) : (
                            <type.icon className="w-4 h-4 mr-2" />
                          )}
                          {type.label}
                        </span>
                        <Badge variant="secondary" className="bg-white bg-opacity-20">
                          {type.count}
                        </Badge>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Map Tab */}
          <TabsContent value="map" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <GoogleMapsEnhanced 
                  detections={filteredDetections}
                  selectedType={selectedDetectionFilter}
                  {...(mapData && { ...mapData })} // Apply bot-provided map data
                />
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AIForecastingPanel />
              <LiveDataFeed />
            </div>
          </TabsContent>

          {/* ClimateBot Tab */}
          <TabsContent value="climatebot" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ClimateBot 
                onMapUpdate={handleMapUpdate}
                currentDetections={climateDetections}
              />
              <div className="space-y-6">
                <GoogleMapsEnhanced 
                  detections={filteredDetections}
                  selectedType={selectedDetectionFilter}
                  {...(mapData && { ...mapData })} // Apply bot-provided map data
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
