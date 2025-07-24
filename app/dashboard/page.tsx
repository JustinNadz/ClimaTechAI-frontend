"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatusCards } from "@/components/status-cards"
import dynamic from "next/dynamic"
const InteractiveMap = dynamic(() => import("@/components/interactive-map").then(mod => mod.InteractiveMap), { ssr: false })
import { LiveDataFeed } from "@/components/live-data-feed"
import { AIForecastingPanel } from "@/components/ai-forecasting-panel"
import { EmergencyAlerts } from "@/components/emergency-alerts"

export default function DashboardPage() {
  const [selectedView, setSelectedView] = useState("overview")

  return (
    <DashboardLayout>
      <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-12 py-8">
        {/* Welcome/User Summary */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-1 animate-fadein">Welcome back, Admin!</h2>
          <p className="text-gray-600 animate-fadein">Here is your latest disaster risk and system overview.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Status Cards Row */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">System Status</h3>
              <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                <StatusCards />
              </div>
            </section>
            
            {/* Interactive GIS Map */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Interactive Risk Map</h3>
              <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                <InteractiveMap />
              </div>
            </section>
            
            {/* AI Forecasting */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Forecasting</h3>
              <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                <AIForecastingPanel />
              </div>
            </section>
            
            {/* Live Data Feed */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Live Data Feed</h3>
              <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                <LiveDataFeed />
              </div>
            </section>
          </div>
          
          {/* Emergency Alerts in right sidebar */}
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Emergency Alerts</h3>
              <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                <EmergencyAlerts />
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
