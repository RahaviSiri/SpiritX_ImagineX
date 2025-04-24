import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { CoachContext } from "../context/Coachcontext";
import axios from "axios";
import assets from "../assets/assets.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const { userData, backendURL, fetchUser } = useContext(UserContext);
  const { coachData, fetchCoach } = useContext(CoachContext);
  const isCoach = !!coachData && Object.keys(coachData).length > 0;
  const navigate = useNavigate()

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
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {isCoach ? "Coach Profile" : "User Profile"}
          </h2>
          <div className="flex gap-2">
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

        <hr className="my-4" />

        {isCoach ? (
          <div className="flex gap-6 items-start">
            <div className="relative">
              <img
                src={coachData?.personalInfo?.profile || assets.Upload}
                alt="Coach"
                className="w-32 h-32 rounded-full border object-cover"
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setEditableCoach((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          profile: imageUrl,
                          profileFile: file,
                        },
                      }));
                    }
                  }}
                  className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                />
              )}
            </div>

            <div className="w-full space-y-2">
              {[
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
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="font-semibold">{label}:</label>
                  {editMode ? (
                    <input
                      name={name}
                      value={
                        name
                          .split(".")
                          .reduce((o, k) => (o ? o[k] : ""), editableCoach) ||
                        ""
                      }
                      onChange={(e) => handleChange(e, "coach")}
                      className="border p-1 w-full"
                    />
                  ) : (
                    <p>
                      {name
                        .split(".")
                        .reduce((o, k) => (o ? o[k] : ""), coachData)}
                    </p>
                  )}
                </div>
              ))}

              <label className="font-semibold">Date of Birth:</label>
              {editMode ? (
                <input
                  type="date"
                  name="personalInfo.DOB"
                  value={editableCoach.personalInfo?.DOB?.split("T")[0] || ""}
                  onChange={(e) => handleChange(e, "coach")}
                  className="border p-1 w-full"
                />
              ) : (
                <p>
                  {new Date(coachData?.personalInfo?.DOB).toLocaleDateString()}
                </p>
              )}

              {coachData?.coachSelection?.qualifications_photo && (
                <div>
                  <strong>Qualifications Photo:</strong>{" "}
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
            </div>
          </div>
        ) : (
          <div className="flex gap-6 items-center">
            <div className="relative">
              <img
                src={userData.image || assets.Upload}
                alt="User"
                className="w-32 h-32 rounded-full border object-cover"
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setEditableUser((prev) => ({
                        ...prev,
                        image: imageUrl,
                        imageFile: file, 
                      }));
                    }
                    
                  }}
                  className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                />
              )}
            </div>

            <div className="w-full space-y-2">
              <label className="font-semibold">Name:</label>
              {editMode ? (
                <input
                  name="name"
                  value={editableUser.name}
                  onChange={handleChange}
                  className="border p-1 w-full"
                />
              ) : (
                <p>{userData.name}</p>
              )}

              <label className="font-semibold">Email:</label>
              <p>{userData.email}</p>

              <label className="font-semibold">Phone:</label>
              {editMode ? (
                <input
                  name="phone"
                  value={editableUser.phone || ""}
                  onChange={handleChange}
                  className="border p-1 w-full"
                />
              ) : (
                <p>{userData.phone}</p>
              )}

              <label className="font-semibold">Address:</label>
              {editMode ? (
                <input
                  name="address"
                  value={editableUser.address || ""}
                  onChange={handleChange}
                  className="border p-1 w-full"
                />
              ) : (
                <p>{userData.address}</p>
              )}
            </div>
          </div>
        )}

        {!isCoach && (
          <p className="mt-4">
            <strong>Joined:</strong>{" "}
            {new Date(userData.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
