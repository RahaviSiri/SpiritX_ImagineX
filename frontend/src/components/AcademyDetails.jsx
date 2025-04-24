import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AcademyDetails = () => {
  const { id } = useParams(); // Get the academy ID from the URL
  const [academy, setAcademy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch academy details from the backend API
    const fetchAcademyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/academy/${id}`);
        if (!response.ok) {
          throw new Error("Academy not found");
        }
        const data = await response.json();
        setAcademy(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademyDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => window.history.back()}
        className="text-blue-600 mb-4 inline-block"
      >
        &larr; Back to Academies
      </button>
      <div className="bg-white shadow-md rounded-2xl p-6">
        {/* Academy Banner Picture */}
        <img
          src={academy.picture}
          alt={academy.academyName}
          className="w-full h-56 object-cover rounded-xl mb-6"
        />

        {/* Academy Logo & Name */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={academy.academyLogo}
            alt={academy.academyName}
            className="w-14 h-14 object-cover rounded-full border"
          />
          <h2 className="text-3xl font-semibold">
            {academy.academyName}
          </h2>
        </div>

        {/* Short Description */}
        <p className="text-lg text-gray-600 mb-4">
          <strong>Description: </strong>
          {academy.description}
        </p>

        {/* Full Description */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Full Description:</h3>
        <p className="text-gray-700">{academy.fullDescription}</p>

        {/* Additional Details */}
        <div className="mt-6 text-gray-700">
          <p><strong>Sport Type:</strong> {academy.sportType}</p>
          <p><strong>Mode:</strong> {academy.mode}</p>
          <p><strong>Duration:</strong> {academy.duration}</p>
          <p><strong>Instructors:</strong> {academy.instructors}</p>
          <p><strong>Start Date:</strong> {academy.startDate}</p>
          <p><strong>Fee:</strong> {academy.feeAmount === 0 ? "Free" : `Rs. ${academy.feeAmount}`}</p>
        </div>

        {/* Contact Details */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Details:</h3>
          <p><strong>Email:</strong> {academy.contactDetails.email}</p>
          <p><strong>Phone:</strong> {academy.contactDetails.contactNo}</p>
          <p><strong>WhatsApp:</strong> {academy.contactDetails.whatsapp}</p>
        </div>
      </div>
    </div>
  );
};

export default AcademyDetails;
