import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetCreatorCoursesQuery, useRemoveCourseMutation } from "@/Features/api/courseApi.js";
import { Edit, Plus, Loader2, BookOpen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const CoursesTable = () => {
  const { data, isLoading, isError } = useGetCreatorCoursesQuery();
  const [removeCourse, { isLoading: deleteLoading }] = useRemoveCourseMutation();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await removeCourse(courseToDelete._id);
      if (response.data) {
        toast.success(response.data.message || "Course deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete course");
    }
    setDeleteDialogOpen(false);
    setCourseToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }
  if (isError || !data) return <h1>Error loading courses. Please try again later.</h1>;

  const courses = data.courses || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Courses
          </h1>
          <p className="text-gray-600 mt-1">Manage and edit your courses</p>
        </div>
        <Button
          onClick={() => navigate("create")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Course
        </Button>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses yet</h3>
          <p className="text-gray-600 mb-6">Create your first course to get started!</p>
          <Button
            onClick={() => navigate("create")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Create Your First Course
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <Table>
            <TableCaption className="py-4">A list of your courses</TableCaption>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50">
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-medium text-gray-900">{course.courseTitle}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-blue-600">₹{course?.coursePrice || "NA"}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={course.isPublished
                        ? "bg-green-100 text-green-700 border-0"
                        : "bg-yellow-100 text-yellow-700 border-0"
                      }
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`${course._id}`)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteClick(course)}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Delete Course</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete "{courseToDelete?.courseTitle}"? This action cannot be undone and will also delete all associated lectures.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CoursesTable;
