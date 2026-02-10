import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/Features/api/courseApi";
import axios from "axios";
import { Loader2, Upload, Video, Trash2, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const { courseId, lectureId } = useParams();
  const [editLecture, { isLoading, isSuccess, data }] = useEditLectureMutation();
  const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveLectureMutation();
  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  const fileChangeHandle = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);

      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    if (!uploadVideoInfo) {
      toast.error("Please upload a video before updating the lecture.");
      return;
    }

    try {
      await editLecture({
        lectureTitle,
        videoInfo: uploadVideoInfo,
        isPreviewFree: isFree,
        courseId,
        lectureId,
      }).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update lecture.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture updated successfully!");
    }
  }, [isSuccess, data]);

  const removeLectureHandler = async () => {
    try {
      await removeLecture(lectureId).unwrap();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to remove lecture.");
    }
  };

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message || "Lecture removed successfully!");
    }
  }, [removeSuccess, removeData]);

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Edit Lecture Details</CardTitle>
            <CardDescription className="mt-2">Update your lecture content and settings</CardDescription>
          </div>
          <Button
            disabled={removeLoading}
            variant="destructive"
            className="gap-2"
            onClick={removeLectureHandler}
          >
            {removeLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Remove Lecture
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Lecture Title</Label>
          <Input
            type="text"
            placeholder="e.g., Introduction to JavaScript"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">
            Video <span className="text-red-500">*</span>
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">Upload lecture video</p>
                <p className="text-xs text-gray-500 mt-1">MP4, MOV, or AVI (max 500MB)</p>
              </div>
              <Input
                type="file"
                accept="video/*"
                onChange={fileChangeHandle}
                className="max-w-xs"
              />
            </div>
          </div>
          {uploadVideoInfo && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
              <span>Video uploaded successfully</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Video className="w-5 h-5 text-gray-600" />
            <div>
              <Label htmlFor="free-preview" className="text-sm font-semibold text-gray-700 cursor-pointer">
                Free Preview
              </Label>
              <p className="text-xs text-gray-500">Allow students to preview this lecture</p>
            </div>
          </div>
          <Switch checked={isFree} onCheckedChange={setIsFree} id="free-preview" />
        </div>

        {mediaProgress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Uploading...</span>
              <span className="font-semibold text-blue-600">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        <div className="pt-4">
          <Button
            disabled={btnDisable || isLoading}
            onClick={editLectureHandler}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
