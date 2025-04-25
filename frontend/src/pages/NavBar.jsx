import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { uToken,userData,fetchUser } = useContext(UserContext);
  const [navOpen, setNavOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);
  const closeNav = () => setNavOpen(false);

  useEffect(() => {
    if(uToken){
      fetchUser();
    }
  },[uToken])

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black bg-opacity-50 backdrop-blur-md text-white">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-2xl text-yellow-400 font-bold tracking-wide">SportsHive</div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleNav}>
          {navOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <Link to="/all-ground" className="hover:text-yellow-400 transition-colors">Find Ground</Link>
          <Link to="/coach-list" className="hover:text-yellow-400 transition-colors">Find Coach</Link>
          <Link to="/sports" className="hover:text-yellow-400 transition-colors">Explore Sports</Link>
          <Link to="/CompetitionPage" className="hover:text-yellow-400 transition-colors">Competitions</Link>
          <Link to="/club" className="hover:text-yellow-400 transition-colors">Clubs</Link>
          <Link to="/sports-academy" className="hover:text-yellow-400 transition-colors">Academy</Link>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMore(!showMore)}
              className="hover:text-yellow-400 transition-colors"
            >
              More ▾
            </button>
            {showMore && (
              <div className="absolute top-full left-0 mt-2 bg-black bg-opacity-90 border border-yellow-400 rounded shadow-lg text-sm z-50">
                <Link
                  to="/about-us"
                  className="block px-4 py-2 hover:bg-yellow-400 hover:text-black"
                  onClick={() => setShowMore(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 hover:bg-yellow-400 hover:text-black"
                  onClick={() => setShowMore(false)}
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Profile/Login Button */}
        <div className="hidden md:block">
          {uToken ? (
            <Link to="/profile">
              <img
                src={`${userData.image}`}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-white hover:scale-105 transition-transform"
              />
            </Link>
          ) : (
            <Link to="/login" className="bg-yellow-400 text-black px-4 py-1.5 rounded-md font-semibold hover:bg-yellow-300 transition-all">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 text-base bg-black bg-opacity-80">
          <Link to="/" className="block hover:text-yellow-400" onClick={closeNav}>Home</Link>
          <Link to="/grounds" className="block hover:text-yellow-400" onClick={closeNav}>Find Ground</Link>
          <Link to="/coaches" className="block hover:text-yellow-400" onClick={closeNav}>Find Coach</Link>
          <Link to="/sports" className="block hover:text-yellow-400" onClick={closeNav}>Explore Sports</Link>
          <Link to="/competitions" className="block hover:text-yellow-400" onClick={closeNav}>Competitions</Link>
          <Link to="/clubs" className="block hover:text-yellow-400" onClick={closeNav}>Clubs</Link>
          <Link to="/academy" className="block hover:text-yellow-400" onClick={closeNav}>Academy</Link>
          <Link to="/about" className="block hover:text-yellow-400" onClick={closeNav}>About Us</Link>
          <Link to="/contact" className="block hover:text-yellow-400" onClick={closeNav}>Contact Us</Link>
          {uToken ? (
            <Link to="/profile" className="block hover:text-yellow-400" onClick={closeNav}>Profile</Link>
          ) : (
            <Link to="/login" className="block hover:text-yellow-400" onClick={closeNav}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
