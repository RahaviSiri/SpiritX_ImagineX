import React, { useContext, useEffect } from "react";
import { UploadCloud, File, Upload } from "lucide-react";
import { CoachContext } from "../context/Coachcontext";
import { useNavigate } from "react-router-dom";

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
    school_Academics,
    setSchool_Academics,
    sport,
    setSport,
    qualifications,
    setQualifications,
    qualifications_photo,
    setQualifications_photo,

    // profileState,
    // setProfileState,
    // NIC_photoState,
    // setNIC_photoState,
    // qualificaions_photoState,
    // setQualificaions_photoState
  } = useContext(CoachContext);

  useEffect(() => {
    console.log(gender);
  }, [gender]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 font-sans">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <form>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Register to Become a Coach
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Please note: Fields marked with an asterisk (*) are required.
          </p>

          {/* Personal Info */}
          <div className="space-y-4 border border-gray-400 m-2 p-4">
            <p className="text-lg font-semibold text-gray-800 border-b pb-1">
              Personal Info:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                placeholder="Full Name*"
                className="input-style border border-gray-300 p-2 rounded-md"
                required
              />
              {profile ? (
                <div onClick={() => setProfile(null)}>
                  <img
                    src={
                      profile instanceof window.File
                        ? URL.createObjectURL(profile)
                        : profile
                    }
                    className="flex w-16 h-16 items-center gap-2 text-blue-600 hover:underline cursor-pointer text-sm font-medium border border-dashed border-blue-400 p-2 rounded-md"
                    alt=""
                  />
                </div>
              ) : (
                <label className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer text-sm font-medium border border-dashed border-blue-400 p-2 rounded-md">
                  <UploadCloud size={16} /> Upload profile photo*
                  <input
                    type="file"
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
                className="input-style border border-gray-300 p-2 rounded-md"
              />
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700" required>
                  Gender*:
                </span>
                <label className="inline-flex items-center space-x-2 text-gray-700">
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
                <label className="inline-flex items-center space-x-2 text-gray-700">
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
                className="input-style border border-gray-300 p-2 rounded-md"
              />
              {NIC_photo ? (
                <div
                  onClick={() => setNIC_photo(null)}
                  className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
                >
                  <Upload size={20} className="text-blue-500" />
                  <span>{NIC_photo?.name}</span>
                </div>
              ) : (
                <label className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer text-sm font-medium border border-dashed border-blue-400 p-2 rounded-md">
                  <UploadCloud size={16} /> Upload NIC frontpage*
                  <input
                    required
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
          <div className="space-y-4 border border-gray-400 m-2 p-4">
            <p className="text-lg font-semibold text-gray-800 border-b pb-1">
              Contact Details:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                onChange={(e) => setContactNo(e.target.value)}
                value={contactNo}
                placeholder="Contact No*"
                className="input-style border border-gray-300 p-2 rounded-md"
                required
              />
              <input
                type="tel"
                onChange={(e) => setHomeTP(e.target.value)}
                value={HomeTP}
                placeholder="Home Telephone No"
                className="input-style border border-gray-300 p-2 rounded-md"
              />
              <input
                type="tel"
                onChange={(e) => setWhatsapp(e.target.value)}
                value={whatsapp}
                placeholder="WhatsApp No*"
                className="input-style border border-gray-300 p-2 rounded-md"
                required
              />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email Address*"
                className="input-style border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4 border border-gray-400 m-2 p-4">
            <p className="text-lg font-semibold text-gray-800 border-b pb-1">
              Address:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                onChange={(e) => setLine1(e.target.value)}
                value={Line1}
                placeholder="Line 1*"
                className="input-style border border-gray-300 p-2 rounded-md"
                required
              />
              <input
                type="text"
                onChange={(e) => setLine2(e.target.value)}
                value={Line2}
                placeholder="Line 2"
                className="input-style border border-gray-300 p-2 rounded-md"
              />
              <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder="City*"
                className="input-style border border-gray-300 p-2 rounded-md"
                required
              />
              <input
                type="text"
                onChange={(e) => setDistrict(e.target.value)}
                value={district}
                placeholder="District*"
                className="input-style border border-gray-300 p-2 rounded-md"
                required
              />
            </div>
          </div>

          {/* Coach Selection */}
          <div className="space-y-4 border border-gray-400 m-2 p-4">
            <p className="text-lg font-semibold text-gray-800 border-b pb-1">
              Coach Selection Details:
            </p>

            <div className="text-sm text-gray-700 mb-2"></div>
            <div className="flex flex-wrap gap-4">
              Select type* :
              {["School", "Academics", "Personal", "Any"].map((type) => (
                <label
                  key={type}
                  className="inline-flex items-center space-x-2 text-gray-700"
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
              <select
                className="input-style border border-gray-300 p-2 rounded-md"
                onChange={(e) => setSchool_Academics(e.target.value)}
                value={school_Academics}
              >
                <option value="">-- Select a School --</option>
                <option value="engineering">School of Engineering</option>
                <option value="business">School of Business</option>
                <option value="arts">School of Arts & Humanities</option>
                <option value="science">School of Science</option>
                <option value="law">School of Law</option>
                <option value="medicine">School of Medicine</option>
              </select>
              <select
                className="input-style border border-gray-300 p-2 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            ></textarea>

            {qualifications_photo ? (
              <div
                onClick={() => setNIC_photo(null)}
                className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
              >
                <File size={16} className="text-blue-500" />
                <span>{qualifications_photo?.name}</span>
              </div>
            ) : (
              <label className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer text-sm font-medium border border-dashed border-blue-400 p-2 rounded-md">
                <UploadCloud size={16} /> Upload qualifications evidence*
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .docx, .pdf, .doc"
                  id="evidence"
                  hidden
                  onChange={(e) => {
                    setQualifications_photo(e.target.files[0]);
                  }}
                />
              </label>
            )}
          </div>

          <button onClick={() => navigate('/coach-details')}
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default CoachRegistration;
