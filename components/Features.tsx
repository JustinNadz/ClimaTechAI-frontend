import { Cloud, AlertTriangle, Zap } from "lucide-react";

const features = [
  {
    icon: <Cloud className="h-7 w-7 text-blue-600" />,
    title: "Weather Monitoring",
    description: "Real-time integration with PAGASA and PHIVOLCS data networks."
  },
  {
    icon: <AlertTriangle className="h-7 w-7 text-red-500" />,
    title: "Emergency Response",
    description: "AI-powered analytics for flood, landslide, and earthquake risk."
  },
  {
    icon: <Zap className="h-7 w-7 text-yellow-400" />,
    title: "Clean Energy",
    description: "Integrated renewable microgrids for sustainable solutions."
  }
];

const Features = () => (
  <section className="py-16 px-4 bg-white">
    <div className="container mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Comprehensive Climate Solutions</h2>
        <p className="text-base text-blue-800">Leverage AI and real-time data to protect communities.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white border border-blue-100 rounded-lg p-6 flex flex-col items-center">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-blue-900 mb-1">{feature.title}</h3>
            <p className="text-blue-800 text-sm text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features; 