import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center">
                <img
                  src="logo.png"
                  alt="Exotic Money Logo"
                  className="h-16 w-30 object-contain rounded-full"
                />
                <span
                  className={`ml-2 text-xl font-bold ${isScrolled ? "text-teal-800" : "text-white"}`}
                >
                  Exotic Money Changers PVT LTD.
                </span>
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a
                href="#services"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isScrolled ? "text-gray-700 hover:text-teal-600" : "text-white hover:text-teal-200"}`}
              >
                Services
              </a>
              <a
                href="#calculator"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isScrolled ? "text-gray-700 hover:text-teal-600" : "text-white hover:text-teal-200"}`}
              >
                Exchange Calculator
              </a>
              <a
                href="#testimonials"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isScrolled ? "text-gray-700 hover:text-teal-600" : "text-white hover:text-teal-200"}`}
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="px-4 py-2 rounded-md text-sm font-medium bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-sm"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${isScrolled ? "text-gray-700" : "text-white"}`}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <a
            href="#services"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600"
            onClick={() => setIsOpen(false)}
          >
            Services
          </a>
          <a
            href="#calculator"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600"
            onClick={() => setIsOpen(false)}
          >
            Exchange Calculator
          </a>
          <a
            href="#testimonials"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600"
            onClick={() => setIsOpen(false)}
          >
            Testimonials
          </a>
          <a
            href="#contact"
            className="block px-3 py-2 rounded-md text-base font-medium bg-amber-500 text-white hover:bg-amber-600 text-center"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
