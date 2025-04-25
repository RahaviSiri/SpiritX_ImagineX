import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { uToken, userData, fetchUser } = useContext(UserContext);
  const [navOpen, setNavOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);
  const closeNav = () => {
    setNavOpen(false);
    setShowMore(false);
  };

  useEffect(() => {
    fetchUser();
  }, [uToken]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Find Ground", to: "/all-ground" },
    { label: "Find Coach", to: "/coach-list" },
    { label: "Explore Sports", to: "/sports" },
    { label: "Competitions", to: "/CompetitionPage" },
    { label: "Clubs", to: "/club" },
    { label: "Academy", to: "/sports-academy" },
  ];

  const moreLinks = [
    { label: "About Us", to: "/about-us" },
    { label: "Contact Us", to: "/contact" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black bg-opacity-60 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-4">
        <Link to="/" className="text-2xl text-yellow-400 font-bold tracking-wide">
          SportsHive
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleNav}>
          {navOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="hover:text-yellow-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}

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
                {moreLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.to}
                    className="block px-4 py-2 hover:bg-yellow-400 hover:text-black"
                    onClick={() => setShowMore(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profile/Login - Desktop */}
        <div className="hidden md:block">
          {uToken ? (
            <Link to="/profile">
              <img
                src={userData?.image || "/default-profile.png"}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-white hover:scale-105 transition-transform"
              />
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 text-black px-4 py-1.5 rounded-md font-semibold hover:bg-yellow-300 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="md:hidden px-6 pb-6 bg-black bg-opacity-90 space-y-4 text-base">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="block hover:text-yellow-400"
              onClick={closeNav}
            >
              {link.label}
            </Link>
          ))}
          {moreLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="block hover:text-yellow-400"
              onClick={closeNav}
            >
              {link.label}
            </Link>
          ))}
          {uToken ? (
            <Link
              to="/profile"
              className="block hover:text-yellow-400"
              onClick={closeNav}
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="block hover:text-yellow-400"
              onClick={closeNav}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
