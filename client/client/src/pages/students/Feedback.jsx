import { Star, Quote } from "lucide-react";

const Feedback = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Web Developer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      feedback: "This platform transformed my career! The courses are well-structured and the instructors are amazing.",
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
      feedback: "Best investment I've made in my education. The quality of content is outstanding.",
    },
    {
      name: "Emily Rodriguez",
      role: "UI/UX Designer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 5,
      feedback: "I love the flexibility and the community support. Highly recommended!",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-600 text-lg">Join thousands of satisfied learners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-100" />
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full ring-2 ring-blue-500"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback;
