import React, { useContext, useEffect } from "react";
import { CoachContext } from "../context/Coachcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import assets from "../assets/assets.js";
// Helper to resolve File or URL to [href, displayName]
function resolveFileLink(input) {
  if (input instanceof window.File) {
    const blobUrl = URL.createObjectURL(input);
    return [blobUrl, input.name];
  } else {
    const parts = input.split("/");
    const name = parts[parts.length - 1] || input;
    return [input, name];
  }
}

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
    salary,
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

  // Submit form data to backend
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);

      // Profile image handling
      if (profile instanceof window.File) {
        formData.append("profile", profile);
      } else if (typeof profile === "string" && profile.startsWith("data:")) {
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

      // NIC photo handling
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

      // Qualifications document handling
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

      // Other fields
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
      formData.append("salary", salary);
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
        // Clear stored files
        localStorage.removeItem("coachProfile");
        localStorage.removeItem("coachProfile_name");
        localStorage.removeItem("coachNIC");
        localStorage.removeItem("NIC_name");
        localStorage.removeItem("coachQual");
        localStorage.removeItem("quali_name");

        toast.success(response.message);
        localStorage.setItem("Ctoken", response.Ctoken);
        setToken(response.Ctoken);
        navigate("/coach-wait-for-approval");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Clean up any blob URLs on unmount
  useEffect(() => {
    return () => {
      if (qualifications_photo instanceof window.File) {
        // Note: URL.revokeObjectURL(blobUrl) should be called with your stored blobUrl
      }
    };
  }, [qualifications_photo]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-16 px-4 relative">
      {/* Yellow glow background */}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-yellow-300 opacity-10 rounded-full blur-3xl pointer-events-none z-0" />
      
      <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-md shadow-2xl rounded-2xl p-8 space-y-8 z-10 relative">
        <h1 className="text-3xl font-bold text-yellow-400 text-center border-b border-yellow-500 pb-2">
          Filled Details
        </h1>
  
        {/* Profile Image */}
        {profile && (
          <div className="flex justify-center">
            <img
              src={
                profile instanceof window.File
                  ? URL.createObjectURL(profile)
                  : profile
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-md object-cover"
            />
          </div>
        )}
  
        {/* Personal Info */}
        <div className="border border-yellow-500 rounded-lg p-4 space-y-2 bg-gray-800">
          <h3 className="text-xl font-semibold text-yellow-400 border-b border-yellow-500 pb-2">
            Personal Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-200">
            <p><strong>Full Name:</strong> {fullName}</p>
            <p><strong>Date of Birth:</strong> {DOB}</p>
            <p><strong>Gender:</strong> {gender}</p>
            <p><strong>NIC:</strong> {NIC}</p>
          </div>
          {NIC_photo && (
            <div className="mt-2 text-sm">
              <p className="font-medium">NIC Photo:</p>
              <p className="text-yellow-400 underline">
                {NIC_photo instanceof window.File ? (
                  <a
                    href={URL.createObjectURL(NIC_photo)}
                    target="_blank"
                    rel="noreferrer"
                    download
                  >
                    {NIC_photo.name}
                  </a>
                ) : (
                  localStorage.getItem("NIC_name") || "NIC Document"
                )}
              </p>
            </div>
          )}
        </div>
  
        {/* Contact Details */}
        <div className="border border-yellow-500 rounded-lg p-4 space-y-2 bg-gray-800">
          <h3 className="text-xl font-semibold text-yellow-400 border-b border-yellow-500 pb-2">
            Contact Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-200">
            <p><strong>Contact No:</strong> {contactNo}</p>
            <p><strong>Home TP:</strong> {HomeTP}</p>
            <p><strong>WhatsApp:</strong> {whatsapp}</p>
            <p><strong>Email:</strong> {email}</p>
          </div>
        </div>
  
        {/* Address */}
        <div className="border border-yellow-500 rounded-lg p-4 space-y-2 bg-gray-800">
          <h3 className="text-xl font-semibold text-yellow-400 border-b border-yellow-500 pb-2">
            Address
          </h3>
          <div className="text-sm text-gray-200">
            <p><strong>Address:</strong> {Line1} {Line2}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
              <p><strong>City:</strong> {city}</p>
              <p><strong>District:</strong> {district}</p>
            </div>
          </div>
        </div>
  
        {/* Coach Selection Details */}
        <div className="border border-yellow-500 rounded-lg p-4 space-y-2 bg-gray-800">
          <h3 className="text-xl font-semibold text-yellow-400 border-b border-yellow-500 pb-2">
            Coach Selection Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-200">
            <p><strong>Selection Type:</strong> {selectionType}</p>
            <p><strong>Expected Salary:</strong> {salary}</p>
            <p><strong>Sport:</strong> {sport}</p>
          </div>
          <div className="mt-2 text-sm">
            <p className="font-medium">Qualifications:</p>
            <p className="text-gray-300">{qualifications}</p>
          </div>
          {qualifications_photo && (
            <div className="mt-2 text-sm">
              <p className="font-medium">Qualifications Document:</p>
              <a
                href={resolveFileLink(qualifications_photo)[0]}
                target="_blank"
                rel="noreferrer"
                download
                className="text-yellow-400 underline"
              >
                View Document
              </a>
            </div>
          )}
        </div>
  
        {/* Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => navigate("/coach-registration")}
            type="button"
            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-yellow-600 hover:text-black transition"
          >
            Back
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default CoachDetails;
