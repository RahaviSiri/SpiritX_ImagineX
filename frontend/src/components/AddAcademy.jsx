import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react";
//import { toast } from "react-toastify";
import assets from "../assets/assets.js";
import { AcademyContext } from "../context/AcademyContext.jsx";

const districts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota",
  "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale",
  "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const fileLabels = {
  academyLogo: "Academy Logo",
  picture: "Picture*",
  profile: "Profile*",
  NIC_photo: "NIC Photo*",
  proof: "Document of Proof*",
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
    fullName: "",
    profile: null,
    DOB: "",
    gender: "",
    NIC: "",
    NIC_photo: null,
    proof: null,
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
  
    const res = await addAcademy(form);
  };

  //   try {
  //     const res = await axios.post("http://localhost:3000/api/academy/add-academy", form, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //       withCredentials: true,
  //     });
  //     toast.success(res.data.message || "Academy registered successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Error submitting form");
  //   }
  // };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-50 px-4 font-sans"
      style={{
        backgroundImage: `url(${assets.AddAcademy})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-4xl bg-black/30 p-8 rounded-2xl shadow-xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-2xl font-bold text-center text-white mb-4">Register Academy</h1>

          {[
            { name: "academyName", placeholder: "Academy Name*", type: "text", required: true },
            { name: "sportType", placeholder: "Sport Type", type: "text" },
            { name: "shortDescription", placeholder: "Short Description*", type: "textarea", required: true },
            { name: "description", placeholder: "Full Description*", type: "textarea", required: true },
            { name: "duration", placeholder: "Duration*", type: "text", required: true },
            { name: "instructors", placeholder: "Instructors* (Give as comma seperated terms)", type: "text", required: true },
            
            { name: "Line1", placeholder: "Address Line 1*", type: "text", required: true },
            { name: "Line2", placeholder: "Address Line 2", type: "text" },
            { name: "city", placeholder: "City*", type: "text", required: true },
            { name: "contactNo", placeholder: "Contact No.*", type: "text", required: true },
            { name: "HomeTP", placeholder: "Home Telephone No.", type: "text" },
            { name: "whatsapp", placeholder: "WhatsApp No.*", type: "text", required: true },
            { name: "email", placeholder: "Email*", type: "email", required: true },
            { name: "fullName", placeholder: "Full Name of the Head of the academy*", type: "text", required: true },
            // { name: "DOB", placeholder: "Date of Birth*", type: "date", required: true },
            //{ name: "gender", placeholder: "Gender*", type: "text", required: true },
            { name: "NIC", placeholder: "NIC*", type: "text", required: true },
          ].map(({ name, placeholder, type, required }) =>
            type === "textarea" ? (
              <textarea
                key={name}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
              />
            ) : (
              <input
                key={name}
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                className="w-full border border-blue-300 p-2 rounded-md outline-none"
              />
            )
          )}

          <label className="w-full">
            <span className="text-white flex items-center space-x-2">Date of Birth*</span>
            <input
              type="date"
              name="DOB"
              onChange={handleChange}
              required
              className="w-full border border-blue-300 p-2 rounded-md outline-none"
            />
          </label>

          <input
              type="number"
              name="feeAmount"
              placeholder="Fee* (LKR)"
              value={formData.feeAmount}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              required
              className="w-full border border-blue-300 p-2 rounded-md outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />

          <select
            name="district"
            placeholder="District*"
            value={formData.district}
            onChange={handleChange}
            required
            className="w-full border border-blue-300 p-2 rounded-md outline-none"
          >
            <option value="">Select District*</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          <div className="w-full">
            <span className="text-white">Gender*</span>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 text-white">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  required
                  className="w-4 h-4"
                />
                <span>Male</span>
              </label>
              
              <label className="flex items-center space-x-2 text-white">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  required
                  className="w-4 h-4"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          <select
            name="mode"
            placeholder="Mode of Training*"
            value={formData.mode}
            onChange={handleChange}
            required
            className="w-full border border-blue-300 p-2 rounded-md outline-none"
          >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="Physical">Physical</option>
          </select>
          
          <label className="text-white flex items-center space-x-2">
              <input type="checkbox" name="isFlexible" checked={formData.isFlexible} onChange={handleChange} />
              <span>Flexible Start Date?</span>
          </label>

          <div>
            {(formData.mode === "Online" || formData.mode === "Physical") && !formData.isFlexible && (
              <label className="w-full">
                <span className="text-white flex items-center space-x-2">Start Date</span>
                <input
                  type="date"
                  name="startDate"
                  onChange={handleChange}
                  required
                  className="w-full border border-blue-300 p-2 rounded-md outline-none"
                />
              </label>
            )}
          </div>

          {["academyLogo", "picture", "profile", "NIC_photo", "proof", "certificate"].map((fileKey) => {
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
                    className="cursor-pointer border border-blue-300 p-2 rounded-md bg-white text-black w-fit"
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
                  <label className="flex items-center gap-2 text-white hover:underline cursor-pointer text-sm font-medium border border-dashed border-white-400 p-2 rounded-md">
                    <UploadCloud size={16} /> Upload {fileKey.replace("_", " ")}
                    <input type="file" name={fileKey} onChange={handleChange} hidden required />
                  </label>
                )}
              </div>
            );
          })}



          <span className="text-white flex items-center space-x-2">* are required fields</span>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition"
          >
            Register Academy
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAcademy;
