import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data for the interactive map
  const riskZones = [
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
  ];

  return NextResponse.json(riskZones);
} 