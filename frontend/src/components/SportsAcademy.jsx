import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { AcademyContext } from "../context/AcademyContext";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

const SportsAcademy = () => {
  const navigate = useNavigate();
  const { uToken } = useContext(UserContext);
  const { academies, getAllAcademies, setAcademies } = useContext(AcademyContext);

  useEffect(() => {
    getAllAcademies();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-16 px-4">
      {/* Main content */}
      <div className="w-full min-h-screen bg-black/60 p-6 rounded-xl shadow-xl">
        {/* Header */}
        <h2 className="text-3xl font-bold text-yellow-400 drop-shadow-lg mb-2 text-center">
          Discover Sports Academies
        </h2>
        <p className="text-lg text-center text-gray-300 mb-10">
          Explore a variety of sports academies and find the best fit for your
          training needs.
        </p>

        {/* Academies List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {academies.length === 0 ? (
            <div className="text-center col-span-full py-10 text-white">
              <h2 className="text-xl font-semibold mb-2">No academies found</h2>
              <p className="text-gray-300">
                Try adjusting your search criteria or check back later.
              </p>
            </div>
          ) : (
            academies.map((academy) => {
              return (
                <div
                  key={academy._id}
                  onClick={() => navigate(`/academy/${academy._id}`)}
                  className="bg-gray-800 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border border-yellow-400"
                >
                  <div className="flex flex-col items-center p-6">
                    <img
                      src={academy.academyBasicDetails.picture}
                      alt="Academy"
                      className="w-full h-40 object-cover rounded-xl mb-3"
                    />
                    <img
                      src={academy.academyBasicDetails.academyLogo}
                      alt="Academy Logo"
                      className="w-12 h-12 rounded-full border-4 border-yellow-400 mb-3"
                    />
                    <h3 className="text-lg font-bold text-yellow-300">
                      {academy.academyBasicDetails.academyName}
                    </h3>
                    <p className="text-gray-300 text-sm text-center">
                      {academy.academyBasicDetails.description}
                    </p>
                    <div className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      {academy.academyBasicDetails.sportType}
                    </div>
                    <p className="text-gray-300 text-sm mt-2">
                      <strong>Mode:</strong> {academy.academyBasicDetails.mode}
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      <strong>Location:</strong> {academy.Address.city},{" "}
                      {academy.Address.district}
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      <strong>Fee:</strong>{" "}
                      {academy.academyBasicDetails.feeAmount === 0
                        ? "Free"
                        : `Rs. ${academy.academyBasicDetails.feeAmount}`}
                    </p>
                    <p className="text-sm mt-2 flex items-center gap-2">
                      {academy.isApprove ? (
                        <span className="text-green-400 flex items-center gap-1">
                          <FaCheckCircle />
                          Verified
                        </span>
                      ) : (
                        <span className="text-yellow-400 flex items-center gap-1">
                          <FaHourglassHalf />
                          Pending Approval
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Fixed Apply for Listing button at left corner */}
      <div className="fixed bottom-10 right-4">
        <button
          className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-yellow-500 transition"
          onClick={() => {
            uToken ? navigate("/add-academy") : navigate("/login");
          }}
        >
          Apply for Listing
        </button>
      </div>
    </div>
  );
};

export default SportsAcademy;
