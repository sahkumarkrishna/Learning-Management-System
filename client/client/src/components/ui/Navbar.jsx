import { Menu, School, BookOpen, User, LogOut, LayoutDashboard, GraduationCap, X, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Separator } from "./separator";
import { useLogoutUserMutation } from "@/Features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Button } from "./button";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
    } border-b border-gray-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
              <School className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              E-Learning
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                {user.role !== "instructor" && (
                  <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Explore Courses
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <Avatar className="w-9 h-9 ring-2 ring-blue-500 ring-offset-2">
                        <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white" align="end">
                    <DropdownMenuLabel className="font-semibold">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {user.role !== "instructor" && (
                        <DropdownMenuItem asChild>
                          <Link to="/my-learning" className="flex items-center gap-2 cursor-pointer">
                            <BookOpen className="w-4 h-4" />
                            My Learning
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                          <User className="w-4 h-4" />
                          Edit Profile
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {user.role === "instructor" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem asChild>
                            <Link to="/admin/dashboard" className="flex items-center gap-2 cursor-pointer">
                              <LayoutDashboard className="w-4 h-4" />
                              Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/admin/course" className="flex items-center gap-2 cursor-pointer">
                              <GraduationCap className="w-4 h-4" />
                              Courses
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logoutUser} className="flex items-center gap-2 cursor-pointer text-red-600">
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" onClick={() => navigate("/login")} className="font-medium">
                  Login
                </Button>
                <Button onClick={() => navigate("/login")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileNavbar user={user} logoutUser={logoutUser} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutUser }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="hover:bg-gray-100">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-white p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                  <School className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                  E-Learning
                </span>
              </SheetTitle>
              <SheetClose asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <X className="w-5 h-5" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {user ? (
              <div className="px-6 py-4">
                <div className="flex items-center gap-3 mb-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <Avatar className="w-12 h-12 ring-2 ring-blue-500">
                    <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  {user.role !== "instructor" && (
                    <>
                      <button
                        onClick={() => handleNavigation("/")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      >
                        <School className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">Explore Courses</span>
                      </button>
                      <button
                        onClick={() => handleNavigation("/my-learning")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      >
                        <BookOpen className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">My Learning</span>
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Edit Profile</span>
                  </button>

                  {user.role === "instructor" && (
                    <>
                      <Separator className="my-3" />
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Instructor
                      </div>
                      <button
                        onClick={() => handleNavigation("/admin/dashboard")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-left"
                      >
                        <LayoutDashboard className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Dashboard</span>
                      </button>
                      <button
                        onClick={() => handleNavigation("/admin/course")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-left"
                      >
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Courses</span>
                      </button>
                    </>
                  )}
                </nav>
              </div>
            ) : (
              <div className="px-6 py-4 space-y-3">
                <Button
                  onClick={() => handleNavigation("/login")}
                  variant="outline"
                  className="w-full justify-center"
                >
                  Login
                </Button>
                <Button
                  onClick={() => handleNavigation("/login")}
                  className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {!user && (
            <div className="px-6 py-4 space-y-3">
              <Button
                onClick={() => handleNavigation("/login")}
                variant="outline"
                className="w-full justify-center"
              >
                Login
              </Button>
              <Button
                onClick={() => handleNavigation("/login")}
                className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Sign Up
              </Button>
            </div>
          )}

          {user && (
            <div className="border-t p-4">
              <Button
                onClick={() => {
                  logoutUser();
                  setOpen(false);
                }}
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Log Out
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
