import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateCourseMutation } from "@/Features/api/courseApi";
import { Label } from "@radix-ui/react-label";
import { Loader2, Plus, BookOpen, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [createCourse, { data, isLoading, error, isSuccess }] = useCreateCourseMutation();
  const navigate = useNavigate();

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created successfully!");
      navigate("/admin/course");
    }
    if (error) {
      toast.error(error.message || "Failed to create course.");
    }
  }, [isSuccess, error, data, navigate]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
            <p className="text-sm text-gray-600">Add basic course information to get started</p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <Label className="text-sm font-semibold text-gray-700">Course Title</Label>
            <Input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g., Complete Web Development Bootcamp"
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-700">Category</Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-white">
                  <SelectLabel>Programming Languages</SelectLabel>
                  <SelectItem value="HTML">HTML</SelectItem>
                  <SelectItem value="CSS">CSS</SelectItem>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectLabel>Frameworks & Libraries</SelectLabel>
                  <SelectItem value="ReactJs">React Js</SelectItem>
                  <SelectItem value="AngularJs">Angular Js</SelectItem>
                  <SelectItem value="VueJs">Vue Js</SelectItem>
                  <SelectItem value="NodeJs">Node Js</SelectItem>
                  <SelectItem value="NextJs">Next Js</SelectItem>
                  <SelectItem value="SpringBoot">Spring Boot</SelectItem>
                  <SelectItem value="Django">Django</SelectItem>
                  <SelectLabel>Databases</SelectLabel>
                  <SelectItem value="MongoDB">MongoDB</SelectItem>
                  <SelectItem value="SQL">SQL</SelectItem>
                  <SelectLabel>Development Paths</SelectLabel>
                  <SelectItem value="FrontendDevelopment">Frontend Development</SelectItem>
                  <SelectItem value="BackendDevelopment">Backend Development</SelectItem>
                  <SelectItem value="MERNStack">MERN Stack Development</SelectItem>
                  <SelectItem value="MEANStack">MEAN Stack Development</SelectItem>
                  <SelectItem value="FullstackDevelopment">Fullstack Development</SelectItem>
                  <SelectItem value="WebDevelopment">Web Development</SelectItem>
                  <SelectLabel>Other</SelectLabel>
                  <SelectItem value="Docker">Docker</SelectItem>
                  <SelectItem value="DataScience">Data Science</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button variant="outline" onClick={() => navigate("/admin/course")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
              disabled={isLoading || !courseTitle.trim() || !category}
              onClick={createCourseHandler}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Course
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
