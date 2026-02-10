import { School, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <School className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">E-Learning</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Transform your future with quality education and expert instructors.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/course/search?query=" className="text-gray-400 hover:text-white transition-colors">Courses</Link></li>
              <li><Link to="/my-learning" className="text-gray-400 hover:text-white transition-colors">My Learning</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">Profile</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Data Science</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mobile Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Design</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>support@elearning.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>123 Learning St, Education City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} E-Learning. All rights reserved. Made with ❤️ for learners worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
