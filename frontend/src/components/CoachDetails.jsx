import React, { useContext, useEffect } from "react";
import { CoachContext } from "../context/Coachcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CoachDetails = () => {
  const navigate = useNavigate();
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
    backend_url,
    token,
    setToken,
    userData,
    fetchCoach,
    fetchCoaches,
  } = useContext(CoachContext);

  // In CoachDetails.js, update the handleSubmit function:
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("fullName", fullName);

      // Handle profile image properly
      if (profile instanceof window.File) {
        formData.append("profile", profile);
      } else if (typeof profile === "string" && profile.startsWith("data:")) {
        // Convert base64 back to File
        const fetchRes = await fetch(profile);
        const blob = await fetchRes.blob();
        formData.append(
          "profile",
          new File(
            [blob],
            localStorage.getItem("coachProfile_name") || "profile.jpg"
          )
        );
      }

      // Similar handling for other files
      if (NIC_photo instanceof window.File) {
        formData.append("NIC_photo", NIC_photo);
      } else if (
        typeof NIC_photo === "string" &&
        NIC_photo.startsWith("data:")
      ) {
        const fetchRes = await fetch(NIC_photo);
        const blob = await fetchRes.blob();
        formData.append(
          "NIC_photo",
          new File([blob], localStorage.getItem("NIC_name") || "nic.jpg")
        );
      }

      if (qualifications_photo instanceof window.File) {
        formData.append("qualifications_photo", qualifications_photo);
      } else if (
        typeof qualifications_photo === "string" &&
        qualifications_photo.startsWith("data:")
      ) {
        const fetchRes = await fetch(qualifications_photo);
        const blob = await fetchRes.blob();
        formData.append(
          "qualifications_photo",
          new File(
            [blob],
            localStorage.getItem("quali_name") || "qualification.pdf"
          )
        );
      }

      // Handle other form fields
      formData.append("DOB", DOB);
      formData.append("gender", gender);
      formData.append("NIC", NIC);
      formData.append("contactNo", contactNo);
      formData.append("HomeTP", HomeTP);
      formData.append("whatsapp", whatsapp);
      formData.append("email", email);
      formData.append("Line1", Line1);
      formData.append("Line2", Line2);
      formData.append("city", city);
      formData.append("district", district);
      formData.append("selectionType", selectionType);
      formData.append("school_Academics", school_Academics);
      formData.append("sport", sport);
      formData.append("qualifications", qualifications);

      const { data: response } = await axios.post(
        `${backend_url}/api/coach/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.success) {
        localStorage.removeItem("coachProfile");
        localStorage.removeItem("coachProfile_name");
        localStorage.removeItem("coachNIC");
        localStorage.removeItem("NIC_name");
        localStorage.removeItem("coachQual");
        localStorage.removeItem("quali_name");
        toast.success(response.message);
        navigate("/coach-wait-for-approval");
        localStorage.setItem("token", response.token);
        setToken(response.token);
        
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      
      toast.error(error.message);
    }
  };

  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Filled Details
      </h1>

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
            <p className="text-blue-600 underline">
              {NIC_photo instanceof File
                ? NIC_photo.name
                : localStorage.getItem("NIC_name") || "NIC Document"}
            </p>
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
              <strong>City: </strong>
              {city}
            </p>
            <p>
              <strong>District: </strong>
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
              {qualifications_photo instanceof File
                ? qualifications_photo.name
                : localStorage.getItem("quali_name") ||
                  "Qualification Document"}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-6 space-x-4">
        <button
          onClick={() => navigate("/coach-registration")}
          type="button"
          className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CoachDetails;
