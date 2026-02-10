import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "@/Features/api/authApi";
import { Loader2, School, Mail, Lock, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminLogin = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "", role: "instructor" });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
    setLoginErrors({ ...loginErrors, [name]: "" });
  };

  useEffect(() => {
    if (loginIsSuccess && loginData) {
      toast.success(loginData?.message || "Login successful.");
      setLoginErrors({});
      if (loginData?.user?.role === "instructor") {
        navigate("/admin/dashboard");
      } else {
        toast.error("Access denied. Instructors only.");
        navigate("/");
      }
    }
    if (loginError) {
      toast.error(loginError?.data?.message || loginError?.error || "Login failed.");
      setLoginErrors(loginError?.data?.errors || {});
    }
  }, [loginIsSuccess, loginError, loginData, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(loginInput);
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-2xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-300">Instructor Access Only</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-sm font-semibold text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="admin-email"
                    type="email"
                    name="email"
                    value={loginInput.email}
                    onChange={changeInputHandler}
                    placeholder="admin@example.com"
                    className="pl-10"
                    required
                  />
                </div>
                {loginErrors?.email && <p className="text-red-500 text-sm">{loginErrors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="admin-password"
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={changeInputHandler}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
                {loginErrors?.password && <p className="text-red-500 text-sm">{loginErrors.password}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-6"
                disabled={loginIsLoading}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-5 w-5" />
                    Login as Admin
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/login")}
                className="w-full"
              >
                Back to Student Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
