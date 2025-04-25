import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import assets from '../assets/assets';
import { MapPinned, CalendarCheck, Users } from 'lucide-react'; // Icons

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-950 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={assets.Logo} alt="Logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-white">SportsHive</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/all-grounds" className="flex items-center space-x-2 text-white hover:text-blue-600 font-medium transition duration-200">
              <MapPinned className="w-5 h-5" />
              <span>All Grounds</span>
            </Link>
            <Link to="/booked-grounds" className="flex items-center space-x-2 text-white hover:text-blue-600 font-medium transition duration-200">
              <CalendarCheck className="w-5 h-5" />
              <span>Booked Grounds</span>
            </Link>
            <Link to="/coach" className="flex items-center space-x-2 text-white hover:text-blue-600 font-medium transition duration-200">
              <Users className="w-5 h-5" />
              <span>Coaches</span>
            </Link>
            <Link to="/academy" className="flex items-center space-x-2 text-white hover:text-blue-600 font-medium transition duration-200">
              <MapPinned className="w-5 h-5" />
              <span>Academies</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-600 focus:outline-none transition"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/all-grounds" className="flex items-center space-x-2 text-white hover:text-blue-600 font-medium transition duration-200">
            <MapPinned className="w-5 h-5" />
            <span>All Grounds</span>
          </Link>
          <Link to="/booked-grounds" className="flex items-center space-x-2 text-white hover:text-blue-600 font-medium transition duration-200">
            <CalendarCheck className="w-5 h-5" />
            <span>Booked Grounds</span>
          </Link>
          <Link to="/coach" className="flex items-center space-x-2 text-white hover:text-blue-600 font-medium transition duration-200">
            <Users className="w-5 h-5" />
            <span>Coaches</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
