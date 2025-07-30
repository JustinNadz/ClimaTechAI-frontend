"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Thermometer, Droplets, Wind, Zap, Activity, 
  Satellite, MapPin, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle, Clock, RefreshCw
} from "lucide-react"

interface DataPoint {
  label: string
  value: string
  numericValue: number
  unit: string
  icon: any
  status: 'normal' | 'warning' | 'danger' | 'good'
  trend: 'up' | 'down' | 'stable'
  change: string
}

interface StationData {
  id: string
  station: string
  type: 'weather' | 'seismic' | 'power' | 'water' | 'air'
  location: string
  coordinates: [number, number]
  lastUpdate: Date
  status: 'online' | 'offline' | 'maintenance'
  data: DataPoint[]
}

export function LiveDataFeed() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedStation, setSelectedStation] = useState<string>('all')
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Real-time station data with dynamic updates
  const [stationsData, setStationsData] = useState<StationData[]>([
    {
      id: 'pagasa-qc',
      station: "PAGASA Station - Quezon City",
      type: "weather",
      location: "Quezon City, Metro Manila",
      coordinates: [14.6760, 121.0437],
      lastUpdate: new Date(),
      status: 'online',
      data: [
        { 
          label: "Temperature", 
          value: "28.5°C", 
          numericValue: 28.5,
          unit: "°C",
          icon: Thermometer, 
          status: "normal",
          trend: "up",
          change: "+0.3°C"
        },
        { 
          label: "Rainfall Rate", 
          value: "12.3 mm/hr", 
          numericValue: 12.3,
          unit: "mm/hr",
          icon: Droplets, 
          status: "warning",
          trend: "up",
          change: "+5.2mm"
        },
        { 
          label: "Wind Speed", 
          value: "15.2 km/h", 
          numericValue: 15.2,
          unit: "km/h",
          icon: Wind, 
          status: "normal",
          trend: "stable",
          change: "±0.1km/h"
        },
        { 
          label: "Humidity", 
          value: "78%", 
          numericValue: 78,
          unit: "%",
          icon: Droplets, 
          status: "normal",
          trend: "down",
          change: "-2%"
        },
      ],
    },
    {
      id: 'phivolcs-marikina',
      station: "PHIVOLCS Station - Marikina",
      type: "seismic",
      location: "Marikina City, Metro Manila",
      coordinates: [14.6507, 121.1029],
      lastUpdate: new Date(),
      status: 'online',
      data: [
        { 
          label: "Ground Motion", 
          value: "0.02 gal", 
          numericValue: 0.02,
          unit: "gal",
          icon: Activity, 
          status: "normal",
          trend: "stable",
          change: "±0.001"
        },
        { 
          label: "Last Earthquake", 
          value: "Mag 2.1", 
          numericValue: 2.1,
          unit: "Mag",
          icon: Activity, 
          status: "normal",
          trend: "stable",
          change: "6h ago"
        },
        { 
          label: "Depth", 
          value: "15 km", 
          numericValue: 15,
          unit: "km",
          icon: Activity, 
          status: "normal",
          trend: "stable",
          change: "Deep"
        },
      ],
    },
    {
      id: 'grid-luzon',
      station: "Power Grid - Luzon",
      type: "power",
      location: "Luzon Grid, Philippines",
      coordinates: [14.5995, 120.9842],
      lastUpdate: new Date(),
      status: 'online',
      data: [
        { 
          label: "Grid Voltage", 
          value: "230.5V", 
          numericValue: 230.5,
          unit: "V",
          icon: Zap, 
          status: "normal",
          trend: "stable",
          change: "±0.2V"
        },
        { 
          label: "Load Factor", 
          value: "87.3%", 
          numericValue: 87.3,
          unit: "%",
          icon: Zap, 
          status: "warning",
          trend: "up",
          change: "+3.2%"
        },
        { 
          label: "Frequency", 
          value: "60.0 Hz", 
          numericValue: 60.0,
          unit: "Hz",
          icon: Zap, 
          status: "good",
          trend: "stable",
          change: "±0.01Hz"
        },
      ],
    },
    {
      id: 'water-mmda',
      station: "MMDA Water Level - Pasig",
      type: "water",
      location: "Pasig River, Metro Manila",
      coordinates: [14.5764, 121.0851],
      lastUpdate: new Date(),
      status: 'online',
      data: [
        { 
          label: "Water Level", 
          value: "2.8 m", 
          numericValue: 2.8,
          unit: "m",
          icon: Droplets, 
          status: "warning",
          trend: "up",
          change: "+0.5m"
        },
        { 
          label: "Flow Rate", 
          value: "15.2 m³/s", 
          numericValue: 15.2,
          unit: "m³/s",
          icon: Droplets, 
          status: "normal",
          trend: "up",
          change: "+2.1m³/s"
        },
        { 
          label: "Turbidity", 
          value: "45 NTU", 
          numericValue: 45,
          unit: "NTU",
          icon: Droplets, 
          status: "warning",
          trend: "up",
          change: "+8 NTU"
        },
      ],
    },
    {
      id: 'air-quality-bgc',
      station: "Air Quality - Bonifacio Global City",
      type: "air",
      location: "BGC, Taguig City",
      coordinates: [14.5547, 121.0244],
      lastUpdate: new Date(),
      status: 'online',
      data: [
        { 
          label: "PM2.5", 
          value: "25 μg/m³", 
          numericValue: 25,
          unit: "μg/m³",
          icon: Wind, 
          status: "normal",
          trend: "down",
          change: "-3μg/m³"
        },
        { 
          label: "AQI", 
          value: "52", 
          numericValue: 52,
          unit: "AQI",
          icon: Wind, 
          status: "good",
          trend: "down",
          change: "-8 points"
        },
        { 
          label: "O₃", 
          value: "45 ppb", 
          numericValue: 45,
          unit: "ppb",
          icon: Wind, 
          status: "normal",
          trend: "stable",
          change: "±2ppb"
        },
      ],
    }
  ])

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate real-time data updates
  useEffect(() => {
    if (!autoRefresh) return

    const updateData = () => {
      setStationsData(prev => prev.map(station => ({
        ...station,
        lastUpdate: new Date(),
        data: station.data.map(dataPoint => {
          // Simulate realistic data variations
          let variation = 0
          switch (dataPoint.label) {
            case 'Temperature':
              variation = (Math.random() - 0.5) * 2 // ±1°C
              break
            case 'Rainfall Rate':
              variation = (Math.random() - 0.3) * 5 // Mostly increase
              break
            case 'Wind Speed':
              variation = (Math.random() - 0.5) * 3 // ±1.5 km/h
              break
            case 'Humidity':
              variation = (Math.random() - 0.5) * 4 // ±2%
              break
            case 'Water Level':
              variation = (Math.random() - 0.3) * 0.2 // Slightly increasing
              break
            case 'Load Factor':
              variation = (Math.random() - 0.5) * 2 // ±1%
              break
            default:
              variation = (Math.random() - 0.5) * 0.1
          }

          const newValue = Math.max(0, dataPoint.numericValue + variation)
          const newTrend = variation > 0.1 ? 'up' : variation < -0.1 ? 'down' : 'stable'
          
          return {
            ...dataPoint,
            numericValue: newValue,
            value: `${newValue.toFixed(1)}${dataPoint.unit}`,
            trend: newTrend,
            change: `${variation >= 0 ? '+' : ''}${variation.toFixed(1)}${dataPoint.unit}`
          }
        })
      })))
    }

    const interval = setInterval(updateData, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [autoRefresh])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "danger":
        return "bg-red-100 text-red-800 border-red-200"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-orange-600" />
      case 'down':
        return <TrendingDown className="w-3 h-3 text-blue-600" />
      default:
        return <Activity className="w-3 h-3 text-gray-600" />
    }
  }

  const getStationStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'offline':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />
    }
  }

  const stationTypes = [
    { id: 'all', label: 'All Stations', icon: Satellite },
    { id: 'weather', label: 'Weather', icon: Thermometer },
    { id: 'seismic', label: 'Seismic', icon: Activity },
    { id: 'power', label: 'Power Grid', icon: Zap },
    { id: 'water', label: 'Water Level', icon: Droplets },
    { id: 'air', label: 'Air Quality', icon: Wind }
  ]

  const filteredStations = selectedStation === 'all' 
    ? stationsData 
    : stationsData.filter(station => station.type === selectedStation)

  return (
    <Card className="border-blue-200 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <CardTitle className="text-blue-900 flex items-center">
            <div className="relative">
              <Activity className="w-5 h-5 mr-2" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            Real-Time Data Streams
          </CardTitle>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
              🟢 {stationsData.filter(s => s.status === 'online').length} Online
            </Badge>
            <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
              📡 Live Updates: {currentTime.toLocaleTimeString()}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`border-blue-200 ${autoRefresh ? 'text-blue-700' : 'text-gray-500'}`}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto' : 'Manual'}
            </Button>
          </div>
        </div>

        {/* Station Type Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {stationTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedStation === type.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStation(type.id)}
              className={selectedStation === type.id ? "bg-blue-600" : "border-blue-200 text-blue-700"}
            >
              <type.icon className="w-4 h-4 mr-1" />
              {type.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {filteredStations.map((station) => (
              <Card key={station.id} className="border-gray-200 hover:border-blue-300 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center mb-1">
                        {getStationStatusIcon(station.status)}
                        <span className="ml-2">{station.station}</span>
                      </h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        {station.location}
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <div>Updated: {station.lastUpdate.toLocaleTimeString()}</div>
                      <Badge 
                        variant="outline" 
                        className={`mt-1 ${
                          station.status === 'online' 
                            ? 'border-green-200 text-green-700' 
                            : 'border-red-200 text-red-700'
                        }`}
                      >
                        {station.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {station.data.map((dataPoint, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <dataPoint.icon className="w-4 h-4 mr-2 text-blue-600" />
                            <span className="text-sm font-medium text-gray-700">
                              {dataPoint.label}
                            </span>
                          </div>
                          {getTrendIcon(dataPoint.trend)}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-900">
                            {dataPoint.value}
                          </span>
                          <div className="text-right">
                            <Badge variant="outline" className={getStatusColor(dataPoint.status)}>
                              {dataPoint.status.toUpperCase()}
                            </Badge>
                            <div className="text-xs text-gray-500 mt-1">
                              {dataPoint.change}
                            </div>
                          </div>
                        </div>

                        {/* Progress bar for percentage values */}
                        {dataPoint.unit === '%' && (
                          <Progress 
                            value={dataPoint.numericValue} 
                            className="h-2"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Summary Statistics */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {stationsData.filter(s => s.status === 'online').length}
              </div>
              <div className="text-sm text-gray-600">Active Stations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {stationsData.reduce((acc, station) => acc + station.data.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Data Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {stationsData.reduce((acc, station) => 
                  acc + station.data.filter(d => d.status === 'warning').length, 0
                )}
              </div>
              <div className="text-sm text-gray-600">Warnings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {stationsData.reduce((acc, station) => 
                  acc + station.data.filter(d => d.status === 'danger').length, 0
                )}
              </div>
              <div className="text-sm text-gray-600">Critical</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
