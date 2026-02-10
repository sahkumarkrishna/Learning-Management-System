import { Button } from "@/components/ui/button";
import BuyCourseButton from "@/components/ui/BuyCourseButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/Features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle, Clock, Users, Award, CheckCircle2 } from "lucide-react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }
  if (isError) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/CourseProgress/${courseId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course?.courseTitle || "No Title Available"}
              </h1>
              <p className="text-lg text-white/90 mb-6">{course?.subTitle}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-lg font-bold">{course?.creator?.name?.[0]}</span>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs">Created by</p>
                    <p className="font-semibold">{course?.creator?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeInfo className="w-5 h-5" />
                  <span>Updated {course?.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course?.enrolledStudents?.length} students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-600" />
                Course Description
              </h2>
              <div
                className="text-gray-700 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: course?.description || "No description available" }}
              />
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <PlayCircle className="w-6 h-6 text-blue-600" />
                  Course Content
                </h2>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {course?.lectures?.length} lectures
                </span>
              </div>
              <div className="space-y-3">
                {course?.lectures?.map((lecture, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      purchased ? "bg-green-100" : "bg-gray-100"
                    }`}>
                      {purchased ? (
                        <PlayCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {lecture?.lectureTitle || "Untitled Lecture"}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">Lecture {idx + 1}</span>
                  </div>
                )) || <p className="text-gray-500">No lectures available.</p>}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-900">
                    {course?.lectures?.[0]?.videoUrl ? (
                      <ReactPlayer
                        width="100%"
                        height="100%"
                        url={course.lectures[0].videoUrl}
                        controls={true}
                        light={course?.courseThumbnail}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-white">No preview available</p>
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Course Price</p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{course?.coursePrice}
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Clock className="w-5 h-5" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Award className="w-5 h-5" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{course?.lectures?.length} lectures</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  {purchased ? (
                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 text-lg"
                      onClick={handleContinueCourse}
                    >
                      <PlayCircle className="w-5 h-5 mr-2" />
                      Continue Learning
                    </Button>
                  ) : (
                    <BuyCourseButton courseId={courseId} />
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
