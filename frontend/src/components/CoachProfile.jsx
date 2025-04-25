import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CoachContext } from "../context/Coachcontext";
import assets from "../assets/assets.js";

const CoachProfile = () => {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const { backend_url } = useContext(CoachContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoachById = async () => {
      try {
        const { data } = await axios.get(
          `${backend_url}/api/coach/getCoachById/${id}`,
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          setCoach(data.coach);
        }
      } catch (error) {
        console.error("Error fetching coach details:", error.message);
      }
    };

    if (id && id !== "undefined") {
      fetchCoachById();
    }
  }, [id, backend_url]);

  if (!coach)
    return (
      <div
        className="flex justify-center items-center min-h-screen bg-gray-50 px-4 font-sans"
        style={{
          backgroundImage: `url(${assets.AddGroundBackroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p className="text-center text-white text-xl">
          Loading coach details...
        </p>
      </div>
    );

  const personal = coach.personalInfo || {};
  const address = coach.Address || {};
  const selection = coach.coachSelection || {};
  const contact = coach.contactDetails || {};

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4 py-10 font-sans"
      style={{
        backgroundImage: `url(${assets.coach3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-3xl bg-black/40 backdrop-blur-md mt-20 px-6 sm:px-10 pb-10 rounded-3xl shadow-2xl space-y-6 relative text-white">
        {/* Glowing orb effect */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-300 opacity-10 rounded-full blur-3xl pointer-events-none z-0" />
  
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
          <img
            src={personal?.profile || "/default-avatar.png"}
            alt={personal?.fullName}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-yellow-400 drop-shadow">
              {personal?.fullName}
            </h2>
            <p className="text-lg text-yellow-200">
              {selection?.sport} &mdash; {selection?.selectionType}
            </p>
          </div>
        </div>
  
        {/* Section: Personal Info */}
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-yellow-300 border-b border-yellow-500 pb-1">
            Personal Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <p>
              <span className="font-semibold text-yellow-200">NIC:</span>{" "}
              {personal?.NIC}
            </p>
            <p>
              <span className="font-semibold text-yellow-200">DOB:</span>{" "}
              {personal?.DOB.split("T")[0]}
            </p>
            <p>
              <span className="font-semibold text-yellow-200">Gender:</span>{" "}
              {personal?.gender}
            </p>
          </div>
        </div>
  
        {/* Section: Address */}
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-yellow-300 border-b border-yellow-500 pb-1">
            Address
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <p>
              <span className="font-semibold text-yellow-200">City:</span>{" "}
              {address?.city}
            </p>
            <p>
              <span className="font-semibold text-yellow-200">District:</span>{" "}
              {address?.district}
            </p>
          </div>
        </div>
  
        {/* Section: Coach Selection Info */}
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-yellow-300 border-b border-yellow-500 pb-1">
            Coach Selection Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <p>
              <span className="font-semibold text-yellow-200">Salary:</span>{" "}
              {selection?.expected_Salary || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-yellow-200">Qualifications:</span>{" "}
              {selection?.qualifications || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-yellow-200">Evidence:</span>{" "}
              {selection?.qualifications_photo ? (
                <a
                  href={selection.qualifications_photo}
                  target="_blank"
                  download
                  rel="noreferrer"
                  className="text-yellow-300 underline hover:text-yellow-400"
                >
                  View Document
                </a>
              ) : (
                "Not uploaded"
              )}
            </p>
          </div>
        </div>
  
        {/* Book Button */}
        <div className="mt-8 text-center relative z-10">
          <button
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black text-lg font-semibold rounded-xl transition duration-300 shadow-lg"
            onClick={() => navigate(`/client/${id}`)}
          >
            Book Coach
          </button>
        </div>
      </div>
    </div>
  );
  
  
};

export default CoachProfile;
