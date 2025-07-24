"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter, X, ChevronDown, ChevronUp, Save } from "lucide-react"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

interface FilterOption {
  id: string
  name: string
  type: 'select' | 'multiSelect' | 'range' | 'toggle'
  options?: {
    value: string
    label: string
  }[]
  min?: number
  max?: number
  step?: number
}

interface FilterState {
  [key: string]: any
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    region: 'all',
    riskTypes: ['flood', 'landslide'],
    confidenceThreshold: 75,
    probabilityRange: [30, 100],
    showHistorical: true
  })
  
  // Available filter options
  const filterOptions: FilterOption[] = [
    {
      id: 'region',
      name: 'Region',
      type: 'select',
      options: [
        { value: 'all', label: 'All Regions' },
        { value: 'metro-manila', label: 'Metro Manila' },
        { value: 'central-luzon', label: 'Central Luzon' },
        { value: 'calabarzon', label: 'CALABARZON' },
        { value: 'bicol', label: 'Bicol Region' },
      ]
    },
    {
      id: 'riskTypes',
      name: 'Risk Types',
      type: 'multiSelect',
      options: [
        { value: 'flood', label: 'Flood' },
        { value: 'landslide', label: 'Landslide' },
        { value: 'typhoon', label: 'Typhoon' },
        { value: 'power', label: 'Power Outage' },
      ]
    },
    {
      id: 'confidenceThreshold',
      name: 'Min. Confidence',
      type: 'range',
      min: 0,
      max: 100,
      step: 5
    },
    {
      id: 'probabilityRange',
      name: 'Probability Range',
      type: 'range',
      min: 0,
      max: 100,
      step: 5
    },
    {
      id: 'showHistorical',
      name: 'Show Historical Data',
      type: 'toggle'
    }
  ]
  
  // Handle change for any filter
  const handleFilterChange = (id: string, value: any) => {
    const newFilters = { ...activeFilters, [id]: value }
    setActiveFilters(newFilters)
    onFiltersChange(newFilters)
  }
  
  // Remove a single multi-select value
  const handleRemoveMultiValue = (id: string, valueToRemove: string) => {
    const currentValues = activeFilters[id] || []
    const newValues = currentValues.filter((v: string) => v !== valueToRemove)
    handleFilterChange(id, newValues)
  }
  
  // Reset all filters
  const handleResetFilters = () => {
    const defaultFilters = {
      region: 'all',
      riskTypes: ['flood', 'landslide', 'typhoon', 'power'],
      confidenceThreshold: 0,
      probabilityRange: [0, 100],
      showHistorical: true
    }
    setActiveFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }
  
  // Save current filter configuration
  const handleSaveFilters = () => {
    // In a real implementation, this would save to user preferences
    alert('Filter configuration saved')
  }
  
  // Get the label for a specific value
  const getOptionLabel = (filterId: string, value: string) => {
    const option = filterOptions.find(opt => opt.id === filterId)
    if (!option?.options) return value
    const found = option.options.find(opt => opt.value === value)
    return found?.label || value
  }
  
  // Render filter input based on type
  const renderFilterInput = (filter: FilterOption) => {
    const value = activeFilters[filter.id]
    
    switch (filter.type) {
      case 'select':
        return (
          <Select 
            value={value} 
            onValueChange={(val) => handleFilterChange(filter.id, val)}
          >
            <SelectTrigger className="w-full border-gray-200">
              <SelectValue placeholder={`Select ${filter.name}`} />
            </SelectTrigger>
            <SelectContent>
              {filter.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case 'multiSelect':
        return (
          <div>
            <Select 
              onValueChange={(val) => {
                const currentValues = activeFilters[filter.id] || []
                if (!currentValues.includes(val)) {
                  handleFilterChange(filter.id, [...currentValues, val])
                }
              }}
            >
              <SelectTrigger className="w-full border-gray-200">
                <SelectValue placeholder={`Select ${filter.name}`} />
              </SelectTrigger>
              <SelectContent>
                {filter.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {(value || []).map((val: string) => (
                <Badge 
                  key={val} 
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 pl-2 pr-1 py-1 flex items-center gap-1"
                >
                  {getOptionLabel(filter.id, val)}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-4 w-4 p-0 rounded-full hover:bg-blue-100"
                    onClick={() => handleRemoveMultiValue(filter.id, val)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )
        
      case 'range':
        if (Array.isArray(value)) {
          // Range slider (min/max)
          return (
            <div className="space-y-4">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Min: {value[0]}</span>
                <span>Max: {value[1]}</span>
              </div>
              <Slider
                defaultValue={value}
                min={filter.min}
                max={filter.max}
                step={filter.step}
                onValueChange={(val) => handleFilterChange(filter.id, val)}
              />
            </div>
          )
        } else {
          // Single value slider
          return (
            <div className="space-y-4">
              <div className="flex justify-between text-xs text-gray-500">
                <span>{filter.name}</span>
                <span>{value}%</span>
              </div>
              <Slider
                defaultValue={[value]}
                min={filter.min}
                max={filter.max}
                step={filter.step}
                onValueChange={([val]) => handleFilterChange(filter.id, val)}
              />
            </div>
          )
        }
        
      case 'toggle':
        return (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">{filter.name}</span>
            <Switch 
              checked={value}
              onCheckedChange={(checked) => handleFilterChange(filter.id, checked)}
            />
          </div>
        )
        
      default:
        return null
    }
  }
  
  return (
    <Card className="w-full border-gray-200 hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between py-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="text-gray-900 flex items-center text-base">
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
          <Badge variant="outline" className="ml-2 text-xs">
            {Object.keys(activeFilters).length} Active
          </Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {filterOptions.map(filter => (
              <div key={filter.id} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {filter.name}
                </label>
                {renderFilterInput(filter)}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between pt-4 border-t border-gray-100">
            <Button 
              variant="outline" 
              size="sm"
              className="text-gray-700 border-gray-200"
              onClick={handleResetFilters}
            >
              <X className="w-4 h-4 mr-2" /> Reset All
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={handleSaveFilters}
            >
              <Save className="w-4 h-4 mr-2" /> Save Configuration
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default AdvancedFilters 