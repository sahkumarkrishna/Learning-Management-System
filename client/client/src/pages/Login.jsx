import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLoginUserMutation, useRegisterUserMutation } from "@/Features/api/authApi";
import { Loader2, School, Mail, Lock, User, Sparkles, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [SignInput, setSignInput] = useState({ name: "", email: "", password: "", role: "student" });
  const [loginInput, setLoginInput] = useState({ email: "", password: "", role: "student" });
  const [registerErrors, setRegisterErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  const [activeTab, setActiveTab] = useState("Login");

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();
  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignInput({ ...SignInput, [name]: value });
      setRegisterErrors({ ...registerErrors, [name]: "" });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
      setLoginErrors({ ...loginErrors, [name]: "" });
    }
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData?.message || "Signup successful.");
      setRegisterErrors({});
      setActiveTab("Login");
    }
    if (registerError) {
      toast.error(registerError?.data?.message || registerError?.error || "Registration failed.");
      setRegisterErrors(registerError?.data?.errors || {});
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData?.message || "Login successful.");
      setLoginErrors({});
      // Navigate based on user's actual role from server response
      if (loginData?.user?.role === "instructor") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
    if (loginError) {
      toast.error(loginError?.data?.message || loginError?.error || "Login failed.");
      setLoginErrors(loginError?.data?.errors || {});
    }
  }, [registerIsSuccess, registerError, loginIsSuccess, loginError, loginData, registerData, navigate]);

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? SignInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    try {
      await action(inputData);
    } catch (err) {
      console.error("Error during action:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <School className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome to E-Learning
          </h1>
          <p className="text-gray-600">Start your learning journey today</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="Login" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Login
            </TabsTrigger>
            <TabsTrigger value="Signup" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Login" className="mt-6">
            <Card className="border-0 shadow-xl">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-semibold text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      name="email"
                      value={loginInput.email}
                      onChange={(e) => changeInputHandler(e, "login")}
                      placeholder="you@example.com"
                      className="pl-10"
                    />
                  </div>
                  {loginErrors?.email && <p className="text-red-500 text-sm">{loginErrors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm font-semibold text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="login-password"
                      type="password"
                      name="password"
                      value={loginInput.password}
                      onChange={(e) => changeInputHandler(e, "login")}
                      placeholder="••••••••"
                      className="pl-10"
                    />
                  </div>
                  {loginErrors?.password && <p className="text-red-500 text-sm">{loginErrors.password}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6"
                  disabled={loginIsLoading}
                  onClick={() => handleRegistration("login")}
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
              <div className="px-6 pb-6 text-center">
                <button
                  onClick={() => navigate("/admin-login")}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <Shield className="w-4 h-4" />
                  Admin Login
                </button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="Signup" className="mt-6">
            <Card className="border-0 shadow-xl">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  Create Account
                </CardTitle>
                <CardDescription>Join thousands of learners worldwide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-semibold text-gray-700">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="signup-name"
                      type="text"
                      name="name"
                      value={SignInput.name}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="John Doe"
                      className="pl-10"
                    />
                  </div>
                  {registerErrors?.name && <p className="text-red-500 text-sm">{registerErrors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-semibold text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      name="email"
                      value={SignInput.email}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="you@example.com"
                      className="pl-10"
                    />
                  </div>
                  {registerErrors?.email && <p className="text-red-500 text-sm">{registerErrors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-semibold text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="signup-password"
                      type="password"
                      name="password"
                      value={SignInput.password}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      placeholder="••••••••"
                      className="pl-10"
                    />
                  </div>
                  {registerErrors?.password && <p className="text-red-500 text-sm">{registerErrors.password}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6"
                  disabled={registerIsLoading}
                  onClick={() => handleRegistration("signup")}
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
