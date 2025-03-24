import React from "react";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, User, Heart, Menu } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full">
      {/* Top nav - Promo/Help */}
      <div className="bg-gray-100 py-2 px-4 text-xs text-center">
        <div className="container mx-auto flex justify-between">
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">Join Us</a>
            <a href="#" className="hover:underline">Sign In</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#">
              <svg className="h-6 w-12" viewBox="0 0 69 32" fill="black">
                <path d="M68.56 4L18.4 25.36Q18.16 25.52 17.92 25.62T17.4 25.76T16.96 25.84T16.56 25.86T16.16 25.84T15.72 25.76T15.2 25.62T14.72 25.36L0 16.32L0.56 14.8Q0.96 14 1.68 13.48T3.4 12.96Q4.16 12.96 4.76 13.28T6.32 14.24L16.56 21.28L61.84 1.84Q62.32 1.6 62.8 1.44T63.84 1.28Q64.72 1.28 65.48 1.64T66.8 2.4T67.6 3.44T68.56 4Z" />
              </svg>
            </a>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex gap-6 mx-4 flex-1 justify-center">
            <a href="#" className="text-sm font-medium hover:text-gray-600">New & Featured</a>
            <a href="#" className="text-sm font-medium hover:text-gray-600">Men</a>
            <a href="#" className="text-sm font-medium hover:text-gray-600">Women</a>
            <a href="#" className="text-sm font-medium hover:text-gray-600">Kids</a>
            <a href="#" className="text-sm font-medium hover:text-gray-600">Sale</a>
            <a href="#" className="text-sm font-medium hover:text-gray-600">SNKRS</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center relative bg-gray-100 rounded-full">
              <Search className="absolute left-3 h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search" 
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none"
              />
            </div>

            {/* Icons */}
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
