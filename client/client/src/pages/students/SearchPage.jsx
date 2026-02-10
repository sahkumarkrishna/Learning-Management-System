import  { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/Features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCatgories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCatgories(categories);
    setSortByPrice(price);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-bold text-2xl md:text-3xl text-gray-900">Search Results</h1>
          </div>
          <p className="text-gray-600 ml-14">
            Showing results for <span className="font-semibold text-blue-600">"{query}"</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <Filter handleFilterChange={handleFilterChange} />
          <div className="flex-1">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <CourseSkeleton key={idx} />
                ))}
              </div>
            ) : isEmpty ? (
              <CourseNotFound />
            ) : (
              <div className="space-y-4">
                {data?.courses?.map((course) => (
                  <SearchResult key={course._id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="text-red-500 h-10 w-10" />
      </div>
      <h1 className="font-bold text-2xl md:text-3xl text-gray-900 mb-3">
        No Courses Found
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Sorry, we couldn't find any courses matching your search.
      </p>
      <Link to="/">
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4">
      <Skeleton className="h-32 w-full md:w-48 rounded-lg" />
      <div className="flex flex-col gap-3 flex-1">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="flex items-center">
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
};
