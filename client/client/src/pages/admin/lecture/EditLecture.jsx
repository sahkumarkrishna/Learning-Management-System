import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <Button size="icon" variant="outline" className="rounded-full hover:bg-blue-50">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <Edit2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Lecture</h1>
              <p className="text-sm text-gray-600">Update lecture details and content</p>
            </div>
          </div>
        </div>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecture;
