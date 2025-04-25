import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets.js";
import FeatureCards from "../components/FeatureCards";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Banner Section */}
      <div
        className="w-full h-[600px] sm:h-[700px] md:h-[800px] bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url(${assets.Banner})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Banner Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg">
            Discover. Connect. Play.
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-md sm:max-w-xl">
            Discover and book sports grounds, find expert coaches, explore different sports, join competitions, and connect with sports communities.
          </p>
          <Link
            to="/all-ground"
            className="px-5 py-2 sm:px-6 sm:py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Feature Cards Section */}
      <FeatureCards />
    </div>
  );
};

export default Home;
