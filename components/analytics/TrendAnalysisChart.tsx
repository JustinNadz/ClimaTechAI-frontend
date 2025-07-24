"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DataPoint {
  date: string
  value: number
}

interface TrendAnalysisChartProps {
  title: string
  data: {
    historical: DataPoint[]
    predicted: DataPoint[]
  }
  timeRange: string
  onTimeRangeChange: (value: string) => void
}

const TrendAnalysisChart: React.FC<TrendAnalysisChartProps> = ({
  title,
  data,
  timeRange,
  onTimeRangeChange
}) => {
  // Get min and max values for scaling the chart
  const allValues = [...data.historical.map(d => d.value), ...data.predicted.map(d => d.value)]
  const maxValue = Math.max(...allValues) * 1.1 // Add 10% for padding
  const minValue = Math.min(0, Math.min(...allValues) * 0.9) // Add padding below as well
  
  // Calculate the positions for each point in the chart
  const calculatePosition = (value: number, index: number, array: DataPoint[]) => {
    const x = `${(index / (array.length - 1)) * 100}%`
    const y = `${100 - ((value - minValue) / (maxValue - minValue)) * 100}%`
    return { x, y }
  }
  
  // Generate points for the SVG path
  const generatePath = (points: {x: string, y: string}[]) => {
    if (points.length === 0) return ""
    
    let path = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`
    }
    return path
  }
  
  const historicalPoints = data.historical.map((point, i, arr) => calculatePosition(point.value, i, arr))
  const predictedPoints = data.predicted.map((point, i, arr) => 
    calculatePosition(point.value, i + data.historical.length - 1, 
      [...data.historical.slice(data.historical.length - 1), ...arr]
    )
  )
  
  const historicalPath = generatePath(historicalPoints)
  const predictedPath = generatePath([historicalPoints[historicalPoints.length - 1], ...predictedPoints])
  
  return (
    <Card className="w-full border-gray-200 hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-gray-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          {title}
        </CardTitle>
        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="w-[150px] border-gray-200">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 w-full">
          {/* Chart area */}
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
            {/* Y-axis grid lines */}
            {[0, 20, 40, 60, 80, 100].map(percent => (
              <line 
                key={`grid-${percent}`}
                x1="0%" 
                y1={`${percent}%`} 
                x2="100%" 
                y2={`${percent}%`}
                stroke="#f1f5f9" 
                strokeWidth="1" 
              />
            ))}
            
            {/* Historical data line */}
            <path 
              d={historicalPath} 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="2"
              strokeLinecap="round" 
            />
            
            {/* Historical data points */}
            {historicalPoints.map((point, i) => (
              <circle 
                key={`historical-${i}`}
                cx={point.x} 
                cy={point.y} 
                r="3" 
                fill="#3b82f6" 
                className="hover:r-4 transition-all cursor-pointer"
              />
            ))}
            
            {/* Prediction data line (dashed) */}
            <path 
              d={predictedPath} 
              fill="none" 
              stroke="#f97316" 
              strokeWidth="2"
              strokeDasharray="4 2"
              strokeLinecap="round" 
            />
            
            {/* Prediction data points */}
            {predictedPoints.map((point, i) => (
              <circle 
                key={`prediction-${i}`}
                cx={point.x} 
                cy={point.y} 
                r="3" 
                fill="#f97316" 
                className="hover:r-4 transition-all cursor-pointer"
              />
            ))}
            
            {/* Divider between historical and prediction */}
            <line 
              x1={historicalPoints[historicalPoints.length - 1].x} 
              y1="0%" 
              x2={historicalPoints[historicalPoints.length - 1].x} 
              y2="100%"
              stroke="#cbd5e1" 
              strokeWidth="1" 
              strokeDasharray="4 2" 
            />
          </svg>
          
          {/* Legend */}
          <div className="absolute top-0 right-0 bg-white bg-opacity-90 p-2 rounded-md text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span>Historical Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-orange-500 border-b border-dashed border-orange-500"></div>
              <span>Predicted Data</span>
            </div>
          </div>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
            <div>{Math.round(maxValue)}</div>
            <div>{Math.round((maxValue + minValue) / 2)}</div>
            <div>{Math.round(minValue)}</div>
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 px-2">
            <div>{data.historical[0]?.date || ''}</div>
            <div>Today</div>
            <div>{data.predicted[data.predicted.length - 1]?.date || ''}</div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-gray-500">
          Current prediction confidence: 
          <span className="font-semibold text-blue-600 ml-1">94%</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default TrendAnalysisChart 