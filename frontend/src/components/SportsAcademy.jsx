import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AcademyContext } from "../context/AcademyContext";

const SportsAcademy = () => {
  const navigate = useNavigate();
  const { academies, getAllAcademies } = useContext(AcademyContext);

  useEffect(() => {
    getAllAcademies();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Sports Academies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {academies.length > 0 ? (
          academies.map((academy) => (
            <div
              key={academy._id}
              className="bg-white shadow-md rounded-2xl p-4 cursor-pointer hover:shadow-xl transition-all"
              onClick={() => navigate(`/academy/${academy._id}`)}
            >
              <img
                src={academy.academyBasicDetails.picture}
                alt="Academy"
                className="w-full h-40 object-cover rounded-xl mb-3"
              />

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
                {academy.academyBasicDetails.shortDescription}
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
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No academies available.
          </p>
        )}
      </div>

      <button
        onClick={() => navigate("/add-academy")}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all"
      >
        Add Your Academy
      </button>
    </div>
  );
};

export default SportsAcademy;
