import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:block w-64 border-r border-gray-200 bg-white sticky top-0 h-screen">
        <div className="p-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Instructor Panel
          </h2>
          <nav className="space-y-2">
            <Link
              to="dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive('dashboard')
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ChartNoAxesColumn className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              to="course"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive('course')
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <SquareLibrary className="w-5 h-5" />
              <span className="font-medium">Courses</span>
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
