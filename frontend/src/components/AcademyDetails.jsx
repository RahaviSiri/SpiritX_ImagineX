import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AcademyContext } from "../context/AcademyContext";
import { Loader } from "lucide-react";

// Format date
const formatDateWithOrdinal = (dateStr) => {
  if (!dateStr) return "Not provided";

  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAcademy(id);
      } catch (err) {
        setError("Academy not found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, getAcademy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-yellow-400">
        <Loader className="animate-spin w-8 h-8 mr-2" /> Loading academy
        details...
      </div>
    );
  }

  if (error || !academy) {
    return (
      <div className="text-center text-red-500 font-semibold pt-20">
        Error: {error || "Academy not found."}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-16 px-4">
      {/* Glow effect */}
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-yellow-300 opacity-10 rounded-full blur-3xl pointer-events-none z-0" />

      <button
        onClick={() => window.history.back()}
        className="text-yellow-400 mb-4 inline-block hover:underline"
      >
        &larr; Back to Academies
      </button>

      <div className="bg-black/60 p-6 rounded-2xl shadow-xl relative z-10">
        {/* Banner */}
        <img
          src={academy.academyBasicDetails.picture}
          alt={academy.academyBasicDetails.academyName}
          className="w-full h-56 object-cover rounded-xl mb-6"
        />

        {/* Logo & Title */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={academy.academyBasicDetails.academyLogo}
            alt={academy.academyBasicDetails.academyName}
            className="w-16 h-16 object-cover rounded-full border-2 border-yellow-400"
          />
          <h2 className="text-3xl font-bold text-yellow-400">
            {academy.academyBasicDetails.academyName}
          </h2>
        </div>

        {/* Descriptions */}
        <p className="text-lg text-gray-300 mb-4">
          {academy.academyBasicDetails.shortDescription}
        </p>
        <p className="text-gray-400">
          {academy.academyBasicDetails.description}
        </p>

        {/* Additional Info */}
        <div className="mt-6 grid gap-2 text-gray-300">
          <p>
            <strong className="text-yellow-400">Sport Type:</strong>{" "}
            {academy.academyBasicDetails.sportType}
          </p>
          <p>
            <strong className="text-yellow-400">Mode:</strong>{" "}
            {academy.academyBasicDetails.mode}
          </p>
          <p>
            <strong className="text-yellow-400">Duration:</strong>{" "}
            {academy.academyBasicDetails.duration}
          </p>
          <p>
            <strong className="text-yellow-400">Instructors:</strong>{" "}
            {academy.academyBasicDetails.instructors}
          </p>
          <p>
            <strong className="text-yellow-400">Start Date:</strong>{" "}
            {academy.academyBasicDetails.startDate
              ? formatDateWithOrdinal(academy.academyBasicDetails.startDate)
              : "According to the user's preference"}
          </p>
          <p>
            <strong className="text-yellow-400">Fee:</strong>{" "}
            {academy.academyBasicDetails.feeAmount === 0
              ? "Free"
              : `Rs. ${academy.academyBasicDetails.feeAmount}`}
          </p>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-6 text-center relative z-10">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate(`/client-academy/${academy._id}`);
          }}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow-md transition duration-300"
        >
          Apply for Academy
        </button>
      </div>
    </div>
  );
};

export default AcademyDetails;
