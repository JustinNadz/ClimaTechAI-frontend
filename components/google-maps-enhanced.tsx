"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, HeatmapLayer, Circle } from '@react-google-maps/api'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  MapPin, Layers, Zap, Droplets, Mountain, Flame, 
  Satellite, Navigation, AlertTriangle, Wind, 
  Thermometer, Eye, Activity, BarChart3 
} from "lucide-react"

const libraries: ["visualization", "places"] = ["visualization", "places"]

const mapContainerStyle = {
  width: '100%',
  height: '600px'
}

const center = {
  lat: 12.8797,
  lng: 121.7740 // Philippines center
}

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
  weatherData?: {
    temperature: number
    humidity: number
    windSpeed: number
    rainfall: number
  }
}

interface GoogleMapsEnhancedProps {
  detections?: ClimateDetection[]
  selectedType?: string
  onDetectionSelect?: (detection: ClimateDetection) => void
}

export function GoogleMapsEnhanced({ 
  detections = [], 
  selectedType = 'all',
  onDetectionSelect 
}: GoogleMapsEnhancedProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDs1jPthO5glpp9gJ3d5ahKoRsHxrc2g7Q',
    libraries
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [selectedDetection, setSelectedDetection] = useState<ClimateDetection | null>(null)
  const [viewMode, setViewMode] = useState<'satellite' | 'roadmap' | 'terrain' | 'hybrid'>('satellite')
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [realTimeData, setRealTimeData] = useState<ClimateDetection[]>([])

  // Mock real-time data - replace with your WebSocket/API
  useEffect(() => {
    const generateMockData = (): ClimateDetection[] => [
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
        affectedArea: 15.2,
        weatherData: {
          temperature: 28,
          humidity: 85,
          windSpeed: 25,
          rainfall: 45
        }
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
        affectedArea: 8.7,
        weatherData: {
          temperature: 18,
          humidity: 92,
          windSpeed: 15,
          rainfall: 32
        }
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
        affectedArea: 12.1,
        weatherData: {
          temperature: 35,
          humidity: 45,
          windSpeed: 20,
          rainfall: 0
        }
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
        affectedArea: 125.8,
        weatherData: {
          temperature: 26,
          humidity: 95,
          windSpeed: 120,
          rainfall: 85
        }
      }
    ]

    setRealTimeData(generateMockData())
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeData(prev => prev.map(detection => ({
        ...detection,
        timestamp: new Date().toISOString(),
        confidence: Math.max(50, Math.min(100, detection.confidence + (Math.random() - 0.5) * 10))
      })))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const filteredDetections = selectedType === 'all' 
    ? realTimeData 
    : realTimeData.filter(d => d.type === selectedType)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#dc2626'
      case 'high': return '#ea580c'
      case 'medium': return '#d97706'
      case 'low': return '#65a30d'
      default: return '#6b7280'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flood': return '💧'
      case 'landslide': return '⛰️'
      case 'fire': return '🔥'
      case 'storm': return '🌪️'
      case 'drought': return '🌵'
      case 'earthquake': return '📳'
      default: return '⚠️'
    }
  }

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleMarkerClick = (detection: ClimateDetection) => {
    setSelectedDetection(detection)
    onDetectionSelect?.(detection)
  }

  if (loadError) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-[600px]">
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <p className="text-red-600 font-semibold mb-2">Google Maps failed to load</p>
            <p className="text-gray-600 text-sm">Please check your internet connection and try again</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isLoaded) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-[600px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading enhanced maps...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border-blue-200 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <CardTitle className="text-blue-900 flex items-center">
            <Satellite className="w-5 h-5 mr-2" />
            Real-Time Climate Intelligence Map
          </CardTitle>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={showHeatmap ? "default" : "outline"}
              size="sm"
              onClick={() => setShowHeatmap(!showHeatmap)}
              className="border-blue-200"
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Heatmap
            </Button>
            
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
              <TabsList className="grid grid-cols-4 w-80">
                <TabsTrigger value="satellite">Satellite</TabsTrigger>
                <TabsTrigger value="roadmap">Road</TabsTrigger>
                <TabsTrigger value="terrain">Terrain</TabsTrigger>
                <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Real-time status bar */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
            🟢 System Online - {filteredDetections.length} Active Detections
          </Badge>
          <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
            📡 Last Update: {new Date().toLocaleTimeString()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={6}
            onLoad={onLoad}
            onUnmount={onUnmount}
            mapTypeId={viewMode}
            options={{
              styles: viewMode === 'satellite' ? [] : [
                {
                  featureType: "water",
                  elementType: "geometry",
                  stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
                }
              ],
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: true,
              scaleControl: true,
              streetViewControl: true,
              rotateControl: true,
              fullscreenControl: true
            }}
          >
            {/* Render detection markers */}
            {filteredDetections.map((detection) => (
              <React.Fragment key={detection.id}>
                <Marker
                  position={{ lat: detection.lat, lng: detection.lng }}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: getSeverityColor(detection.severity),
                    fillOpacity: 0.8,
                    strokeColor: '#ffffff',
                    strokeWeight: 2,
                    scale: detection.severity === 'critical' ? 15 : 10,
                  }}
                  onClick={() => handleMarkerClick(detection)}
                />
                
                {/* Affected area circle for critical alerts */}
                {detection.severity === 'critical' && (
                  <Circle
                    center={{ lat: detection.lat, lng: detection.lng }}
                    radius={detection.affectedArea * 1000}
                    options={{
                      fillColor: getSeverityColor(detection.severity),
                      fillOpacity: 0.1,
                      strokeColor: getSeverityColor(detection.severity),
                      strokeOpacity: 0.3,
                      strokeWeight: 2,
                    }}
                  />
                )}
              </React.Fragment>
            ))}

            {/* Heatmap layer */}
            {showHeatmap && (
              <HeatmapLayer
                data={filteredDetections.map(d => ({
                  location: new google.maps.LatLng(d.lat, d.lng),
                  weight: d.severity === 'critical' ? 4 : d.severity === 'high' ? 3 : 2
                }))}
                options={{
                  radius: 50,
                  opacity: 0.6
                }}
              />
            )}

            {/* Info window for selected detection */}
            {selectedDetection && (
              <InfoWindow
                position={{ lat: selectedDetection.lat, lng: selectedDetection.lng }}
                onCloseClick={() => setSelectedDetection(null)}
              >
                <div className="max-w-sm p-3">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">{getTypeIcon(selectedDetection.type)}</span>
                    <h3 className="font-semibold text-gray-900">{selectedDetection.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{selectedDetection.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      <span className="font-medium">Severity:</span>
                      <Badge 
                        variant="outline" 
                        className="ml-1 text-xs"
                        style={{ 
                          borderColor: getSeverityColor(selectedDetection.severity),
                          color: getSeverityColor(selectedDetection.severity)
                        }}
                      >
                        {selectedDetection.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Activity className="w-3 h-3 mr-1" />
                      <span>Confidence: {selectedDetection.confidence}%</span>
                    </div>
                  </div>

                  {selectedDetection.weatherData && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <h4 className="font-medium text-xs mb-2">Live Weather Data:</h4>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div className="flex items-center">
                          <Thermometer className="w-3 h-3 mr-1" />
                          {selectedDetection.weatherData.temperature}°C
                        </div>
                        <div className="flex items-center">
                          <Droplets className="w-3 h-3 mr-1" />
                          {selectedDetection.weatherData.rainfall}mm
                        </div>
                        <div className="flex items-center">
                          <Wind className="w-3 h-3 mr-1" />
                          {selectedDetection.weatherData.windSpeed}km/h
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {selectedDetection.weatherData.humidity}% RH
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 text-xs text-gray-500">
                    Updated: {new Date(selectedDetection.timestamp).toLocaleString()}
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>

        {/* Map controls footer */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-red-200 text-red-700">
                🚨 {filteredDetections.filter(d => d.severity === 'critical').length} Critical
              </Badge>
              <Badge variant="outline" className="border-orange-200 text-orange-700">
                ⚠️ {filteredDetections.filter(d => d.severity === 'high').length} High Risk
              </Badge>
              <Badge variant="outline" className="border-yellow-200 text-yellow-700">
                ⚡ {filteredDetections.filter(d => d.severity === 'medium').length} Medium Risk
              </Badge>
              <Badge variant="outline" className="border-green-200 text-green-700">
                ✅ {filteredDetections.filter(d => d.severity === 'low').length} Low Risk
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => map?.setZoom(6)}
                className="border-blue-200 text-blue-700"
              >
                <Navigation className="w-4 h-4 mr-1" />
                Reset View
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
