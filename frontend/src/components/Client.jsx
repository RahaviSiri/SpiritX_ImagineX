import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Client = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    preferredDateTime: "",
    notes: "",
  });
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      id: id, // Fixed syntax: properly adding id to payload
    };

    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/client/book-coach/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log('hi');
      console.log(data);
      
      // Navigation after successful API call
      console.log("Navigation should happen now!");
      navigate("/client-wait-for-approval");
      
      // Uncomment if you want to show a success message
      // toast.success(data.message || "Request submitted successfully");
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-md">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Book a Coach - Client Details
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            placeholder="Enter your name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            name="contactNumber"
            type="tel"
            placeholder="Enter your contact number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Address Line 1
          </label>
          <input
            name="addressLine1"
            type="text"
            placeholder="Street address"
            value={formData.addressLine1}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Address Line 2 (Optional)
          </label>
          <input
            name="addressLine2"
            type="text"
            placeholder="Apartment, suite, etc."
            value={formData.addressLine2}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">City</label>
            <input
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              District
            </label>
            <input
              name="district"
              type="text"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Preferred Date & Time
          </label>
          <input
            name="preferredDateTime"
            type="datetime-local"
            value={formData.preferredDateTime}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Additional Notes (Optional)
          </label>
          <textarea
            name="notes"
            rows="3"
            placeholder="Mention any preferences or goals"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Submit Booking Request
        </button>
      </form>
    </div>
  );
};

export default Client;