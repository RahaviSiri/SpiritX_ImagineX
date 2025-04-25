import React, { useContext, useEffect, useState } from "react";
import { GroundContext } from "../context/GroundContext";
import { FaSearch, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllGrounds = () => {
  const { getAllGrounds, grounds } = useContext(GroundContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredGrounds, setFilteredGrounds] = useState([]);
  const navigate = useNavigate();

  const applyFilter = () => {
    let filtered = grounds;

    if (selectedCategory) {
      filtered = filtered.filter(
        (ground) =>
          ground.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((ground) =>
        ground.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGrounds(filtered);
  };

  useEffect(() => {
    getAllGrounds();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [searchTerm, grounds, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(prev => (prev === category ? null : category));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-24 pb-4 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-yellow-400 drop-shadow-lg">
          Explore All Grounds
        </h2>
        <div className="flex items-center w-full sm:w-auto bg-gray-800 border border-yellow-400 rounded-full px-4 py-2 shadow-md">
          <FaSearch className="text-yellow-400 mr-2" />
          <input
            type="text"
            placeholder="Search by location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Filter Toggle for mobile */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setShowFilter(prev => !prev)}
          className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold"
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <div
          className={`flex flex-col gap-2 text-sm w-full sm:w-auto lg:w-1/4 ${showFilter ? "flex" : "hidden sm:flex"
            }`}
        >
          {["All Grounds", "sports", "indoor", "outdoor"].map((cat, idx) => {
            const isActive = selectedCategory === (cat === "All Grounds" ? null : cat);
            return (
              <p
                key={idx}
                onClick={() => handleCategoryClick(cat === "All Grounds" ? null : cat)}
                className={`cursor-pointer px-4 py-2 rounded-full transition duration-300 text-center ${isActive
                    ? "bg-yellow-400 text-black font-semibold"
                    : "bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
                  }`}
              >
                {cat === "All Grounds" ? "All Grounds" : cat.charAt(0).toUpperCase() + cat.slice(1) + " Grounds"}
              </p>
            );
          })}

          {/* Add Ground CTA */}
          <div className="mt-4 bg-gray-800 p-4 rounded-xl text-center">
            <p className="text-sm mb-2">Want to list your ground?</p>
            <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-500 transition" onClick={() => navigate("/add-ground")}>
              Join with Us
            </button>
          </div>
        </div>

        {/* Grounds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">

          {filteredGrounds?.length > 0 ? (
            filteredGrounds.map((ground, index) => (

              <div
                key={index}
                onClick={() => navigate(`/ground-details/${ground._id}`)}
                className="bg-gray-800 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-700"
              >
                <img
                  src={ground.image}
                  alt={ground.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-yellow-400">{ground.name}</h2>
                  <p className="text-sm text-gray-300">{ground.address}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 capitalize">
                      {ground.category}
                    </span>

                    {ground.verified ? (
                      <span className="flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        <FaCheckCircle /> Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
                        <FaTimesCircle /> Not Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No grounds found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllGrounds;
