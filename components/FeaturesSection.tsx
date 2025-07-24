import React from "react";

const FeaturesSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-teal-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Climate Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leveraging cutting-edge AI technology to provide actionable insights for disaster preparedness and clean energy solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Disaster Prediction */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Disaster Prediction</h3>
            <p className="text-gray-600">Early warning systems for typhoons, floods, and other natural disasters.</p>
          </div>
          
          {/* Energy Optimization */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Energy Optimization</h3>
            <p className="text-gray-600">Smart grid management and renewable energy forecasting.</p>
          </div>
          
          {/* Real-time Analytics */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
            <p className="text-gray-600">Advanced data visualization and environmental monitoring dashboards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection; 