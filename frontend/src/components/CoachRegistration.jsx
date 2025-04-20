import React, { useContext, useEffect } from "react";
import { UploadCloud, File, Upload } from "lucide-react";
import { CoachContext } from "../context/Coachcontext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import assets from "../assets/assets.js";

const CoachRegistration = () => {
  const navigate = useNavigate();
  const {
    fullName,
    setFullName,
    profile,
    setProfile,
    DOB,
    setDOB,
    gender,
    setGender,
    NIC,
    setNIC,
    NIC_photo,
    setNIC_photo,

    contactNo,
    setContactNo,
    HomeTP,
    setHomeTP,
    whatsapp,
    setWhatsapp,
    email,
    setEmail,

    Line1,
    setLine1,
    Line2,
    setLine2,
    city,
    setCity,
    district,
    setDistrict,

    selectionType,
    setSelectionType,
    salary,
    setSalary,
    sport,
    setSport,
    qualifications,
    setQualifications,
    qualifications_photo,
    setQualifications_photo,
  } = useContext(CoachContext);
  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa",
    "Colombo", "Galle", "Gampaha", "Hambantota",
    "Jaffna", "Kalutara", "Kandy", "Kegalle",
    "Kilinochchi", "Kurunegala", "Mannar", "Matale",
    "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee",
    "Vavuniya"
  ];

  const [NIC_photo_name, setNIC_photoName] = useState("");
  const [qualifications_photo_name, setQualifications_photo_name] = useState("");

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // base64 string
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    

  useEffect(() => {
    const savedProfile = localStorage.getItem("coachProfile");
    const savedProfileName = localStorage.getItem("coachProfile_name");
    const savedNIC = localStorage.getItem("coachNIC");
    const savedNICName = localStorage.getItem("NIC_name");
    const savedQual = localStorage.getItem("coachQual");
    const savedQualName = localStorage.getItem("quali_name");

    if (savedProfile) {
      setProfile(savedProfile);
    }
    if (savedNIC) {
      setNIC_photo(savedNIC);
      setNIC_photoName(savedNICName)
    }
    if (savedQual) {
      setQualifications_photo(savedQual);
      setQualifications_photo_name(savedQualName);
    }
  }, []);

  useEffect(() => {
    if (profile instanceof window.File) {
      fileToBase64(profile).then((base64) => {
        localStorage.setItem("coachProfile", base64)
        localStorage.setItem("coachProfile_name", profile.name);
      });
    } else if (profile) {
      localStorage.setItem("coachProfile", profile);
      localStorage.setItem("coachProfile_name", profile.name);
    }
  }, [profile]);

  useEffect(() => {
    if (NIC_photo instanceof window.File) {
      fileToBase64(NIC_photo).then((base64) => {
        localStorage.setItem("coachNIC", base64);
        localStorage.setItem("NIC_name", NIC_photo.name);
      });
    } else if (NIC_photo) {
      localStorage.setItem("coachNIC", NIC_photo);
    }
  }, [NIC_photo]);

  useEffect(() => {
    if (qualifications_photo instanceof window.File) {
      fileToBase64(qualifications_photo).then((base64) => {
        localStorage.setItem("coachQual", base64);
        localStorage.setItem("quali_name", qualifications_photo.name);
      });
    } else if (qualifications_photo) {
      localStorage.setItem("coachQual", qualifications_photo);
      localStorage.setItem("quali_name", qualifications_photo.name);
    }
  }, [qualifications_photo]);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      navigate("/coach-details");
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8 font-sans"
      style={{
        backgroundImage: `url(${assets.coach2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-3xl bg-black/30 p-8 rounded-2xl shadow-xl space-y-6">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center text-white mb-4">
            Register to Become a Coach
          </h1>

          {/* Personal Info */}
          <div className="space-y-4">
            <p className="text-lg font-semibold text-white border-b border-blue-300 pb-1">
              Personal Info:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                placeholder="Full Name*"
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
                required
              />
              
              {profile ? (
                <div 
                  onClick={() => setProfile(null)}
                  className="cursor-pointer"
                >
                  <img
                    src={
                      profile instanceof window.File
                        ? URL.createObjectURL(profile)
                        : profile
                    }
                    className="h-32 w-32 object-cover border border-blue-300 rounded-md"
                    alt="Profile Preview"
                  />
                </div>
              ) : (
                <label className="flex items-center gap-2 text-white hover:underline cursor-pointer text-sm font-medium border border-dashed border-white-400 p-2 rounded-md">
                  <UploadCloud size={16} /> Upload profile photo*
                  <input
                    type="file"
                    name="profile"
                    id="photo"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      setProfile(e.target.files[0]);
                    }}
                    onClick={(e) => (e.target.value = "")}
                    hidden
                    required
                  />
                </label>
              )}

              <input
                onChange={(e) => setDOB(e.target.value)}
                value={DOB}
                type="date"
                placeholder="Date of Birth*"
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
              />
              
              <div className="flex items-center gap-4 text-white">
                <span className="text-sm">Gender*:</span>
                <label className="inline-flex items-center space-x-2">
                  <input
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                    type="radio"
                    name="gender"
                    className="form-radio text-blue-500"
                  />
                  <span>Male</span>
                </label>
                <label className="inline-flex items-center space-x-2">
                  <input
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                    type="radio"
                    name="gender"
                    className="form-radio text-blue-500"
                  />
                  <span>Female</span>
                </label>
              </div>

              <input
                type="text"
                onChange={(e) => setNIC(e.target.value)}
                value={NIC}
                required
                placeholder="NIC No*"
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
              />
              
              {NIC_photo ? (
                <div
                  onClick={() => setNIC_photo(null)}
                  className="flex items-center gap-2 text-white hover:underline cursor-pointer text-sm font-medium border border-dashed border-white-400 p-2 rounded-md"
                >
                  <File size={16} /> {NIC_photo_name}
                </div>
              ) : (
                <label className="flex items-center gap-2 text-white hover:underline cursor-pointer text-sm font-medium border border-dashed border-white-400 p-2 rounded-md">
                  <UploadCloud size={16} /> Upload NIC frontpage*
                  <input
                    required
                    name="NIC_photo"
                    type="file"
                    accept=".png, .jpg, .jpeg, .docx, .doc, .pdf"
                    id="NIC"
                    onChange={(e) => {
                      setNIC_photo(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 mt-6">
            <p className="text-lg font-semibold text-white border-b border-blue-300 pb-1">
              Contact Details:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                onChange={(e) => setContactNo(e.target.value)}
                value={contactNo}
                placeholder="Contact No*"
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
                required
              />
              <input
                type="tel"
                onChange={(e) => setHomeTP(e.target.value)}
                value={HomeTP}
                placeholder="Home Telephone No"
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
              />
              <input
                type="tel"
                onChange={(e) => setWhatsapp(e.target.value)}
                value={whatsapp}
                placeholder="WhatsApp No*"
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
                required
              />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email Address*"
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4 mt-6">
            <p className="text-lg font-semibold text-white border-b border-blue-300 pb-1">
              Address:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                onChange={(e) => setLine1(e.target.value)}
                value={Line1}
                placeholder="Line 1*"
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
                required
              />
              <input
                type="text"
                onChange={(e) => setLine2(e.target.value)}
                value={Line2}
                placeholder="Line 2"
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
              />
              <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder="City*"
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
                required
              />
              
              <select 
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
              >
                <option value="" disabled>
                  Select District*
                </option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Coach Selection */}
          <div className="space-y-4 mt-6">
            <p className="text-lg font-semibold text-white border-b border-blue-300 pb-1">
              Coach Selection Details:
            </p>

            <div className="flex flex-wrap gap-4 text-white">
              <span>Select type*:</span>
              {["School", "Academics", "Personal", "Any"].map((type) => (
                <label
                  key={type}
                  className="inline-flex items-center space-x-2"
                >
                  <input
                    value={type}
                    checked={selectionType === type}
                    onChange={(e) => setSelectionType(e.target.value)}
                    type="radio"
                    name="type"
                    className="form-radio text-blue-500"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                onChange={(e) => setSalary(e.target.value)}
                value={salary}
                placeholder="Expected salary*"
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
                required
              />
              <select
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
                onChange={(e) => setSport(e.target.value)}
                value={sport}
              >
                <option value="">-- Select a Sport --</option>
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
                <option value="cricket">Cricket</option>
                <option value="tennis">Tennis</option>
                <option value="swimming">Swimming</option>
                <option value="badminton">Badminton</option>
              </select>
            </div>

            <textarea
              onChange={(e) => setQualifications(e.target.value)}
              value={qualifications}
              placeholder="Academic Qualifications"
              className="w-full border border-blue-300 p-2 rounded-md outline-none"
              rows={4}
            ></textarea>

            {qualifications_photo ? (
              <div
                onClick={() => setQualifications_photo(null)}
                className="flex items-center gap-2 text-white hover:underline cursor-pointer text-sm font-medium border border-dashed border-white-400 p-2 rounded-md"
              >
                <File size={16} /> {qualifications_photo_name}
              </div>
            ) : (
              <label className="flex items-center gap-2 text-white hover:underline cursor-pointer text-sm font-medium border border-dashed border-white-400 p-2 rounded-md">
                <UploadCloud size={16} /> Upload qualifications evidence*
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .docx, .pdf, .doc"
                  id="evidence"
                  hidden
                  name="qualifications_photo"
                  onChange={(e) => {
                    setQualifications_photo(e.target.files[0]);
                  }}
                />
              </label>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoachRegistration;