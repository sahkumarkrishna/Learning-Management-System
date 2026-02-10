import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/Features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay, Award, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.id;
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();
  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }
  if (isError) return <p>Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;
  const initialLecture = currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  const completedLectures = progress.filter(p => p.viewed).length;
  const totalLectures = courseDetails.lectures.length;
  const progressPercentage = (completedLectures / totalLectures) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{courseTitle}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{completedLectures} of {totalLectures} lectures completed</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">{Math.round(progressPercentage)}% Complete</p>
              </div>
            </div>
            <Button
              onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
              className={completed
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              }
            >
              {completed ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  <Award className="w-4 h-4 mr-2" />
                  Mark as Complete
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <video
                src={currentLecture?.videoUrl || initialLecture.videoUrl}
                controls
                className="w-full aspect-video bg-black"
                onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture._id)}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Lecture {courseDetails.lectures.findIndex((lec) => lec._id === (currentLecture?._id || initialLecture._id)) + 1}:
                  {" "}{currentLecture?.lectureTitle || initialLecture.lectureTitle}
                </h3>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CirclePlay className="w-5 h-5 text-blue-600" />
                Course Lectures
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {courseDetails?.lectures.map((lecture, idx) => (
                  <Card
                    key={lecture._id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      lecture._id === (currentLecture?._id || initialLecture._id)
                        ? "ring-2 ring-blue-600 bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleSelectLecture(lecture)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isLectureCompleted(lecture._id) ? "bg-green-100" : "bg-gray-100"
                        }`}>
                          {isLectureCompleted(lecture._id) ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <span className="text-sm font-semibold text-gray-600">{idx + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-sm font-medium text-gray-900 line-clamp-2">
                            {lecture.lectureTitle}
                          </CardTitle>
                          {isLectureCompleted(lecture._id) && (
                            <Badge className="mt-2 bg-green-100 text-green-700 border-0 text-xs">
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
