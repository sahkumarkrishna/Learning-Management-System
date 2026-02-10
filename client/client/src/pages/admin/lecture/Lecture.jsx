import { Edit, PlayCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRemoveLectureMutation } from "@/Features/api/courseApi";
import { toast } from "sonner";
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

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  const [removeLecture, { isLoading }] = useRemoveLectureMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };

  const handleDeleteLecture = async () => {
    try {
      const response = await removeLecture(lecture._id);
      if (response.data) {
        toast.success(response.data.message || "Lecture deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete lecture");
    }
    setDeleteDialogOpen(false);
  };

  return (
    <>
    <div className="group flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-purple-50 border border-gray-200 rounded-lg px-5 py-4 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">{index + 1}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {lecture.lectureTitle}
          </h3>
          <p className="text-xs text-gray-500 mt-1">Lecture {index + 1}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {lecture.videoUrl && (
          <div className="text-green-600 text-xs font-medium bg-green-50 px-3 py-1 rounded-full">
            <PlayCircle className="w-3 h-3 inline mr-1" />
            Video Added
          </div>
        )}
        <button
          onClick={goToUpdateLecture}
          className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
        >
          <Edit className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
        </button>
        <button
          onClick={() => setDeleteDialogOpen(true)}
          disabled={isLoading}
          className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
        >
          <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
        </button>
      </div>
    </div>

    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900">Delete Lecture</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Are you sure you want to delete "{lecture.lectureTitle}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteLecture}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
};

export default Lecture;
