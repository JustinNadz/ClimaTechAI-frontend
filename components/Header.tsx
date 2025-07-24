import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ClimaTech AI</h1>
              <p className="text-sm text-gray-600">Disaster Management & Clean Energy</p>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg transition-colors">
              Login
            </Link>
            <Link href="/register" className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 