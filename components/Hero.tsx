import Link from "next/link";

const Hero = () => (
  <div 
    className="relative bg-cover bg-center py-32"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1731350082398-e5da31bda03c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxjbGltYXRlJTIwdGVjaG5vbG9neXxlbnwwfHx8fDE3NTMyODMwMjd8MA&ixlib=rb-4.1.0&q=85')`
    }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* Main Hero Text */}
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
        Turning{" "}
        <span className="text-blue-400">Climate</span>{" "}
        <span className="text-teal-300">Data</span>{" "}
        <span className="text-yellow-400">into</span>
        <br />
        <span className="text-yellow-400">Action</span>
      </h1>
      
      {/* Subtitle */}
      <div className="max-w-3xl mx-auto mb-8">
        <p className="text-xl text-blue-100 mb-4">
          AI-powered disaster management and clean energy solution for the Philippines.
        </p>
        <p className="text-lg text-blue-200">
          Transform meteorological data into actionable intelligence for disaster preparedness and response.
        </p>
      </div>
      
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
        <Link href="/dashboard">
          <div className="bg-gradient-to-r from-blue-500 to-yellow-400 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-lg">
            Access Dashboard
          </div>
        </Link>
        <Link href="/register">
          <div className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all">
            Get Started
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default Hero; 