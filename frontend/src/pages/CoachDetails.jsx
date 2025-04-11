import React, { useContext } from "react";
import { CoachContext } from "../context/Coachcontext";

const CoachDetails = () => {
  const {
    fullName,
    profile,
    DOB,
    gender,
    NIC,
    NIC_photo,
    contactNo,
    HomeTP,
    whatsapp,
    email,
    Line1,
    Line2,
    city,
    district,
    selectionType,
    school_Academics,
    sport,
    qualifications,
    qualifications_photo,
  } = useContext(CoachContext);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Filled Details</h1>

      {/* Profile Image on Top */}
      {profile && (
        <div className="flex flex-col items-center">
          <img
            src={
              profile instanceof File ? URL.createObjectURL(profile) : profile
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-md object-cover"
          />
        </div>
      )}

      {/* Personal Info */}
      <div className="border border-gray-300 rounded-lg p-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Personal Info
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <strong>Full Name: </strong>
            {fullName}
          </p>
          <p>
            <strong>Date of Birth:</strong> {DOB}
          </p>
          <p>
            <strong>Gender:</strong> {gender}
          </p>
          <p>
            <strong>NIC:</strong> {NIC}
          </p>
        </div>
        {NIC_photo && (
          <div className="mt-2">
            <p className="font-medium">NIC Photo:</p>
            <p className="text-blue-600 underline">{NIC_photo.name}</p>
          </div>
        )}
      </div>

      {/* Contact Details */}
      <div className="border border-gray-300 rounded-lg p-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Contact Details
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <strong>Contact No:</strong> {contactNo}
          </p>
          <p>
            <strong>Home TP:</strong> {HomeTP}
          </p>
          <p>
            <strong>WhatsApp:</strong> {whatsapp}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>
      </div>

      {/* Address */}
      <div className="border border-gray-300 rounded-lg p-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Address
        </h3>
        <div className=" text-sm text-gray-700">
          <p>
            <strong>Address: </strong>
            {Line1} {Line2}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>City: </strong>{city}</p>
              <p><strong>District: </strong>
              {district}
            </p> 
          </div>
        </div>
      </div>

      {/* Coach Selection Details */}
      <div className="border border-gray-300 rounded-lg p-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
          Coach Selection Details
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <p>
            <strong>Selection Type:</strong> {selectionType}
          </p>
          <p>
            <strong>School/Academic:</strong> {school_Academics}
          </p>
          <p>
            <strong>Sport:</strong> {sport}
          </p>
        </div>
        <div className="mt-2">
          <p className="font-medium text-sm text-gray-700">Qualifications:</p>
          <p className="text-gray-600">{qualifications}</p>
        </div>
        {qualifications_photo && (
          <div className="mt-2">
            <p className="font-medium">Qualifications Document:</p>
            <p className="text-blue-600 underline">
              {qualifications_photo.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachDetails;
