import React, { useState } from "react";
import axios from "axios";

const ApplyAcademics = () => {
  const [formData, setFormData] = useState({
    academyName: "",
    academyLogo: null,
    picture: null,
    sportType: "",
    shortDescription: "",
    description: "",
    duration: "",
    instructors: "",
    feeAmount: 0,
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

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File || typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
        form.append(key, value);
      }
    });

    try {
      const res = await axios.post("http://localhost:3000/api/academies/add-academy", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input type="text" name="academyName" placeholder="Academy Name" onChange={handleChange} required />
      <input type="file" name="academyLogo" onChange={handleChange} required />
      <input type="file" name="picture" onChange={handleChange} required />
      <input type="text" name="sportType" placeholder="Sport Type" onChange={handleChange} />
      <textarea name="shortDescription" placeholder="Short Description" onChange={handleChange} required />
      <textarea name="description" placeholder="Full Description" onChange={handleChange} required />
      <input type="text" name="duration" placeholder="Duration" onChange={handleChange} />
      <input type="text" name="instructors" placeholder="Instructors" onChange={handleChange} required />
      <input type="number" name="feeAmount" placeholder="Fee" onChange={handleChange} required />
      <select name="mode" onChange={handleChange} required>
        <option value="">Select Mode</option>
        <option value="Online">Online</option>
        <option value="Physical">Physical</option>
      </select>
      {formData.mode === "Online" && (
        <label>
          <input type="checkbox" name="isFlexible" onChange={handleChange} /> Flexible Start Date?
        </label>
      )}
      {formData.mode === "Physical" && (
        <input type="date" name="startDate" onChange={handleChange} required />
      )}
      <input type="text" name="Line1" placeholder="Address Line 1" onChange={handleChange} required />
      <input type="text" name="Line2" placeholder="Address Line 2" onChange={handleChange} />
      <input type="text" name="city" placeholder="City" onChange={handleChange} required />
      <input type="text" name="district" placeholder="District" onChange={handleChange} required />
      <input type="text" name="contactNo" placeholder="Contact No" onChange={handleChange} required />
      <input type="text" name="HomeTP" placeholder="Home TP" onChange={handleChange} />
      <input type="text" name="whatsapp" placeholder="WhatsApp" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="text" name="fullName" placeholder="Owner Full Name" onChange={handleChange} required />
      <input type="file" name="profile" onChange={handleChange} />
      <input type="date" name="DOB" placeholder="Date of Birth" onChange={handleChange} required />
      <input type="text" name="gender" placeholder="Gender" onChange={handleChange} required />
      <input type="text" name="NIC" placeholder="NIC" onChange={handleChange} required />
      <input type="file" name="NIC_photo" onChange={handleChange} required />
      <input type="file" name="proof" onChange={handleChange} required />
      <input type="file" name="certificate" onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplyAcademics;