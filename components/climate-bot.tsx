"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Bot, Send, MapPin, AlertTriangle, Zap, 
  Thermometer, Droplets, Wind, Activity,
  Satellite, Navigation2, Search
} from "lucide-react"

interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  mapData?: {
    lat: number
    lng: number
    zoom: number
    markers?: Array<{
      lat: number
      lng: number
      type: string
      severity: string
      title: string
    }>
  }
  weatherData?: {
    location: string
    temperature: number
    humidity: number
    windSpeed: number
    rainfall: number
    forecast: string
  }
}

interface ClimateBotProps {
  onMapUpdate?: (mapData: any) => void
  currentDetections?: any[]
}

export function ClimateBot({ onMapUpdate, currentDetections = [] }: ClimateBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "🌏 Hello! I'm ClimateBot, your AI climate intelligence assistant. I can help you explore weather data, analyze risks, and navigate the climate map. Try asking me about flood risks, weather in specific areas, or say 'show me typhoon threats'!",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Enhanced AI response logic
  const generateBotResponse = async (userInput: string): Promise<ChatMessage> => {
    const input = userInput.toLowerCase()
    
    // Location-based queries
    if (input.includes('manila') || input.includes('metro manila')) {
      const manilaData = currentDetections.find(d => d.title?.includes('Manila'))
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `📍 **Metro Manila Climate Status:**\n\n${manilaData ? 
          `🚨 **Active Alert:** ${manilaData.title}\n${manilaData.description}\n\n**Severity:** ${manilaData.severity}\n**Confidence:** ${manilaData.confidence}%` : 
          '✅ No active alerts detected'}\n\n**Current Conditions:**\n🌡️ Temperature: 28.5°C\n💧 Humidity: 78%\n💨 Wind: 15 km/h\n🌧️ Rainfall: 12mm/hr\n\nWould you like me to show this area on the map?`,
        timestamp: new Date(),
        mapData: {
          lat: 14.5995,
          lng: 120.9842,
          zoom: 11,
          markers: manilaData ? [{
            lat: manilaData.lat,
            lng: manilaData.lng,
            type: manilaData.type,
            severity: manilaData.severity,
            title: manilaData.title
          }] : []
        },
        weatherData: {
          location: 'Metro Manila',
          temperature: 28.5,
          humidity: 78,
          windSpeed: 15,
          rainfall: 12,
          forecast: 'Partly cloudy with intermittent showers'
        }
      }
    }

    // Flood-related queries
    if (input.includes('flood') || input.includes('flooding')) {
      const floodDetections = currentDetections.filter(d => d.type === 'flood')
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `🌊 **Flood Risk Analysis:**\n\n**Active Flood Alerts:** ${floodDetections.length}\n\n${floodDetections.map((d, i) => 
          `${i + 1}. **${d.title}**\n   📍 ${d.description}\n   🚨 Severity: ${d.severity}\n   🎯 Confidence: ${d.confidence}%\n`
        ).join('\n')}\n\n**Recommendations:**\n• Monitor water levels in low-lying areas\n• Prepare emergency evacuation routes\n• Stay updated with local authorities\n\nShall I display all flood-risk areas on the map?`,
        timestamp: new Date(),
        mapData: {
          lat: 12.8797,
          lng: 121.7740,
          zoom: 6,
          markers: floodDetections.map(d => ({
            lat: d.lat,
            lng: d.lng,
            type: d.type,
            severity: d.severity,
            title: d.title
          }))
        }
      }
    }

    // Typhoon/Storm queries
    if (input.includes('typhoon') || input.includes('storm') || input.includes('hurricane')) {
      const stormDetections = currentDetections.filter(d => d.type === 'storm')
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `🌪️ **Typhoon Monitoring System:**\n\n**Active Storm Systems:** ${stormDetections.length}\n\n${stormDetections.map((d, i) => 
          `${i + 1}. **${d.title}**\n   🎯 Location: ${d.description}\n   💨 Intensity: ${d.severity}\n   📊 Tracking Confidence: ${d.confidence}%\n   🏠 Affected Area: ${d.affectedArea} km²\n`
        ).join('\n')}\n\n**Safety Measures:**\n• Secure loose objects outdoors\n• Stock emergency supplies\n• Monitor evacuation advisories\n• Stay indoors during peak winds\n\nWould you like to see the storm path visualization?`,
        timestamp: new Date(),
        mapData: {
          lat: stormDetections[0]?.lat || 12.8797,
          lng: stormDetections[0]?.lng || 121.7740,
          zoom: 8,
          markers: stormDetections.map(d => ({
            lat: d.lat,
            lng: d.lng,
            type: d.type,
            severity: d.severity,
            title: d.title
          }))
        }
      }
    }

    // Fire risk queries
    if (input.includes('fire') || input.includes('wildfire')) {
      const fireDetections = currentDetections.filter(d => d.type === 'fire')
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `🔥 **Fire Risk Assessment:**\n\n**Current Fire Alerts:** ${fireDetections.length}\n\n${fireDetections.map((d, i) => 
          `${i + 1}. **${d.title}**\n   📍 ${d.description}\n   🌡️ Risk Level: ${d.severity}\n   🎯 Detection Accuracy: ${d.confidence}%\n`
        ).join('\n')}\n\n**Fire Weather Index:** Moderate to High\n**Drought Conditions:** Elevated in affected areas\n\n**Prevention Tips:**\n• Avoid outdoor burning\n• Clear vegetation around structures\n• Report smoke immediately\n• Keep firefighting equipment ready\n\nShall I show you the fire-prone areas?`,
        timestamp: new Date(),
        mapData: {
          lat: fireDetections[0]?.lat || 12.8797,
          lng: fireDetections[0]?.lng || 121.7740,
          zoom: 7,
          markers: fireDetections.map(d => ({
            lat: d.lat,
            lng: d.lng,
            type: d.type,
            severity: d.severity,
            title: d.title
          }))
        }
      }
    }

    // Landslide queries
    if (input.includes('landslide') || input.includes('slope')) {
      const landslideDetections = currentDetections.filter(d => d.type === 'landslide')
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `⛰️ **Landslide Risk Monitor:**\n\n**Active Landslide Warnings:** ${landslideDetections.length}\n\n${landslideDetections.map((d, i) => 
          `${i + 1}. **${d.title}**\n   📍 ${d.description}\n   ⚠️ Risk: ${d.severity}\n   📊 Soil Stability: ${d.confidence}%\n`
        ).join('\n')}\n\n**Risk Factors:**\n• Heavy rainfall saturation\n• Steep terrain vulnerability\n• Recent seismic activity\n• Deforestation impact\n\n**Safety Guidelines:**\n• Avoid steep slopes during rain\n• Watch for ground cracks\n• Have evacuation plans ready\n• Report unusual ground movement\n\nWant to see geological risk zones?`,
        timestamp: new Date(),
        mapData: {
          lat: landslideDetections[0]?.lat || 16.4023,
          lng: landslideDetections[0]?.lng || 120.5960,
          zoom: 9,
          markers: landslideDetections.map(d => ({
            lat: d.lat,
            lng: d.lng,
            type: d.type,
            severity: d.severity,
            title: d.title
          }))
        }
      }
    }

    // Weather queries
    if (input.includes('weather') || input.includes('temperature') || input.includes('rain')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `🌤️ **National Weather Overview:**\n\n**Current Conditions:**\n🌡️ **Temperature Range:** 24°C - 35°C\n💧 **Humidity:** 65% - 90%\n💨 **Wind Speed:** 10 - 25 km/h\n🌧️ **Rainfall:** 0 - 45 mm/hr\n\n**Regional Highlights:**\n• **Luzon:** Partly cloudy, scattered showers\n• **Visayas:** Mostly sunny, light winds\n• **Mindanao:** Overcast, moderate rainfall\n\n**7-Day Forecast:**\n• Continued monsoon activity\n• Temperature: 26°C - 33°C\n• Rainfall probability: 60%\n\n**Weather Alerts:**\n🟡 Thunderstorm warning for Calabarzon\n🟠 Heavy rainfall advisory for Cagayan\n\nNeed specific weather for a particular area?`,
        timestamp: new Date(),
        mapData: {
          lat: 12.8797,
          lng: 121.7740,
          zoom: 6,
          markers: []
        }
      }
    }

    // General help or overview
    if (input.includes('help') || input.includes('overview') || input.includes('status')) {
      const criticalAlerts = currentDetections.filter(d => d.severity === 'critical').length
      const highAlerts = currentDetections.filter(d => d.severity === 'high').length
      
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `🤖 **ClimateBot Command Center:**\n\n**System Status:** 🟢 Operational\n**Active Monitoring:** 247 stations\n**AI Models Running:** 12 algorithms\n**Data Update Frequency:** Every 15 minutes\n\n**Current Alert Summary:**\n🚨 Critical: ${criticalAlerts} alerts\n⚠️ High Risk: ${highAlerts} alerts\n🟡 Medium Risk: ${currentDetections.filter(d => d.severity === 'medium').length} alerts\n✅ Low Risk: ${currentDetections.filter(d => d.severity === 'low').length} alerts\n\n**What I Can Help With:**\n• 🗺️ "Show me flood risks"\n• 🌪️ "Typhoon status update"\n• 📍 "Weather in [location]"\n• 🔥 "Fire risk assessment"\n• ⛰️ "Landslide warnings"\n• 🌡️ "Temperature forecast"\n\n**Try Commands:**\n• "Show Manila weather"\n• "Where are the floods?"\n• "Typhoon tracking"\n• "Fire danger zones"\n\nWhat would you like to explore?`,
        timestamp: new Date(),
        mapData: {
          lat: 12.8797,
          lng: 121.7740,
          zoom: 6,
          markers: currentDetections.slice(0, 10).map(d => ({
            lat: d.lat,
            lng: d.lng,
            type: d.type,
            severity: d.severity,
            title: d.title
          }))
        }
      }
    }

    // Default response for unrecognized queries
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: `🤔 I understand you're asking about "${userInput}". While I'm still learning, I can help you with:\n\n🗺️ **Location Weather:** "weather in Cebu"\n🌊 **Disaster Tracking:** "show flood alerts"\n🌪️ **Storm Monitoring:** "typhoon updates"\n🔥 **Risk Assessment:** "fire danger areas"\n⛰️ **Geological Hazards:** "landslide warnings"\n\nTry asking me something like:\n• "What's the weather in Davao?"\n• "Show me all typhoon threats"\n• "Where are the flood risks?"\n• "Fire danger in Luzon"\n\nWhat specific climate information can I help you find?`,
      timestamp: new Date()
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(async () => {
      const botResponse = await generateBotResponse(inputValue)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)

      // Update map if map data is provided
      if (botResponse.mapData && onMapUpdate) {
        onMapUpdate(botResponse.mapData)
      }
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const quickCommands = [
    { icon: '🌊', text: 'Show flood risks', command: 'show me flood risks' },
    { icon: '🌪️', text: 'Typhoon status', command: 'typhoon tracking' },
    { icon: '🔥', text: 'Fire dangers', command: 'fire risk assessment' },
    { icon: '📍', text: 'Manila weather', command: 'weather in manila' }
  ]

  return (
    <Card className="w-full h-[600px] flex flex-col border-blue-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-900 flex items-center">
          <div className="relative">
            <Bot className="w-5 h-5 mr-2" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          ClimateBot AI Assistant
          <Badge variant="outline" className="ml-2 border-green-200 text-green-700 bg-green-50">
            Online
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={message.type === 'user' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}>
                      {message.type === 'user' ? '👤' : '🤖'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="whitespace-pre-line text-sm">{message.content}</div>
                    
                    {/* Weather data display */}
                    {message.weatherData && (
                      <div className="mt-3 p-3 bg-white bg-opacity-20 rounded-lg">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center">
                            <Thermometer className="w-3 h-3 mr-1" />
                            {message.weatherData.temperature}°C
                          </div>
                          <div className="flex items-center">
                            <Droplets className="w-3 h-3 mr-1" />
                            {message.weatherData.humidity}%
                          </div>
                          <div className="flex items-center">
                            <Wind className="w-3 h-3 mr-1" />
                            {message.weatherData.windSpeed}km/h
                          </div>
                          <div className="flex items-center">
                            <Activity className="w-3 h-3 mr-1" />
                            {message.weatherData.rainfall}mm
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Map action button */}
                    {message.mapData && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 border-blue-200 text-blue-700 bg-white bg-opacity-20 hover:bg-opacity-30"
                        onClick={() => onMapUpdate?.(message.mapData)}
                      >
                        <MapPin className="w-3 h-3 mr-1" />
                        View on Map
                      </Button>
                    )}
                    
                    <div className={`text-xs mt-2 opacity-70`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-green-100 text-green-700">🤖</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick commands */}
        <div className="px-4 py-2 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickCommands.map((cmd, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputValue(cmd.command)}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <span className="mr-1">{cmd.icon}</span>
                {cmd.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about weather, disasters, or say 'show me flood risks'..."
              className="border-blue-200 focus:border-blue-400"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
