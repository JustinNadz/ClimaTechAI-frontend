import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Activity, Zap, AlertTriangle } from "lucide-react"

export function StatusCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <Card className="border-gray-200 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Weather Summary</CardTitle>
          <Cloud className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">28°C</div>
          <p className="text-xs text-gray-600">Partly cloudy, 15mm/hr rainfall</p>
          <Badge className="mt-2 bg-yellow-100 text-yellow-800">Alert Level 2</Badge>
        </CardContent>
      </Card>

      <Card className="border-gray-200 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Seismic Activity</CardTitle>
          <Activity className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">Mag 3.2</div>
          <p className="text-xs text-gray-600">Last recorded 2 hours ago</p>
          <Badge className="mt-2 bg-green-100 text-green-800">Normal</Badge>
        </CardContent>
      </Card>

      <Card className="border-gray-200 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Power System Status</CardTitle>
          <Zap className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">98.5%</div>
          <p className="text-xs text-gray-600">Grid stability, 2 minor outages</p>
          <Badge className="mt-2 bg-green-100 text-green-800">Operational</Badge>
        </CardContent>
      </Card>

      <Card className="border-gray-200 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">Active Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">3</div>
          <p className="text-xs text-gray-600">2 flood warnings, 1 landslide alert</p>
          <Badge className="mt-2 bg-red-100 text-red-800">Active</Badge>
        </CardContent>
      </Card>
    </div>
  )
}
