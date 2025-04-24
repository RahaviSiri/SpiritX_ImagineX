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
      className="flex justify-center items-center min-h-screen bg-gray-50  px-4 font-sans"
      style={{
        backgroundImage: `url(${assets.coach3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-3xl bg-black/50 p-8 rounded-2xl shadow-xl space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-4 sm:space-y-0">
          <img
            src={personal?.profile || "/default-avatar.png"}
            alt={personal?.fullName}
            className="w-32 h-32 rounded-full border-4 border-blue-300 shadow-md object-cover"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white">
              {personal?.fullName}
            </h2>
            <p className="text-lg text-blue-200">
              {selection?.sport} &mdash; {selection?.selectionType}
            </p>
          </div>
        </div>

        {/* Section: Personal Info */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white border-b border-blue-300 pb-1">
            Personal Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white mt-2">
            <p>
              <span className="font-semibold">NIC:</span> {personal?.NIC}
            </p>
            <p>
              <span className="font-semibold">DOB:</span>{" "}
              {personal?.DOB.split("T")[0]}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {personal?.gender}
            </p>
          </div>
        </div>

        {/* Section: Address */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white border-b border-blue-300 pb-1">
            Address
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white mt-2">
            <p>
              <span className="font-semibold">City:</span> {address?.city}
            </p>
            <p>
              <span className="font-semibold">District:</span>{" "}
              {address?.district}
            </p>
          </div>
        </div>

        {/* Section: Coach Selection Info */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white border-b border-blue-300 pb-1">
            Coach Selection Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white mt-2">
            <p>
              <span className="font-semibold">Salary:</span>{" "}
              {selection?.expected_Salary || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Qualifications:</span>{" "}
              {selection?.qualifications || "N/A"}
            </p>

            <p>
              <span className="font-semibold">Evidence:</span>{" "}
              {selection?.qualifications_photo ? (
                <a
                  href={selection.qualifications_photo}
                  target="_blank"
                  download
                  rel="noreferrer"
                  className="text-blue-300 underline"
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
        <div className="mt-8 text-center">
          <button
            className="w-full py-3 bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition"
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
