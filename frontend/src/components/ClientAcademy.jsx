import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ClientAcademy = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    preferredStartDate: "",
    NIC: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // this is academyId

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    Object.entries(formData).forEach(([k, v]) => {
      if (!v.trim()) errs[k] = `${k} is required`;
    });
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    const token = localStorage.getItem("uToken");
    if (!token) {
      alert("You must be logged in to book.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:3000/api/user/book-academy/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Booking successful", res.data);
      toast.success("Booking a academy successfully!")
      navigate("/");
    } catch (err) {
      console.error("Booking failed", err.response || err);
      if (err.response?.status === 401) {
        alert("Not authorized—please log in.");
      } else {
        alert("Booking failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Full Name", name: "fullName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Contact Number", name: "contactNumber", type: "tel" },
    { label: "Address Line 1", name: "addressLine1", type: "text" },
    { label: "Address Line 2", name: "addressLine2", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "District", name: "district", type: "text" },
    { label: "Preferred Start Date", name: "preferredStartDate", type: "date" },
    { label: "NIC", name: "NIC", type: "text" },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-10">
      {/* Form Section */}
      <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md bg-opacity-20 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Book a Academy
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ label, name, type }) => (
            <div key={name}>
              <label className="block mb-1 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors[name] && (
                <p className="text-sm text-red-600 mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block mb-1 font-medium">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            {errors.notes && (
              <p className="text-sm text-red-600 mt-1">{errors.notes}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white ${loading ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500"}`}
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClientAcademy;
