import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";

const SearchResult = ({ course }) => {
  return (
    <Link to={`/course-details/${course._id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-72 h-48 md:h-auto overflow-hidden">
            <img
              src={course.courseThumbnail}
              alt={course.courseTitle}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.courseTitle}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.subTitle}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{course.creator?.name}</span>
                </div>
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                  {course.courseLevel}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ₹{course.coursePrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;
