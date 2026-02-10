import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from "@/Features/api/courseApi";
import { Loader2, Upload, CheckCircle2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: null,
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const { data: courseByIdData, isLoading: courseByIdLoading, refetch } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });
  const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();
  const [publishCourse] = usePublishCourseMutation();

  const course = courseByIdData?.course;

  useEffect(() => {
    if (course) {
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: null,
      });
      if (course.courseThumbnail) {
        setPreviewThumbnail(course.courseThumbnail);
      }
    }
  }, [course]);

  const changeEventHandle = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    try {
      if (!courseId) throw new Error("Course ID is missing");

      const formData = new FormData();
      formData.append("courseTitle", input.courseTitle);
      formData.append("subTitle", input.subTitle);
      formData.append("description", input.description);
      formData.append("category", input.category);
      formData.append("courseLevel", input.courseLevel);
      formData.append("coursePrice", input.coursePrice);

      if (input.courseThumbnail) {
        formData.append("courseThumbnail", input.courseThumbnail);
      }

      await editCourse({ formData, courseId });
    } catch (error) {
      toast.error("Something went wrong while updating the course");
    }
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response?.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated successfully");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Course Information</CardTitle>
            <CardDescription className="mt-2">Update your course details and settings</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              disabled={courseByIdData?.course.lectures.length === 0}
              variant="outline"
              onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}
              className={courseByIdData?.course.isPublished ? "border-green-600 text-green-600" : ""}
            >
              {courseByIdData?.course.isPublished ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Published
                </>
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Course Title</Label>
            <Input
              type="text"
              name="courseTitle"
              placeholder="e.g., Complete Web Development"
              value={input.courseTitle}
              onChange={changeEventHandle}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              placeholder="e.g., Become a Fullstack Developer"
              value={input.subTitle}
              onChange={changeEventHandle}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Category</Label>
            <Select value={input.category} onValueChange={(value) => setInput((prev) => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-white">
                  <SelectLabel>Programming</SelectLabel>
                  <SelectItem value="HTML">HTML</SelectItem>
                  <SelectItem value="CSS">CSS</SelectItem>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                  <SelectLabel>Frameworks</SelectLabel>
                  <SelectItem value="ReactJs">React Js</SelectItem>
                  <SelectItem value="NodeJs">Node Js</SelectItem>
                  <SelectItem value="NextJs">Next Js</SelectItem>
                  <SelectLabel>Development</SelectLabel>
                  <SelectItem value="FullstackDevelopment">Fullstack</SelectItem>
                  <SelectItem value="FrontendDevelopment">Frontend</SelectItem>
                  <SelectItem value="BackendDevelopment">Backend</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Course Level</Label>
            <Select value={input.courseLevel} onValueChange={(value) => setInput((prev) => ({ ...prev, courseLevel: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-white">
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Price (₹)</Label>
            <Input
              type="number"
              name="coursePrice"
              placeholder="999"
              value={input.coursePrice}
              onChange={changeEventHandle}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Course Thumbnail</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">Upload course thumbnail</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG (max 2MB)</p>
              </div>
              <Input type="file" onChange={selectThumbnail} accept="image/*" className="max-w-xs" />
            </div>
          </div>
          {previewThumbnail && (
            <div className="mt-4">
              <img src={previewThumbnail} className="w-full max-w-md rounded-lg shadow-md" alt="Course Thumbnail" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4">
          <Button onClick={() => navigate("/admin/course")} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={updateCourseHandler}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
