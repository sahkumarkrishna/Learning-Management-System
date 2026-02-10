import { CheckCircle } from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop"
              alt="Students learning"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-2xl"></div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Learn Anytime, Anywhere
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Access world-class courses from the comfort of your home. Our platform offers flexible learning options tailored to your schedule.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Lifetime Access</h3>
                  <p className="text-gray-600">Learn at your own pace with unlimited access to course materials</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Expert Support</h3>
                  <p className="text-gray-600">Get help from instructors and community whenever you need it</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Certificates</h3>
                  <p className="text-gray-600">Earn recognized certificates upon course completion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
