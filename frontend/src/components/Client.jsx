import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import assets from "../assets/assets.js";
import { UserContext } from "../context/UserContext";
// client
const Client = () => {
  const { uToken } = useContext(UserContext);
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
    try {
      e.preventDefault();
      const payload = {
        ...formData,
        id: id,
      };
      // console.log('hi');
      const { data } = await axios.post(
        import.meta.env.VITE_BACKEND_URL + `/api/user/book-coach/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${uToken}`,
          },
          withCredentials: true,
        }
      );
      console.log("hi");
      if (data.success) {
        console.log(data);
        toast.success(data.message);
        // Navigation after successful API call
        console.log("Navigation should happen now!");
        navigate("/client-wait-for-approval");
      } else {
        console.log("error");
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      console.error("Error:", err);
      toast.error(err.message || "An error occurred");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `url(${assets.coach3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-xl w-full bg-black/40 backdrop-blur-md rounded-3xl shadow-2xl p-8 font-sans text-white relative">
        {/* Glowing orb */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-300 opacity-10 rounded-full blur-3xl pointer-events-none z-0" />
  
        <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center drop-shadow">
          Book a Coach - Client Details
        </h1>
  
        <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block font-medium text-yellow-200 mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-black/20 text-white placeholder-gray-400"
              required
            />
          </div>
  
          {/* Email */}
          <div>
            <label className="block font-medium text-yellow-200 mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-black/20 text-white placeholder-gray-400"
              required
            />
          </div>
  
          {/* Contact Number */}
          <div>
            <label className="block font-medium text-yellow-200 mb-1">
              Contact Number
            </label>
            <input
              name="contactNumber"
              type="tel"
              placeholder="Enter your contact number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-black/20 text-white placeholder-gray-400"
              required
            />
          </div>
  
          {/* Address Line 1 */}
          <div>
            <label className="block font-medium text-yellow-200 mb-1">
              Address Line 1
            </label>
            <input
              name="addressLine1"
              type="text"
              placeholder="Street address"
              value={formData.addressLine1}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-black/20 text-white placeholder-gray-400"
              required
            />
          </div>
  
          {/* Address Line 2 */}
          <div>
            <label className="block font-medium text-yellow-200 mb-1">
              Address Line 2 (Optional)
            </label>
            <input
              name="addressLine2"
              type="text"
              placeholder="Apartment, suite, etc."
              value={formData.addressLine2}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-black/20 text-white placeholder-gray-400"
            />
          </div>
  
          {/* City & District */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-yellow-200 mb-1">
                City
              </label>
              <input
                name="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-black/20 text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-yellow-200 mb-1">
                District
              </label>
              <input
                name="district"
                type="text"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
                className="w-full p-3 border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-black/20 text-white placeholder-gray-400"
                required
              />
            </div>
          </div>
  
          {/* Preferred Date & Time */}
          <div>
            <label className="block font-medium text-yellow-200 mb-1">
              Preferred Date & Time
            </label>
            <input
              name="preferredDateTime"
              type="datetime-local"
              value={formData.preferredDateTime}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-black/20 text-white placeholder-gray-400"
              required
            />
          </div>
  
          {/* Notes */}
          <div>
            <label className="block font-medium text-yellow-200 mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              name="notes"
              rows="3"
              placeholder="Mention any preferences or goals"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-3 border border-yellow-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-black/20 text-white placeholder-gray-400"
            ></textarea>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-yellow-400 text-black font-semibold py-3 rounded-xl hover:bg-yellow-300 transition duration-300 shadow-md"
          >
            Submit Booking Request
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default Client;
