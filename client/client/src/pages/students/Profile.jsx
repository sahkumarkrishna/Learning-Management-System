import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, Mail, Shield, Camera, BookOpen } from "lucide-react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUploadUserMutation,
} from "@/Features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { isLoading: updateUserIsLoading, isSuccess, error }] =
    useUploadUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Profile updated successfully!");
    }
    if (error) {
      toast.error(
        error?.message || "Failed to update profile. Please try again."
      );
    }
  }, [isSuccess, error]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!data || !data.user) {
    return <h1>No user data available.</h1>;
  }

  const { user } = data;

  const updateUserHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name || user.name);
      if (profilePhoto) formData.append("profilePhoto", profilePhoto);
      await updateUser(formData).unwrap();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600" />
          <div className="px-6 sm:px-10 pb-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="User Avatar"
                  />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900">{user?.name || "N/A"}</h1>
                <p className="text-gray-600 mt-1">{user?.email || "N/A"}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Camera className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Edit Profile</DialogTitle>
                    <DialogDescription>
                      Update your profile information and photo
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={user?.name || "Enter your name"}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="photo" className="text-sm font-medium flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        Profile Photo
                      </Label>
                      <Input
                        onChange={onChangeHandler}
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      disabled={updateUserIsLoading}
                      onClick={updateUserHandler}
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {updateUserIsLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-700">Name</h3>
                </div>
                <p className="text-gray-900 font-medium">{user?.name || "N/A"}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-700">Email</h3>
                </div>
                <p className="text-gray-900 font-medium truncate">{user?.email || "N/A"}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-700">Role</h3>
                </div>
                <p className="text-gray-900 font-medium uppercase">{user?.role || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Enrolled Courses</h2>
          </div>
          {user?.enrolledCourse?.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-md">
              <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses enrolled</h3>
              <p className="text-gray-600">Start your learning journey today!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {user?.enrolledCourse?.map((course) => (
                <Course key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
