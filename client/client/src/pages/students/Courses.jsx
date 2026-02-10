import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/Features/api/courseApi";
import { GraduationCap } from "lucide-react";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mb-4">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Explore Our Courses
          </h2>
          <p className="text-gray-600 text-lg">Choose from hundreds of courses and start learning today</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CoursesSkeleton key={index} />
            ))
          ) : data?.courses?.length > 0 ? (
            data.courses.map((course, index) => (
              <Course key={index} course={course} />
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-xl shadow-lg p-16 text-center border border-gray-100">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <GraduationCap className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Coming Soon!
                </h3>
                <p className="text-gray-600 text-lg max-w-md mx-auto">
                  Exciting courses are on their way. Stay tuned for amazing learning opportunities!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CoursesSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
};
