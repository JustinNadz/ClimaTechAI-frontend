import { NextRequest, NextResponse } from 'next/server'

// Mock real-time climate detection data
const generateMockDetections = () => {
  const baseDetections = [
    {
      id: '1',
      type: 'flood',
      severity: 'high',
      lat: 14.5995,
      lng: 120.9842,
      title: 'Flash Flood Alert - Metro Manila',
      description: 'Heavy rainfall detected in Quezon City and surrounding areas. Water levels rising rapidly in Marikina River and low-lying residential areas.',
      timestamp: new Date().toISOString(),
      confidence: 92,
      affectedArea: 15.2,
      weatherData: {
        temperature: 28,
        humidity: 85,
        windSpeed: 25,
        rainfall: 45
      },
      evacuationSites: ['Quezon City Hall', 'Veterans Memorial Hospital', 'SM North EDSA'],
      emergencyContacts: ['911', '8-1234-5678']
    },
    {
      id: '2',
      type: 'landslide',
      severity: 'medium',
      lat: 16.4023,
      lng: 120.5960,
      title: 'Landslide Risk - Baguio City',
      description: 'Soil saturation levels critical in steep mountainous areas. Continuous monitoring of unstable slopes near residential zones.',
      timestamp: new Date().toISOString(),
      confidence: 78,
      affectedArea: 8.7,
      weatherData: {
        temperature: 18,
        humidity: 92,
        windSpeed: 15,
        rainfall: 32
      },
      evacuationSites: ['Baguio Convention Center', 'University of Baguio Gym'],
      emergencyContacts: ['911', '074-442-8931']
    },
    {
      id: '3',
      type: 'fire',
      severity: 'low',
      lat: 10.3157,
      lng: 123.8854,
      title: 'Fire Risk - Cebu Province',
      description: 'Dry conditions detected in rural areas. Fire weather index elevated. Increased monitoring of forested and agricultural zones.',
      timestamp: new Date().toISOString(),
      confidence: 65,
      affectedArea: 12.1,
      weatherData: {
        temperature: 35,
        humidity: 45,
        windSpeed: 20,
        rainfall: 0
      },
      evacuationSites: ['Cebu Sports Complex', 'Capitol Site Elementary School'],
      emergencyContacts: ['911', '032-255-1234']
    },
    {
      id: '4',
      type: 'storm',
      severity: 'critical',
      lat: 13.4125,
      lng: 123.4175,
      title: 'Typhoon Warning - Bicol Region',
      description: 'Category 3 typhoon "Nina" approaching from the Pacific. Wind speeds up to 185 km/h expected. Immediate evacuation recommended for coastal areas.',
      timestamp: new Date().toISOString(),
      confidence: 96,
      affectedArea: 125.8,
      weatherData: {
        temperature: 26,
        humidity: 95,
        windSpeed: 120,
        rainfall: 85
      },
      evacuationSites: ['Naga City Coliseum', 'Legazpi Airport Terminal', 'Tabaco Sports Complex'],
      emergencyContacts: ['911', '054-473-2340']
    },
    {
      id: '5',
      type: 'earthquake',
      severity: 'medium',
      lat: 14.6507,
      lng: 121.1029,
      title: 'Seismic Activity - Marikina Fault',
      description: 'Magnitude 4.2 earthquake detected. Aftershocks possible. Structural damage assessment ongoing in affected buildings.',
      timestamp: new Date().toISOString(),
      confidence: 88,
      affectedArea: 25.5,
      weatherData: {
        temperature: 30,
        humidity: 70,
        windSpeed: 12,
        rainfall: 0
      },
      evacuationSites: ['Marikina Sports Park', 'Riverbanks Mall Parking'],
      emergencyContacts: ['911', '8-682-1111']
    },
    {
      id: '6',
      type: 'drought',
      severity: 'medium',
      lat: 7.8731,
      lng: 125.2467,
      title: 'Drought Conditions - Northern Mindanao',
      description: 'Extended dry period affecting agricultural areas. Water reservoirs at 35% capacity. Crop yield impact anticipated.',
      timestamp: new Date().toISOString(),
      confidence: 82,
      affectedArea: 45.3,
      weatherData: {
        temperature: 34,
        humidity: 35,
        windSpeed: 18,
        rainfall: 0
      },
      evacuationSites: ['Cagayan de Oro Convention Center'],
      emergencyContacts: ['911', '088-856-1234']
    }
  ]

  // Add some variability to make it feel real-time
  return baseDetections.map(detection => ({
    ...detection,
    confidence: Math.max(50, Math.min(100, detection.confidence + (Math.random() - 0.5) * 10)),
    timestamp: new Date().toISOString(),
    weatherData: detection.weatherData ? {
      ...detection.weatherData,
      temperature: detection.weatherData.temperature + (Math.random() - 0.5) * 2,
      humidity: Math.max(0, Math.min(100, detection.weatherData.humidity + (Math.random() - 0.5) * 5)),
      windSpeed: Math.max(0, detection.weatherData.windSpeed + (Math.random() - 0.5) * 3),
      rainfall: Math.max(0, detection.weatherData.rainfall + (Math.random() - 0.3) * 5)
    } : undefined
  }))
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const severity = searchParams.get('severity')
    const limit = parseInt(searchParams.get('limit') || '10')

    let detections = generateMockDetections()

    // Filter by type if specified
    if (type && type !== 'all') {
      detections = detections.filter(d => d.type === type)
    }

    // Filter by severity if specified
    if (severity && severity !== 'all') {
      detections = detections.filter(d => d.severity === severity)
    }

    // Limit results
    detections = detections.slice(0, limit)

    // Sort by severity (critical first) and confidence
    detections.sort((a, b) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
      const severityDiff = (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
                          (severityOrder[a.severity as keyof typeof severityOrder] || 0)
      
      if (severityDiff !== 0) return severityDiff
      return b.confidence - a.confidence
    })

    return NextResponse.json({
      success: true,
      data: detections,
      total: detections.length,
      timestamp: new Date().toISOString(),
      filters: {
        type: type || 'all',
        severity: severity || 'all',
        limit
      }
    })

  } catch (error) {
    console.error('Error fetching detections:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch climate detections',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mock creating a new detection alert
    const newDetection = {
      id: Date.now().toString(),
      ...body,
      timestamp: new Date().toISOString(),
      confidence: Math.min(100, Math.max(0, body.confidence || 75))
    }

    return NextResponse.json({
      success: true,
      data: newDetection,
      message: 'Climate detection alert created successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error creating detection:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create climate detection',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 