import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Shop and Help Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold mb-4">FIND A STORE</h3>
              <ul className="space-y-2 text-gray-400 text-xs">
                <li><a href="#" className="hover:text-white">Become a Member</a></li>
                <li><a href="#" className="hover:text-white">Sign Up for Email</a></li>
                <li><a href="#" className="hover:text-white">Send Us Feedback</a></li>
                <li><a href="#" className="hover:text-white">Student Discounts</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-4">GET HELP</h3>
              <ul className="space-y-2 text-gray-400 text-xs">
                <li><a href="#" className="hover:text-white">Order Status</a></li>
                <li><a href="#" className="hover:text-white">Delivery</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">Payment Options</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* About Nike */}
          <div>
            <h3 className="text-sm font-bold mb-4">ABOUT NIKE</h3>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li><a href="#" className="hover:text-white">News</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Investors</a></li>
              <li><a href="#" className="hover:text-white">Sustainability</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold mb-4">CATEGORIES</h3>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li><a href="#" className="hover:text-white">Running</a></li>
              <li><a href="#" className="hover:text-white">Basketball</a></li>
              <li><a href="#" className="hover:text-white">Football</a></li>
              <li><a href="#" className="hover:text-white">Gym and Training</a></li>
              <li><a href="#" className="hover:text-white">Lifestyle</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-gray-600">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between text-gray-400 text-xs">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <span>© 2025 Nike, Inc. All Rights Reserved</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-white">Guides</a>
            <a href="#" className="hover:text-white">Terms of Sale</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
