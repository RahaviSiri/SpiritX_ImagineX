import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CoachContext } from "../context/Coachcontext";

const CoachProfile = () => {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const { backend_url } = useContext(CoachContext);

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
  }, [id]);

  if (!coach)
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading coach details...
      </p>
    );

  const personal = coach.personalInfo || {};
  const address = coach.Address || {};
  const selection = coach.coachSelection || {};
  const contact = coach.contactDetails || {};
  const publicId = coach.personalInfo?.profile; // e.g. "coach_images/profile123"
  const imageUrl = `https://res.cloudinary.com/dmdej2vts/image/upload/${publicId}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white rounded-3xl shadow-lg mt-10">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 space-y-4 sm:space-y-0">
        <img
          src={personal?.profile || "/default-avatar.png"}
          alt={personal?.fullName}
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-extrabold text-gray-800">
            {personal?.fullName}
          </h2>
          <p className="text-lg text-gray-600">
            {selection?.sport} &mdash; {selection?.selectionType}
          </p>
        </div>
      </div>

      {/* Section: Personal Info */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-blue-600 mb-2 border-b pb-1">
          Personal Info
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">NIC:</span> {personal?.NIC}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {personal?.gender}
          </p>
        </div>
      </div>

      {/* Section: Contact Details */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-blue-600 mb-2 border-b pb-1">
          Contact Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Email:</span> {contact?.email}
          </p>
          <p>
            <span className="font-semibold">WhatsApp:</span> {contact?.whatsapp}
          </p>
          <p>
            <span className="font-semibold">Contact No:</span>{" "}
            {contact?.contactNo}
          </p>
          <p>
            <span className="font-semibold">Home Telephone:</span>{" "}
            {contact?.HomeTP}
          </p>
        </div>
      </div>

      {/* Section: Address */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-blue-600 mb-2 border-b pb-1">
          Address
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Address:</span> {address?.Line1}{" "}
            {address?.Line2 ? `, ${address?.Line2} ` : `${address?.Line2}`}{" "}
          </p>
          <p>
            <span className="font-semibold">City:</span> {address?.city}
          </p>
          <p>
            <span className="font-semibold">District:</span> {address?.district}
          </p>
        </div>
      </div>

      {/* Section: Coach Selection Info */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-blue-600 mb-2 border-b pb-1">
          Coach Selection Info
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Qualifications:</span>{" "}
            {selection?.qualifications}
          </p>
          <p>
            <span className="font-semibold">Evidence:</span>
            {selection?.qualifications_photo ? (
              <a
                href={selection.qualifications_photo}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
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
      <div className="mt-10 text-center">
        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 transition duration-300">
          Book Coach
        </button>
      </div>
    </div>
  );
};

export default CoachProfile;
