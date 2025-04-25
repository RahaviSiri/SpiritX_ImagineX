import React, { useContext, useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import assets from "../assets/assets.js";
import { AcademyContext } from "../context/AcademyContext.jsx";

const districts = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
];

const fileLabels = {
  academyLogo: "Logo of the Academy",
  picture: "A Picture of the Academy*",
  certificate: "Certificate of Validation*",
};

const AddAcademy = () => {
  const { addAcademy } = useContext(AcademyContext);

  const [formData, setFormData] = useState({
    academyName: "",
    academyLogo: null,
    picture: null,
    sportType: "",
    shortDescription: "",
    description: "",
    duration: "",
    instructors: "",
    feeAmount: "",
    mode: "",
    isFlexible: false,
    startDate: "",
    Line1: "",
    Line2: "",
    city: "",
    district: "",
    contactNo: "",
    HomeTP: "",
    whatsapp: "",
    email: "",
    certificate: null,
  });

  const [previews, setPreviews] = useState({});

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));

      // Only create preview if it's an image
      if (file && file.type.startsWith("image")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => ({ ...prev, [name]: reader.result }));
        };
        reader.readAsDataURL(file);
      } else {
        setPreviews((prev) => ({ ...prev, [name]: null }));
      }
    } else if (type === "checkbox") {
      // For checkboxes, use the checked value (true or false)
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    const data = await addAcademy(form);
    if (data?.success) {
      setFormData({
        academyName: "",
        academyLogo: null,
        picture: null,
        sportType: "",
        shortDescription: "",
        description: "",
        duration: "",
        instructors: "",
        feeAmount: "",
        mode: "",
        isFlexible: false,
        startDate: "",
        Line1: "",
        Line2: "",
        city: "",
        district: "",
        contactNo: "",
        HomeTP: "",
        whatsapp: "",
        email: "",
        certificate: null,
      });
      setPreviews({});
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4 font-sans text-white">
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-2xl shadow-xl space-y-6 mt-24 mb-3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-2xl font-bold text-center mb-4 text-yellow-400">
            Academy Registration
          </h1>

          {/* Academy Name */}
          <input
            type="text"
            name="academyName"
            placeholder="Name of the Academy*"
            value={formData.academyName}
            onChange={handleChange}
            required
            className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white"
          />

          {/* Academy Logo & Picture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["academyLogo", "picture"].map((fileKey) => (
              <div key={fileKey}>
                {formData[fileKey] ? (
                  <div
                    onClick={() => {
                      setFormData({ ...formData, [fileKey]: null });
                      setPreviews({ ...previews, [fileKey]: null });
                    }}
                    className="cursor-pointer border border-yellow-400 p-2 rounded-md bg-gray-700 w-fit"
                  >
                    {previews[fileKey]?.startsWith("data:image") ? (
                      <img
                        src={previews[fileKey]}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-sm">{formData[fileKey].name}</span>
                    )}
                  </div>
                ) : (
                  <label className="flex items-center gap-2 hover:underline cursor-pointer text-sm text-yellow-300 font-medium border border-dashed border-yellow-500 p-2 rounded-md">
                    <UploadCloud size={16} /> Upload {fileLabels[fileKey]}
                    <input
                      type="file"
                      name={fileKey}
                      onChange={handleChange}
                      hidden
                      required
                    />
                  </label>
                )}
              </div>
            ))}
          </div>

          {/* Sport Type to Start Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="sportType"
              placeholder="Sport Type"
              value={formData.sportType}
              onChange={handleChange}
              className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white col-span-1 md:col-span-2"
            />
            <textarea
              name="shortDescription"
              placeholder="Short Description*"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white col-span-1 md:col-span-2"
            />
            <textarea
              name="description"
              placeholder="Full Description*"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white col-span-1 md:col-span-2"
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration* (Eg. 3 months)"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white"
            />
            <input
              type="number"
              name="feeAmount"
              placeholder="Fee* (LKR)"
              value={formData.feeAmount}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
              }}
              required
              className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <input
              type="text"
              name="instructors"
              placeholder="Instructors* (Eg. John Doe, Jane Smith)"
              value={formData.instructors}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white col-span-1 md:col-span-2"
            />

            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white"
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Physical">Physical</option>
            </select>

            <label className="text-yellow-300 flex items-center space-x-2">
              <input
                type="checkbox"
                name="isFlexible"
                checked={formData.isFlexible}
                onChange={handleChange}
              />
              <span>Flexible Start Date?</span>
            </label>

            {formData.mode && !formData.isFlexible && (
              <label className="w-full">
                <span className="text-yellow-300">Start Date*</span>
                <input
                  type="date"
                  name="startDate"
                  onChange={handleChange}
                  required
                  className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white"
                />
              </label>
            )}
          </div>

          {/* Address Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="Line1"
              placeholder="Address Line 1*"
              value={formData.Line1}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white"
            />
            <input
              type="text"
              name="Line2"
              placeholder="Address Line 2"
              value={formData.Line2}
              onChange={handleChange}
              className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white"
            />
            <input
              type="text"
              name="city"
              placeholder="City*"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white"
            />
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white"
            >
              <option value="">Select District*</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "contactNo", placeholder: "Contact No.*", type: "text" },
              {
                name: "HomeTP",
                placeholder: "Home Telephone No.",
                type: "text",
              },
              { name: "whatsapp", placeholder: "WhatsApp No.*", type: "text" },
              { name: "email", placeholder: "Email*", type: "email" },
            ].map(({ name, placeholder, type }) => (
              <input
                key={name}
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required={placeholder.includes("*")}
                className="w-full border border-yellow-400 p-2 rounded-md outline-none bg-gray-900 text-white"
              />
            ))}
          </div>

          {/* File Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["certificate"].map((fileKey) => {
              const previewUrl = previews[fileKey];
              const fileName = formData[fileKey]?.name || "Uploaded File";
              const isImage = previewUrl?.startsWith("data:image");

              return (
                <div key={fileKey}>
                  {formData[fileKey] ? (
                    <div
                      onClick={() => {
                        setFormData({ ...formData, [fileKey]: null });
                        setPreviews({ ...previews, [fileKey]: null });
                      }}
                      className="cursor-pointer border border-yellow-400 p-2 rounded-md bg-gray-700 text-white w-fit"
                    >
                      {isImage ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="h-32 w-32 object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-sm">{fileName}</span>
                      )}
                    </div>
                  ) : (
                    <label className="flex items-center gap-2 text-yellow-300 hover:underline cursor-pointer text-sm font-medium border border-dashed border-yellow-500 p-2 rounded-md">
                      <UploadCloud size={16} /> Upload {fileLabels[fileKey]}
                      <input
                        type="file"
                        name={fileKey}
                        onChange={handleChange}
                        hidden
                        required
                      />
                    </label>
                  )}
                </div>
              );
            })}
          </div>

          <span className="text-yellow-200 flex items-center space-x-2">
            * are required fields
          </span>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-semibold rounded-xl transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAcademy;
