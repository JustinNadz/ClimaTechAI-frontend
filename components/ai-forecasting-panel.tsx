import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Video, ExternalLink, Download, Clock } from "lucide-react"

export function AIForecastingPanel() {
  const forecasts = [
    {
      type: "Flood Risk",
      probability: 75,
      timeframe: "6-12 hours",
      confidence: 92,
      status: "high",
    },
    {
      type: "Landslide Risk",
      probability: 35,
      timeframe: "24-48 hours",
      confidence: 78,
      status: "medium",
    },
    {
      type: "Power Outage",
      probability: 15,
      timeframe: "12-24 hours",
      confidence: 85,
      status: "low",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return "bg-red-500"
    if (probability >= 40) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-900 flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          AI Forecasting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-4">
          {forecasts.map((forecast, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg px-8 py-10 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-blue-900">{forecast.type}</span>
                <Badge className={getStatusColor(forecast.status)}>{forecast.status} risk</Badge>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span>Probability</span>
                <span className="font-bold">{forecast.probability}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full ${getProbabilityColor(forecast.probability)}`}
                  style={{ width: `${forecast.probability}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mb-1">Timeframe: {forecast.timeframe}</div>
              <div className="text-xs text-gray-600">Confidence: {forecast.confidence}%</div>
            </div>
          ))}
          {/* Model Accuracy as a fourth card */}
          <div className="bg-gray-50 rounded-lg px-8 py-10 flex flex-col h-full justify-between">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Model Accuracy</span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span className="font-bold text-blue-900 text-lg mb-2">94.2%</span>
              <Progress value={94.2} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
