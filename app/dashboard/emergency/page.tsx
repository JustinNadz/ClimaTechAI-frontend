"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Phone,
  MapPin,
  Users,
  Radio,
  Send,
  Shield,
  Siren,
  Navigation,
  Building,
  Heart,
  Flame,
  Droplets,
  Mountain,
} from "lucide-react"

export default function EmergencyProtocolsPage() {
  const [selectedProtocol, setSelectedProtocol] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])

  const emergencyContacts = [
    { name: "NDRRMC Operations Center", number: "911", type: "primary", status: "active" },
    { name: "Bureau of Fire Protection", number: "116", type: "fire", status: "active" },
    { name: "Philippine Red Cross", number: "143", type: "medical", status: "active" },
    { name: "MMDA Flood Control", number: "136", type: "flood", status: "active" },
    { name: "PHIVOLCS Earthquake Monitoring", number: "(02) 8426-1468", type: "seismic", status: "active" },
    { name: "Meralco Emergency Hotline", number: "16211", type: "power", status: "active" },
  ]

  const evacuationCenters = [
    {
      name: "Quezon City Sports Club",
      address: "Timog Avenue, Quezon City",
      capacity: 2500,
      currentOccupancy: 0,
      facilities: ["Medical Station", "Kitchen", "Restrooms", "Communications"],
      status: "ready",
      contact: "(02) 8924-4444",
    },
    {
      name: "Marikina Sports Center",
      address: "Shoe Avenue, Marikina City",
      capacity: 3000,
      currentOccupancy: 150,
      facilities: ["Medical Station", "Kitchen", "Restrooms", "Generators"],
      status: "active",
      contact: "(02) 8646-2436",
    },
    {
      name: "Pasig City Hall Gymnasium",
      address: "Caruncho Avenue, Pasig City",
      capacity: 1800,
      currentOccupancy: 0,
      facilities: ["Medical Station", "Kitchen", "Restrooms"],
      status: "ready",
      contact: "(02) 8643-0000",
    },
  ]

  const responseTeams = [
    {
      name: "Metro Manila Rescue Team Alpha",
      type: "Search & Rescue",
      personnel: 12,
      equipment: ["Thermal Drones", "Rescue Boats", "Medical Kits"],
      status: "standby",
      location: "Quezon City Fire Station",
      contact: "Team Leader: Capt. Santos",
    },
    {
      name: "MMDA Quick Response Team",
      type: "Traffic & Evacuation",
      personnel: 8,
      equipment: ["Emergency Vehicles", "Traffic Cones", "Megaphones"],
      status: "active",
      location: "EDSA Central",
      contact: "Team Leader: Lt. Cruz",
    },
    {
      name: "Philippine Red Cross Medical Team",
      type: "Medical Response",
      personnel: 15,
      equipment: ["Ambulances", "Medical Supplies", "First Aid Kits"],
      status: "standby",
      location: "Red Cross Chapter",
      contact: "Team Leader: Dr. Reyes",
    },
  ]

  const protocolTemplates = [
    {
      id: "flood-warning",
      name: "Flood Warning Protocol",
      type: "flood",
      description: "Immediate flood warning and evacuation procedures",
      steps: [
        "Issue flood warning alert to affected barangays",
        "Activate evacuation centers in safe zones",
        "Deploy rescue teams to flood-prone areas",
        "Coordinate with LGUs for transportation",
        "Monitor water levels and weather conditions",
      ],
    },
    {
      id: "earthquake-response",
      name: "Earthquake Response Protocol",
      type: "earthquake",
      description: "Post-earthquake assessment and rescue operations",
      steps: [
        "Assess structural damage in affected areas",
        "Deploy search and rescue teams",
        "Establish medical triage centers",
        "Coordinate with PHIVOLCS for aftershock monitoring",
        "Activate emergency communication systems",
      ],
    },
    {
      id: "fire-emergency",
      name: "Fire Emergency Protocol",
      type: "fire",
      description: "Wildfire and urban fire response procedures",
      steps: [
        "Alert Bureau of Fire Protection",
        "Evacuate residents from fire zones",
        "Deploy firefighting equipment and personnel",
        "Establish firebreaks and safety perimeters",
        "Monitor air quality and smoke dispersion",
      ],
    },
  ]

  const messageTemplates = [
    {
      type: "flood",
      template:
        "FLOOD WARNING: Heavy rainfall detected in [LOCATION]. Water levels rising rapidly. Residents in low-lying areas advised to evacuate immediately to designated evacuation centers. For assistance, call 911.",
    },
    {
      type: "earthquake",
      template:
        "EARTHQUAKE ALERT: Magnitude [MAG] earthquake detected at [TIME]. Check for injuries and structural damage. Stay away from damaged buildings. Aftershocks expected. Emergency services activated.",
    },
    {
      type: "fire",
      template:
        "FIRE ALERT: Wildfire reported in [LOCATION]. Residents in affected areas must evacuate immediately. Follow designated evacuation routes. Air quality may be hazardous.",
    },
    {
      type: "power",
      template:
        "POWER OUTAGE ALERT: Widespread power outage affecting [AREA]. Estimated restoration time: [TIME]. Emergency generators activated for critical facilities. Conserve mobile phone battery.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "standby":
        return "bg-yellow-100 text-yellow-800"
      case "ready":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flood":
        return <Droplets className="w-4 h-4" />
      case "fire":
        return <Flame className="w-4 h-4" />
      case "earthquake":
        return <Mountain className="w-4 h-4" />
      case "medical":
        return <Heart className="w-4 h-4" />
      case "power":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Emergency Protocols</h1>
            <p className="text-gray-600 mt-1">Coordinated emergency response and disaster management protocols</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all transform hover:scale-105 shadow-md">
              <Siren className="w-4 h-4 mr-2" />
              Emergency Broadcast
            </Button>
            <Button variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50">
              <Radio className="w-4 h-4 mr-2" />
              Communication Test
            </Button>
          </div>
        </div>

        {/* Emergency Protocols Tabs */}
        <Tabs defaultValue="protocols" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-50">
            <TabsTrigger value="protocols" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              Response Protocols
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              Emergency Contacts
            </TabsTrigger>
            <TabsTrigger value="evacuation" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              Evacuation Centers
            </TabsTrigger>
            <TabsTrigger value="teams" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              Response Teams
            </TabsTrigger>
            <TabsTrigger value="messaging" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              Alert Messaging
            </TabsTrigger>
          </TabsList>

          {/* Response Protocols Tab */}
          <TabsContent value="protocols" className="space-y-6">
            <div className="grid gap-6">
              {protocolTemplates.map((protocol) => (
                <Card key={protocol.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <CardTitle className="text-gray-900 flex items-center">
                          {getTypeIcon(protocol.type)}
                          <span className="ml-2">{protocol.name}</span>
                        </CardTitle>
                        <p className="text-gray-600 text-sm mt-1">{protocol.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setSelectedProtocol(protocol.id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all transform hover:scale-105 shadow-md"
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Activate Protocol
                        </Button>
                        <Button variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Protocol Steps:</h4>
                      <div className="space-y-2">
                        {protocol.steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <span className="text-sm text-gray-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Emergency Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {emergencyContacts.map((contact, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <p className="text-2xl font-bold text-gray-700">{contact.number}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex-1 transition-all transform hover:scale-105 shadow-md">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-200 text-gray-700 flex-1 bg-transparent hover:bg-gray-50"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Alert
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Evacuation Centers Tab */}
          <TabsContent value="evacuation" className="space-y-6">
            <div className="grid gap-6">
              {evacuationCenters.map((center, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <CardTitle className="text-gray-900 flex items-center">
                          <Building className="w-5 h-5 mr-2" />
                          {center.name}
                        </CardTitle>
                        <p className="text-gray-600 text-sm mt-1 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {center.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(center.status)}>{center.status.toUpperCase()}</Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {center.currentOccupancy}/{center.capacity}
                          </div>
                          <div className="text-xs text-gray-600">Occupancy</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-lg font-bold text-gray-900">{center.capacity}</div>
                        <div className="text-xs text-gray-600">Total Capacity</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-lg font-bold text-gray-900">{center.currentOccupancy}</div>
                        <div className="text-xs text-gray-600">Current Occupancy</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <div className="text-lg font-bold text-gray-900">
                          {center.capacity - center.currentOccupancy}
                        </div>
                        <div className="text-xs text-gray-600">Available Space</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Available Facilities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {center.facilities.map((facility, facilityIndex) => (
                          <Badge key={facilityIndex} variant="outline" className="border-gray-200 text-gray-700">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium">Contact: {center.contact}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white flex-1 transition-all transform hover:scale-105 shadow-md">
                        <Users className="w-4 h-4 mr-2" />
                        Activate Center
                      </Button>
                      <Button variant="outline" className="border-gray-200 text-gray-700 flex-1 bg-transparent hover:bg-gray-50">
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Response Teams Tab */}
          <TabsContent value="teams" className="space-y-6">
            <div className="grid gap-6">
              {responseTeams.map((team, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div>
                        <CardTitle className="text-gray-900 flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          {team.name}
                        </CardTitle>
                        <p className="text-gray-600 text-sm mt-1">{team.type}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(team.status)}>{team.status.toUpperCase()}</Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{team.personnel}</div>
                          <div className="text-xs text-gray-600">Personnel</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">Location</span>
                        </div>
                        <div className="text-sm text-gray-700">{team.location}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">Contact</span>
                        </div>
                        <div className="text-sm text-gray-700">{team.contact}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Equipment & Resources:</h4>
                      <div className="flex flex-wrap gap-2">
                        {team.equipment.map((item, itemIndex) => (
                          <Badge key={itemIndex} variant="outline" className="border-gray-200 text-gray-700">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex-1 transition-all transform hover:scale-105 shadow-md">
                        <Radio className="w-4 h-4 mr-2" />
                        Deploy Team
                      </Button>
                      <Button variant="outline" className="border-gray-200 text-gray-700 flex-1 bg-transparent hover:bg-gray-50">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Team
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Alert Messaging Tab */}
          <TabsContent value="messaging" className="space-y-6">
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-gray-900">Emergency Alert System</CardTitle>
                <p className="text-gray-600 text-sm">Send coordinated alerts to multiple agencies and the public</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">Alert Type</label>
                      <Select>
                        <SelectTrigger className="border-gray-200">
                          <SelectValue placeholder="Select alert type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flood">Flood Warning</SelectItem>
                          <SelectItem value="earthquake">Earthquake Alert</SelectItem>
                          <SelectItem value="fire">Fire Emergency</SelectItem>
                          <SelectItem value="power">Power Outage</SelectItem>
                          <SelectItem value="typhoon">Typhoon Warning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">Affected Area</label>
                      <Input placeholder="Enter location or area" className="border-gray-200" />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">Severity Level</label>
                      <Select>
                        <SelectTrigger className="border-gray-200">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Advisory</SelectItem>
                          <SelectItem value="medium">Medium - Watch</SelectItem>
                          <SelectItem value="high">High - Warning</SelectItem>
                          <SelectItem value="critical">Critical - Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">Recipients</label>
                      <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                        {[
                          "NDRRMC",
                          "Local Government Units",
                          "Bureau of Fire Protection",
                          "Philippine Red Cross",
                          "MMDA",
                          "Power Companies",
                          "Public Broadcasting",
                        ].map((recipient) => (
                          <label key={recipient} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-sm">{recipient}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">Alert Message</label>
                  <Textarea
                    placeholder="Enter emergency alert message..."
                    className="border-gray-200 min-h-[120px]"
                    value={alertMessage}
                    onChange={(e) => setAlertMessage(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Message Templates:</h4>
                  <div className="grid gap-3">
                    {messageTemplates.map((template, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(template.type)}
                            <span className="font-medium text-gray-900 capitalize">{template.type} Alert</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setAlertMessage(template.template)}
                            className="border-gray-200 text-gray-700 hover:bg-gray-50"
                          >
                            Use Template
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">{template.template}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex-1 transition-all transform hover:scale-105 shadow-md">
                    <Siren className="w-4 h-4 mr-2" />
                    Send Emergency Alert
                  </Button>
                  <Button variant="outline" className="border-gray-200 text-gray-700 flex-1 bg-transparent hover:bg-gray-50">
                    <Send className="w-4 h-4 mr-2" />
                    Schedule Alert
                  </Button>
                  <Button variant="outline" className="border-gray-200 text-gray-700 flex-1 bg-transparent hover:bg-gray-50">
                    Preview Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
