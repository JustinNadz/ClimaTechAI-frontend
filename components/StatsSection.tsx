import React from "react";

const StatsSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Prediction Accuracy */}
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="text-5xl font-bold text-blue-600 mb-4">98%</div>
            <div className="text-xl font-semibold text-gray-900 mb-2">Prediction Accuracy</div>
            <div className="text-gray-600">
              Advanced AI models ensure highly accurate weather and disaster predictions
            </div>
          </div>
          
          {/* Real-time Monitoring */}
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="text-5xl font-bold text-yellow-500 mb-4">24/7</div>
            <div className="text-xl font-semibold text-gray-900 mb-2">Real-time Monitoring</div>
            <div className="text-gray-600">
              Continuous monitoring of climate conditions and environmental changes
            </div>
          </div>
          
          {/* Cities Protected */}
          <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
            <div className="text-5xl font-bold text-blue-600 mb-4">50+</div>
            <div className="text-xl font-semibold text-gray-900 mb-2">Cities Protected</div>
            <div className="text-gray-600">
              Comprehensive coverage across major cities in the Philippines
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection; 