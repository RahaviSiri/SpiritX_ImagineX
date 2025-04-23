import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for HTTP requests

const SportsAcademies = () => {
  const navigate = useNavigate();
  
  const [academies, setAcademies] = useState([]);  // State to store fetched academies
  const [loading, setLoading] = useState(true);    // State to handle loading
  const [error, setError] = useState(null);        // State to handle errors

  useEffect(() => {
    // Function to fetch academies from backend
    const fetchAcademies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/academies/get-all-academies");  // Replace with your actual API endpoint
        setAcademies(response.data.academies);
      } catch (err) {
        setError("Failed to load academies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // You can replace with a loading spinner or placeholder
  }

  if (error) {
    return <div>{error}</div>;  // Display error message if fetching fails
  }

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
