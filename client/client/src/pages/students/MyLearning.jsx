import { useLoadUserQuery } from "@/Features/api/authApi";
import Course from "./Course";
import { BookOpen, GraduationCap } from "lucide-react";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const MyLearning = data?.user?.enrolledCourse || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Learning
            </h1>
          </div>
          <p className="text-gray-600 ml-14">Continue your learning journey</p>
        </div>

        {isLoading ? (
          <MyLearningSkeleton />
        ) : MyLearning.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
              <GraduationCap className="w-20 h-20 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No courses yet</h3>
            <p className="text-gray-600 mb-6">Start learning by enrolling in a course</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MyLearning.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
              <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
