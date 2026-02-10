import { Users, BookOpen, Award, Star } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { icon: Users, value: "50K+", label: "Active Students" },
    { icon: BookOpen, value: "500+", label: "Courses Available" },
    { icon: Award, value: "100+", label: "Expert Instructors" },
    { icon: Star, value: "4.8", label: "Average Rating" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-white/90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
