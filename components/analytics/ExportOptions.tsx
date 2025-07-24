"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Share2, 
  Download, 
  Mail, 
  Calendar, 
  Printer, 
  FileText,
  Image as ImageIcon,
  ChevronDown,
  CheckSquare
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

interface ExportOptionsProps {
  onExport?: (format: string) => void
  onShare?: (method: string) => void
  onSchedule?: (schedule: any) => void
}

const ExportOptions: React.FC<ExportOptionsProps> = ({
  onExport,
  onShare,
  onSchedule
}) => {
  const [selectedItems, setSelectedItems] = useState([
    'flood',
    'landslide'
  ])
  
  const exportItems = [
    { id: 'flood', name: 'Flood Risk Predictions' },
    { id: 'landslide', name: 'Landslide Risk Predictions' },
    { id: 'power', name: 'Power Outage Predictions' },
    { id: 'typhoon', name: 'Typhoon Tracking' },
    { id: 'overview', name: 'AI Model Performance' },
  ]

  const handleToggleItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }
  
  const handleExport = (format: string) => {
    // In a real app, this would trigger the actual export
    if (onExport) onExport(format)
    console.log(`Exporting ${selectedItems.join(', ')} as ${format}`)
  }

  const handleShare = (method: string) => {
    if (onShare) onShare(method)
    console.log(`Sharing via ${method}`)
  }

  const handleSchedule = () => {
    if (onSchedule) onSchedule({
      frequency: 'daily',
      time: '08:00',
      items: selectedItems
    })
    console.log('Scheduling report')
  }

  return (
    <Card className="w-full border-gray-200 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-gray-900 flex items-center">
          <Share2 className="w-5 h-5 mr-2" />
          Export & Share
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">Include in Export:</div>
          <div className="space-y-2">
            {exportItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Button 
                    variant="ghost"
                    size="sm"
                    className={`p-1 ${selectedItems.includes(item.id) ? 'text-blue-600' : 'text-gray-400'}`}
                    onClick={() => handleToggleItem(item.id)}
                  >
                    <CheckSquare className="w-5 h-5" />
                  </Button>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Export Options:</div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-200 text-gray-700"
              onClick={() => handleExport('pdf')}
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF Report
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-200 text-gray-700"
              onClick={() => handleExport('csv')}
            >
              <Download className="w-4 h-4 mr-2" />
              CSV Data
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-200 text-gray-700"
              onClick={() => handleExport('image')}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              PNG Image
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-200 text-gray-700"
              onClick={() => handleExport('print')}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Share Options:</div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-200 text-gray-700"
              onClick={() => handleShare('email')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Report
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-200 text-gray-700"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Link <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleShare('copy')}>
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare('slack')}>
                  Share to Slack
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare('teams')}>
                  Share to Teams
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 pt-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Reports
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Schedule Automated Reports</h4>
                <p className="text-sm text-gray-500">
                  Set up recurring reports to be sent automatically to your email
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <label className="text-sm" htmlFor="frequency">Daily</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <Switch id="frequency" defaultChecked />
                    <span className="text-xs text-gray-500">at 08:00 AM</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <label className="text-sm" htmlFor="weekly">Weekly</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <Switch id="weekly" />
                    <span className="text-xs text-gray-500">on Mondays</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <label className="text-sm" htmlFor="monthly">Monthly</label>
                  <div className="col-span-2 flex items-center gap-2">
                    <Switch id="monthly" />
                    <span className="text-xs text-gray-500">on the 1st</span>
                  </div>
                </div>
              </div>
              <Button size="sm" onClick={handleSchedule}>
                Save Schedule
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  )
}

export default ExportOptions 