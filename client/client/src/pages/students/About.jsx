import { Award, Users, BookOpen, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              About E-Learning Platform
            </h2>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              Welcome to our comprehensive e-learning platform, where education meets innovation. We are dedicated to providing high-quality online courses that empower learners worldwide to achieve their personal and professional goals.
            </p>
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              Our platform brings together expert instructors, cutting-edge technology, and a supportive community to create an unparalleled learning experience. Whether you're looking to advance your career, learn new skills, or explore your passions, we offer diverse courses tailored to your needs.
            </p>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              With flexible schedules, lifetime access, and recognized certifications, we make quality education accessible to everyone. Join thousands of successful learners transforming their lives today.
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
              alt="E-Learning Platform"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-2xl"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Instructors</h3>
            <p className="text-gray-600">Learn from industry professionals with years of experience</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Active Community</h3>
            <p className="text-gray-600">Join thousands of learners worldwide</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Content</h3>
            <p className="text-gray-600">Access to premium courses and materials</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Career Growth</h3>
            <p className="text-gray-600">Boost your skills and advance your career</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
