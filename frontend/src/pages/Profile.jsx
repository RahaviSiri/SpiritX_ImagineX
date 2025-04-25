import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { CoachContext } from "../context/Coachcontext";
import axios from "axios";
import assets from "../assets/assets.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userData, backendURL, fetchUser } = useContext(UserContext);
  const { coachData, fetchCoach } = useContext(CoachContext);
  const isCoach = !!coachData && Object.keys(coachData).length > 0;
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState({ ...userData });
  const [editableCoach, setEditableCoach] = useState(
    coachData && coachData.personalInfo
      ? { ...coachData }
      : {
          personalInfo: {},
          contactDetails: {},
          Address: {},
          coachSelection: {},
        }
  );

  useEffect(() => {
    if (editMode) {
      setEditableUser({ ...userData });
      setEditableCoach(
        coachData && coachData.personalInfo
          ? { ...coachData }
          : {
              personalInfo: {},
              contactDetails: {},
              Address: {},
              coachSelection: {},
            }
      );
    }
  }, [editMode]);

  const handleChange = (e, section = "user") => {
    const { name, value } = e.target;
    if (section === "user") {
      setEditableUser((prev) => ({ ...prev, [name]: value }));
    } else {
      const [outer, inner] = name.split(".");
      setEditableCoach((prev) => ({
        ...prev,
        [outer]: {
          ...prev[outer],
          [inner]: value,
        },
      }));
    }
  };

  const handleSave = async () => {
    try {
      if (isCoach) {
        const formData = new FormData();
        formData.append("userId", coachData._id);
        formData.append("fullName", editableCoach.personalInfo.fullName);
        formData.append("DOB", editableCoach.personalInfo.DOB);
        formData.append("gender", editableCoach.personalInfo.gender);
        formData.append("NIC", editableCoach.personalInfo.NIC);
        formData.append("contactNo", editableCoach.contactDetails.contactNo);
        formData.append("Line1", editableCoach.Address.Line1);
        formData.append("Line2", editableCoach.Address.Line2);
        formData.append("city", editableCoach.Address.city);
        formData.append("district", editableCoach.Address.district);
        formData.append(
          "selectionType",
          editableCoach.coachSelection.selectionType
        );
        formData.append("sport", editableCoach.coachSelection.sport);
        formData.append(
          "qualifications",
          editableCoach.coachSelection.qualifications
        );

        if (editableCoach.personalInfo.profileFile) {
          formData.append("profile", editableCoach.personalInfo.profileFile);
        }

        const { data } = await axios.put(
          `${backendURL}/api/coach/edit/${coachData._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (data.success) {
          fetchCoach();
          alert("Coach profile updated successfully");
        }
      } else {
        const formData = new FormData();
        formData.append("name", editableUser.name);
        formData.append("phone", editableUser.phone || "");
        formData.append("address", editableUser.address || "");
        formData.append("email", editableUser.email || "");

        if (editableUser.imageFile) {
          formData.append("image", editableUser.imageFile);
        }

        try {
          const { data } = await axios.post(
            `${backendURL}/api/user/edit-profile/${userData._id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (data.success) {
            fetchUser();
            toast.success("User profile updated successfully");
          } else {
            toast.error("Error saving profile: " + data.message);
          }
        } catch (error) {
          console.error("Error saving profile:", error);
          toast.error("Error saving profile.");
        }
      }
      setEditMode(false);
    } catch (error) {
      alert("Error saving profile.");
      console.log(error);
    }
  };

  const handleDeleteCoach = async () => {
    try {
      const response = await axios.delete(
        `${backendURL}/api/coach/delete-coach/${coachData._id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Error deleting coach account.");
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 py-20 text-white p-6">
      <div className="max-w-5xl mx-auto bg-black bg-opacity-40 backdrop-blur-lg p-8 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-yellow-400">
            {isCoach ? "Coach Profile" : "User Profile"}
          </h2>
          <div className="flex gap-2 mt-4 sm:mt-0">
            {isCoach && (
              <button
                onClick={handleDeleteCoach}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Delete Account
              </button>
            )}
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
            {editMode && (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Save
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Profile Image */}
          <div className="relative w-40 h-40 flex-shrink-0">
            <img
              src={
                isCoach
                  ? editableCoach?.personalInfo?.profile ||
                    coachData?.personalInfo?.profile ||
                    assets.Upload
                  : editableUser?.image || userData.image || assets.Upload
              }
              alt="Profile"
              className="w-full h-full rounded-full border-4 border-yellow-400 object-cover"
            />

            {/* File Input for Image Upload in Edit Mode */}
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    isCoach
                      ? setEditableCoach((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            profile: imageUrl, // Image preview URL
                            profileFile: file, // Actual file for saving
                          },
                        }))
                      : setEditableUser((prev) => ({
                          ...prev,
                          image: imageUrl, // Image preview URL
                          imageFile: file, // Actual file for saving
                        }));
                  }
                }}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              />
            )}
          </div>

          {/* Profile Fields */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {(isCoach
              ? [
                  { label: "Full Name", name: "personalInfo.fullName" },
                  { label: "Gender", name: "personalInfo.gender" },
                  { label: "NIC", name: "personalInfo.NIC" },
                  { label: "Contact Number", name: "contactDetails.contactNo" },
                  { label: "Address Line 1", name: "Address.Line1" },
                  { label: "Address Line 2", name: "Address.Line2" },
                  { label: "City", name: "Address.city" },
                  { label: "District", name: "Address.district" },
                  {
                    label: "Selection Type",
                    name: "coachSelection.selectionType",
                  },
                  { label: "Sport", name: "coachSelection.sport" },
                  {
                    label: "Qualifications",
                    name: "coachSelection.qualifications",
                  },
                  {
                    label: "Date of Birth",
                    name: "personalInfo.DOB",
                    type: "date",
                  },
                ]
              : [
                  { label: "Name", name: "name" },
                  { label: "Email", name: "email", readonly: true },
                  { label: "Phone", name: "phone" },
                  { label: "Address", name: "address" },
                ]
            ).map(({ label, name, type, readonly }) => {
              const value = name
                .split(".")
                .reduce(
                  (obj, key) => (obj ? obj[key] : ""),
                  isCoach
                    ? editMode
                      ? editableCoach
                      : coachData
                    : editableUser
                );

              return (
                <div key={name} className="flex items-center">
                  <label className="w-40 text-sm font-semibold text-gray-300">
                    {label}:
                  </label>
                  {editMode && !readonly ? (
                    <input
                      type={type || "text"}
                      name={name}
                      value={
                        type === "date" && value
                          ? value.split("T")[0]
                          : value || ""
                      }
                      onChange={(e) =>
                        handleChange(e, isCoach ? "coach" : "user")
                      }
                      className="flex-1 p-2 rounded bg-gray-900 border border-gray-700 text-yellow-300"
                    />
                  ) : (
                    <p className="flex-1 text-gray-300 break-words">
                      {type === "date" && value
                        ? new Date(value).toLocaleDateString()
                        : value}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Qualifications Photo */}
            {isCoach && coachData?.coachSelection?.qualifications_photo && (
              <div className="flex items-center col-span-2">
                <label className="w-40 font-semibold text-yellow-400">
                  Qualifications Photo:
                </label>
                <a
                  href={coachData.coachSelection.qualifications_photo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Photo
                </a>
              </div>
            )}

            {/* Joined Date for User */}
            {!isCoach && (
              <div className="col-span-2">
                <p className="text-sm text-gray-400">
                  <strong>Joined:</strong>{" "}
                  {new Date(userData.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
