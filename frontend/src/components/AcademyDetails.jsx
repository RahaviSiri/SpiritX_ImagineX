import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AcademyContext } from "../context/AcademyContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

// Format date
const formatDateWithOrdinal = (dateStr) => {
  if (!dateStr) return "Not provided";

  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Get ordinal suffix
  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return `${day}${getOrdinal(day)} ${month} ${year}`;
};


const AcademyDetails = () => {
  const { id } = useParams();
  const { getAcademy, academy } = useContext(AcademyContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedStartDate, setSelectedStartDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAcademy(id); // fetches and sets academy in context
      } catch (err) {
        setError("Academy not found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, getAcademy]);

  if (error || !academy) {
    return <p>Error: {error || "Academy not found."}</p>;
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
          src={academy.academyBasicDetails.picture}
          alt={academy.academyBasicDetails.academyName}
          className="w-full h-56 object-cover rounded-xl mb-6"
        />

        {/* Academy Logo & Name */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={academy.academyBasicDetails.academyLogo}
            alt={academy.academyBasicDetails.academyName}
            className="w-14 h-14 object-cover rounded-full border"
          />
          <h2 className="text-3xl font-semibold">{academy.academyBasicDetails.academyName}</h2>
        </div>

        {/* Short Description */}
        <p className="text-lg text-gray-600 mb-4">
          {/* <strong>Description: </strong> */}
          {academy.academyBasicDetails.shortDescription}
        </p>

        {/* Full Description */}
        {/* <h3 className="text-xl font-semibold text-gray-800 mb-3">Full Description:</h3> */}
        <p className="text-gray-700">{academy.academyBasicDetails.description}</p>

        {/* Additional Details */}
        <div className="mt-6 text-gray-700">
          <p><strong>Sport Type:</strong> {academy.academyBasicDetails.sportType}</p>
          <p><strong>Mode:</strong> {academy.academyBasicDetails.mode}</p>
          <p><strong>Duration:</strong> {academy.academyBasicDetails.duration}</p>
          <p><strong>Instructors:</strong> {academy.academyBasicDetails.instructors}</p>
          <p>
            <strong>Start Date:</strong>{" "}
            {academy.academyBasicDetails.startDate
              ? formatDateWithOrdinal(academy.academyBasicDetails.startDate)
              : "According to the user's preference"}
          </p>
          <p><strong>Fee:</strong> {academy.academyBasicDetails.feeAmount === 0 ? "Free" : `Rs. ${academy.academyBasicDetails.feeAmount}`}</p>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate(`/apply/${academy._id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl"
        >
          Apply for Academy
        </button>
      </div>

    </div>
    
  );
};

export default AcademyDetails;
