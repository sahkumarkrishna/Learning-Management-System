import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Clock, Star } from "lucide-react";

const Course = ({ course }) => {
  return (
    <Link to={`/Course-details/${course._id}`}>
      <Card className="group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img
            src={course.courseThumbnail}
            alt="Course"
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
              {course.courseLevel}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5 space-y-4">
          <h2 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.courseTitle}
          </h2>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 ring-2 ring-gray-100">
              <AvatarImage
                src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                alt={course.creator?.name || "Creator"}
              />
              <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {course.creator?.name?.[0]?.toUpperCase() || "C"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600 font-medium">{course.creator?.name}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ₹{Number(course?.coursePrice) || 0}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
