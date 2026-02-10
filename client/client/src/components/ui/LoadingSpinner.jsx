import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-pulse" />
        <Loader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin h-12 w-12 text-blue-600" />
      </div>
      <p className="mt-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;