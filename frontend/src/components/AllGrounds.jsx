import React, { useContext, useEffect, useState } from "react";
import { GroundContext } from "../context/GroundContext";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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
    if (category === selectedCategory) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <p className="text-2xl text-blue-500 font-semibold">All Grounds</p>
        <div className="flex items-center border rounded-md px-3 py-1 shadow-sm w-full sm:w-auto border-blue-400 mt-3 md:mt-0">
          <FaSearch className="text-blue-400 mr-2" />
          <input
            type="text"
            placeholder="Enter the location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none text-sm w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Filter Toggle Button for small screens */}
      <div className="sm:hidden mb-4">
        <button
          className="py-1 px-3 border rounded text-sm mt-1 border-blue-300"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {showFilter ? "Hide Filter" : "Show Filter"}
        </button>
      </div>

      {/* Main Content: Filter + Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <div
          className={`flex flex-col gap-3 text-sm text-gray-600 w-full sm:w-auto lg:w-1/4 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() => handleCategoryClick(null)}
            className={`cursor-pointer px-4 py-2 border rounded ${
              selectedCategory === null ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            All Grounds
          </p>
          <p
            onClick={() => handleCategoryClick("sports")}
            className={`cursor-pointer px-4 py-2 border rounded ${
              selectedCategory === "sports" ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            Sports Grounds
          </p>
          <p
            onClick={() => handleCategoryClick("indoor")}
            className={`cursor-pointer px-4 py-2 border rounded ${
              selectedCategory === "indoor" ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            Indoor Grounds
          </p>
          <p
            onClick={() => handleCategoryClick("outdoor")}
            className={`cursor-pointer px-4 py-2 border rounded ${
              selectedCategory === "outdoor" ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            Outdoor Grounds
          </p>
        </div>

        {/* Ground Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
          {filteredGrounds?.map((ground, index) => (
            <div
              key={index}
              onClick={() => navigate(`/ground-details/${ground._id}`)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200"
            >
              <img
                src={ground.image}
                alt={ground.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {ground.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{ground.address}</p>

                <span className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 capitalize mr-3 ">
                  {ground.category}
                </span>
                {ground.verified ? (
                  <span className="inline-flex items-center gap-1 mt-3 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
                    <FaCheckCircle /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 mt-3 px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                    <FaTimesCircle /> Not Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllGrounds;
