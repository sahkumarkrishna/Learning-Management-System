import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, TrendingUp, Award } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white text-sm font-medium">Start Your Learning Journey Today</span>
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Next
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Big Opportunity
            </span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Learn from industry experts and transform your career with our comprehensive courses
          </p>
        </div>

        <form onSubmit={searchHandler} className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden p-2">
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for courses, skills, or topics..."
              className="flex-1 border-none focus-visible:ring-0 px-4 py-3 text-gray-900"
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold"
            >
              Search
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => navigate(`/course/search?query`)}
            variant="outline"
            className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 rounded-full px-6"
          >
            Explore All Courses
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Expert Instructors</h3>
            <p className="text-white/80 text-sm">Learn from industry professionals</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Flexible Learning</h3>
            <p className="text-white/80 text-sm">Study at your own pace</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Lifetime Access</h3>
            <p className="text-white/80 text-sm">Access courses anytime, anywhere</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
