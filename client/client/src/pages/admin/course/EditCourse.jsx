import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import CorseTab from "./CorseTab";

export const EditCourse = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
              <p className="text-sm text-gray-600">Update your course information</p>
            </div>
          </div>
          <Link to="lecture">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2">
              Manage Lectures
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      <CorseTab />
    </div>
  );
};
