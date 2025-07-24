"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Layers, Zap, Droplets, Mountain, Flame } from "lucide-react"
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Create a separate map component that will only be rendered on the client side
const LeafletMap = dynamic(() => import('./leaflet-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-blue-50 rounded-xl">
      <div className="text-blue-700">Loading map...</div>
    </div>
  )
});

export function InteractiveMap() {
  const [selectedLayer, setSelectedLayer] = useState("all")

  const mapLayers = [
    { id: "all", label: "All Layers", icon: Layers },
    { id: "flood", label: "Flood Risk", icon: Droplets },
    { id: "landslide", label: "Landslide Risk", icon: Mountain },
    { id: "fire", label: "Fire Risk", icon: Flame },
    { id: "energy", label: "Clean Energy", icon: Zap },
  ]

  // Real-time detection: fetch from API (mock example)
  const [riskZones, setRiskZones] = useState([
    // Flood Risk
    { id: 1, type: 'flood', level: 'high', name: 'Metro Manila', position: [14.5995, 120.9842] },
    { id: 2, type: 'flood', level: 'high', name: 'Cagayan Valley', position: [17.6131, 121.7269] },
    { id: 3, type: 'flood', level: 'high', name: 'Pampanga', position: [15.0794, 120.6194] },
    { id: 4, type: 'flood', level: 'high', name: 'Iloilo', position: [10.7202, 122.5621] },
    { id: 5, type: 'flood', level: 'high', name: 'Davao City', position: [7.1907, 125.4553] },
    // Landslide Risk
    { id: 6, type: 'landslide', level: 'medium', name: 'Baguio', position: [16.4023, 120.5960] },
    { id: 7, type: 'landslide', level: 'medium', name: 'Cordillera', position: [17.3516, 121.1719] },
    { id: 8, type: 'landslide', level: 'medium', name: 'Leyte', position: [11.2433, 125.0045] },
    { id: 9, type: 'landslide', level: 'medium', name: 'Zamboanga', position: [6.9214, 122.0790] },
    // Fire Risk
    { id: 10, type: 'fire', level: 'low', name: 'Cebu City', position: [10.3157, 123.8854] },
    { id: 11, type: 'fire', level: 'low', name: 'Quezon City', position: [14.6760, 121.0437] },
    { id: 12, type: 'fire', level: 'low', name: 'Dumaguete', position: [9.3077, 123.3054] },
    { id: 13, type: 'fire', level: 'low', name: 'General Santos', position: [6.1164, 125.1716] },
    // Clean Energy
    { id: 14, type: 'clean', level: 'clean', name: 'Ilocos Norte Wind Farm', position: [18.5056, 120.7472] },
    { id: 15, type: 'clean', level: 'clean', name: 'Bacolod', position: [10.6765, 122.9509] },
    { id: 16, type: 'clean', level: 'clean', name: 'Kidapawan Geothermal', position: [7.0083, 125.0892] },
    { id: 17, type: 'clean', level: 'clean', name: 'Palawan Solar', position: [9.8349, 118.7384] },
  ]);

  useEffect(() => {
    // Replace this with your real API endpoint
    fetch('/api/detections')
      .then(res => res.json())
      .then(data => setRiskZones(data))
      .catch(() => {});
    // For real-time: use WebSocket or polling here
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      case "active":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const [selectedFilter, setSelectedFilter] = useState('all');

  // Update filter when layer changes
  useEffect(() => {
    setSelectedFilter(selectedLayer);
  }, [selectedLayer]);

  const filteredZones = selectedFilter === 'all'
    ? riskZones
    : riskZones.filter(zone => {
        if (selectedFilter === 'energy') return zone.type === 'clean';
        return zone.type === selectedFilter;
      });

  return (
    <Card className="border-blue-200 w-full">
      <CardHeader>
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <CardTitle className="text-blue-900">Interactive GIS Map</CardTitle>
          <div className="flex flex-wrap gap-2">
            {mapLayers.map((layer) => (
              <Button
                key={layer.id}
                variant={selectedLayer === layer.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLayer(layer.id)}
                className={selectedLayer === layer.id ? "bg-blue-600" : "border-blue-200 text-blue-700"}
              >
                <layer.icon className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">{layer.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] rounded-xl overflow-hidden">
          <LeafletMap 
            selectedFilter={selectedFilter}
            filteredZones={filteredZones}
          />
        </div>

        {/* Map Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-blue-200 text-blue-700">
              125 Monitoring Stations
            </Badge>
            <Badge variant="outline" className="border-green-200 text-green-700">
              15 Clean Energy Sites
            </Badge>
          </div>
          <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 bg-transparent">
            Full Screen View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
