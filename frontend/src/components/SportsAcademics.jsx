import React from "react";
import { useNavigate } from "react-router-dom";

const academies = [
  {
    _id: "1",
    academyBasicDetails: {
      academyName: "Elite Soccer Academy",
      academyLogo: "/logos/soccer.png", // Logo
      picture: "/pictures/soccer-banner.jpg", // Picture
      sportType: "Football",
      description: "Top-tier training for aspiring footballers.",
      duration: "3 months",
      instructors: "John Doe, Jane Smith",
      feeAmount: 300,
      mode: "Physical",
      isFlexible: false,
      startDate: "2025-05-10",
    },
    Address: {
      Line1: "123 Sports Lane",
      city: "London",
      district: "Greater London",
    },
    contactDetails: {
      contactNo: "1234567890",
      whatsapp: "1234567890",
      email: "elite@soccer.com",
    },
  },
  {
    _id: "2",
    academyBasicDetails: {
      academyName: "Soccer Academy",
      academyLogo: "/logos/soccer.png",
      picture: "/pictures/soccer-online.jpg",
      sportType: "Football",
      description: "Top-tier training for aspiring footballers.",
      duration: "3 months",
      instructors: "Jane Smith",
      feeAmount: 0,
      mode: "Online",
      isFlexible: true,
      startDate: "According to your preference",
    },
    Address: {
      Line1: "123 Sports Lane",
      city: "London",
      district: "Greater London",
    },
    contactDetails: {
      contactNo: "1234567890",
      whatsapp: "1234567890",
      email: "elite@soccer.com",
    },
  },
];

const SportsAcademies = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Sports Academies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {academies.map((academy) => (
          <div
            key={academy._id}
            className="bg-white shadow-md rounded-2xl p-4 cursor-pointer hover:shadow-xl transition-all"
            onClick={() => navigate(`/academies/${academy._id}`)}
          >
            {/* Academy Picture */}
            <img
              src={academy.academyBasicDetails.picture}
              alt="Academy"
              className="w-full h-40 object-cover rounded-xl mb-3"
            />

            {/* Academy Logo & Name */}
            <div className="flex items-center gap-3 mb-2">
              <img
                src={academy.academyBasicDetails.academyLogo}
                alt="Logo"
                className="w-10 h-10 object-cover rounded-full border"
              />
              <h2 className="text-xl font-semibold">
                {academy.academyBasicDetails.academyName}
              </h2>
            </div>

            <p className="text-gray-600 mb-2">
              {academy.academyBasicDetails.description}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Sport:</strong> {academy.academyBasicDetails.sportType}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Mode:</strong> {academy.academyBasicDetails.mode}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Location:</strong> {academy.Address.city},{" "}
              {academy.Address.district}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Fee:</strong>{" "}
              {academy.academyBasicDetails.feeAmount === 0
                ? "Free"
                : `Rs. ${academy.academyBasicDetails.feeAmount}`}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/apply-academics")}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all"
      >
        Apply for Listing
      </button>
    </div>
  );
};

export default SportsAcademies;
