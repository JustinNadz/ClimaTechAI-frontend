"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

// CSS keyframes for animations
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes ping {
    75%, 100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  .animate-ping {
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
`

interface RiskLocation {
  id: string
  name: string
  lat: number
  lng: number
  riskLevel: 'low' | 'medium' | 'high'
  riskType: 'flood' | 'landslide' | 'power' | 'typhoon'
  probability: number
}

interface RiskMapProps {
  locations: RiskLocation[]
  activeRiskType: string
  onLocationClick?: (location: RiskLocation | null) => void
}

const riskColorMap: Record<string, string> = {
  low: '#4ade80', // green-400
  medium: '#facc15', // yellow-400
  high: '#ef4444', // red-500
}

const riskTypeIcons: Record<string, React.ReactNode> = {
  flood: (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  ),
  landslide: (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 9L12 2 2 9h9v13h2V9z" />
    </svg>
  ),
  power: (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2v11h3v9l7-12h-4l3-8z" />
    </svg>
  ),
  typhoon: (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
    </svg>
  ),
}

export const RiskMapVisualization: React.FC<RiskMapProps> = ({
  locations,
  activeRiskType,
  onLocationClick,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<RiskLocation | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  
  // Handle location selection
  const handleLocationClick = (location: RiskLocation) => {
    setSelectedLocation(location)
    if (onLocationClick) {
      onLocationClick(location)
    }
  }
  
  // Handle closing the location info panel
  const handleCloseLocation = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedLocation(null)
    if (onLocationClick) {
      onLocationClick(null)
    }
  }
  
  useEffect(() => {
    // This would be where we initialize the map with a real mapping library
    // For now, we'll create a simple visualization
    const loadMap = () => {
      if (mapRef.current) {
        console.log("Map would load here with real implementation")
      }
    }

    loadMap()
    
    return () => {
      // Cleanup map instance if needed
    }
  }, [])
  
  useEffect(() => {
    // Update markers when locations or active risk type changes
    if (locations && mapInstanceRef.current) {
      // Clear existing markers
      markersRef.current.forEach(marker => {
        // Remove marker from map
      })
      markersRef.current = []
      
      // Add new markers
      const filteredLocations = activeRiskType === 'all' 
        ? locations 
        : locations.filter(loc => loc.riskType === activeRiskType)
      
      filteredLocations.forEach(location => {
        // Create marker for each location
        console.log(`Would create marker for ${location.name}`)
      })
    }
  }, [locations, activeRiskType])
  
  return (
    <>
      <style jsx global>{animationStyles}</style>
      <Card className="w-full border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-gray-900 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Risk Map Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            {/* Placeholder map UI */}
            <div 
              ref={mapRef}
              className="bg-gray-100 w-full h-[400px] flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-slate-100 bg-opacity-30">
                {/* Enhanced Philippines map SVG with islands */}
                <svg 
                  viewBox="0 0 500 600" 
                  className="w-full h-full text-blue-100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Ocean background */}
                  <rect x="0" y="0" width="500" height="600" fill="#f0f9ff" />
                  
                  {/* Grid lines */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <line 
                      key={`grid-h-${i}`} 
                      x1="0" 
                      y1={i * 60} 
                      x2="500" 
                      y2={i * 60} 
                      stroke="#e0f2fe" 
                      strokeWidth="1" 
                    />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line 
                      key={`grid-v-${i}`} 
                      x1={i * 60} 
                      y1="0" 
                      x2={i * 60} 
                      y2="600" 
                      stroke="#e0f2fe" 
                      strokeWidth="1" 
                    />
                  ))}
                  
                  {/* Main Luzon island */}
                  <path 
                    d="M180,100 Q250,80 320,120 Q350,150 370,200 Q390,260 370,330 Q340,400 280,450 Q220,490 150,460 Q100,430 80,370 Q60,300 90,240 Q130,170 180,100 Z" 
                    fill="#e0f2fe" 
                    stroke="#0284c7" 
                    strokeWidth="2"
                  />
                  
                  {/* Visayas islands */}
                  <path 
                    d="M320,350 Q350,340 380,360 Q400,380 390,410 Q370,430 340,420 Q320,410 310,390 Q305,370 320,350 Z" 
                    fill="#e0f2fe" 
                    stroke="#0284c7" 
                    strokeWidth="2"
                  />
                  <path 
                    d="M400,380 Q430,370 460,390 Q480,410 470,440 Q450,460 420,450 Q400,440 390,410 Q395,390 400,380 Z" 
                    fill="#e0f2fe" 
                    stroke="#0284c7" 
                    strokeWidth="2"
                  />
                  
                  {/* Mindanao island */}
                  <path 
                    d="M380,450 Q440,440 480,480 Q510,520 490,560 Q450,590 400,570 Q350,540 340,500 Q350,460 380,450 Z" 
                    fill="#e0f2fe" 
                    stroke="#0284c7" 
                    strokeWidth="2"
                  />
                  
                  {/* Water details */}
                  <circle cx="250" cy="300" r="5" fill="#bae6fd" opacity="0.7" />
                  <circle cx="270" cy="320" r="3" fill="#bae6fd" opacity="0.7" />
                  <circle cx="230" cy="310" r="4" fill="#bae6fd" opacity="0.7" />
                  
                  {/* City markers */}
                  <circle cx="230" cy="200" r="3" fill="#0284c7" />
                  <text x="240" y="205" fontSize="10" fill="#0284c7">Manila</text>
                  <circle cx="150" cy="350" r="2" fill="#0284c7" />
                  <text x="160" y="355" fontSize="8" fill="#0284c7">Cebu</text>
                  <circle cx="430" cy="520" r="2" fill="#0284c7" />
                  <text x="440" y="525" fontSize="8" fill="#0284c7">Davao</text>
                </svg>
                
                {/* Risk location indicators */}
                {locations
                  .filter(loc => activeRiskType === 'all' || loc.riskType === activeRiskType)
                  .map((location) => (
                    <div 
                      key={location.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{
                        // Use deterministic positioning based on id to avoid hydration errors
                        top: `${100 + parseInt(location.id) * 40}px`,
                        left: `${100 + (parseInt(location.id) * 60) % 300}px`,
                      }}
                      onClick={() => handleLocationClick(location)}
                    >
                      {/* Ripple effect */}
                      <div className="absolute w-12 h-12 -left-6 -top-6 rounded-full animate-ping opacity-30"
                        style={{ backgroundColor: riskColorMap[location.riskLevel] }}>
                      </div>
                      
                      {/* Main marker */}
                      <div className="absolute w-6 h-6 -left-3 -top-3 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10"
                        style={{ backgroundColor: riskColorMap[location.riskLevel] }}>
                        {location.riskLevel === 'high' && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        )}
                        {riskTypeIcons[location.riskType] && location.riskLevel !== 'high' && (
                          <span className="text-white">
                            {riskTypeIcons[location.riskType]}
                          </span>
                        )}
                      </div>
                      
                      {/* Location name tooltip */}
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-2 rounded-md shadow-md text-xs whitespace-nowrap z-20 pointer-events-none">
                        <div className="font-medium">{location.name}</div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: riskColorMap[location.riskLevel] }}></span>
                          <span className="capitalize">{location.riskLevel} Risk ({location.probability}%)</span>
                        </div>
                        <div className="capitalize text-gray-500">{location.riskType} Risk</div>
                      </div>
                    </div>
                  ))
                }
              </div>
              
              {!locations.filter(loc => activeRiskType === 'all' || loc.riskType === activeRiskType).length && (
                <div className="text-gray-400 text-center z-10">
                  <p>No risk locations to display</p>
                  <p className="text-sm">Try selecting a different risk type</p>
                </div>
              )}
              
              {/* Selected location info */}
              {selectedLocation && (
                <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg z-30 max-w-xs border-l-4 animate-fadeIn" 
                  style={{ borderLeftColor: riskColorMap[selectedLocation.riskLevel] }}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-gray-900">{selectedLocation.name}</h4>
                    <button 
                      className="text-gray-400 hover:text-gray-600" 
                      onClick={handleCloseLocation}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Risk Type:</span>
                      <span className="font-medium capitalize">{selectedLocation.riskType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Risk Level:</span>
                      <span className={`font-medium capitalize ${
                        selectedLocation.riskLevel === 'high' ? 'text-red-600' : 
                        selectedLocation.riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {selectedLocation.riskLevel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Probability:</span>
                      <span className="font-medium">{selectedLocation.probability}%</span>
                    </div>
                    <div className="pt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{ 
                            width: `${selectedLocation.probability}%`,
                            backgroundColor: riskColorMap[selectedLocation.riskLevel]
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="pt-2">
                      <button className="w-full py-1 px-2 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
                        View Detailed Analysis
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Map legend */}
              <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg z-20 overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-100">
                  <div className="text-sm font-semibold text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Risk Legend
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center border-2 border-white shadow-sm">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-medium">High Risk</span>
                      <div className="text-xs text-gray-500">80-100% probability</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-white shadow-sm"></div>
                    <div>
                      <span className="text-xs font-medium">Medium Risk</span>
                      <div className="text-xs text-gray-500">40-79% probability</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center border-2 border-white shadow-sm"></div>
                    <div>
                      <span className="text-xs font-medium">Low Risk</span>
                      <div className="text-xs text-gray-500">0-39% probability</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 text-xs text-gray-500">
            Note: This is a simplified visualization. In a production environment, this would be integrated with mapping libraries like Mapbox, Google Maps, or Leaflet.
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default RiskMapVisualization 