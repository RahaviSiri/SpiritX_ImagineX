import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GroundContext } from "../context/GroundContext";
import assets from "../assets/assets.js";

const ValidateGround = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { backend_url } = useContext(GroundContext);

  const { id, action } = location.state || {};
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");

  const handleValidation = async () => {
    if (!ownerEmail || !ownerPassword) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backend_url}/api/ground/validate-ground/${id}`,
        { ownerPassword, ownerEmail }
      );
      if (data.success) {
        if (action === "Delete") {
          try {
            const { data } = await axios.delete(
              `${backend_url}/api/ground/delete-ground/${id}`
            );
            if (data.success) {
              toast.success("Ground deleted successfully");
              navigate("/all-ground");
            }
          } catch (error) {
            toast.error("Failed to delete ground");
          }
        } else if (action === "Update") {
          navigate(`/add-ground/${id}`);
        }
      } else {
        toast.error("Error in Validation");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: `url(${assets.ValidationBackround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-yellow-300/50"></div>
      <div className="w-full max-w-md bg-black/50 backdrop-blur-md p-8 rounded-xl shadow-2xl shadow-black">
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6">
          Confirm to {action} Ground
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Owner Email"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            className="w-full px-4 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password"
            placeholder="Owner Password"
            value={ownerPassword}
            onChange={(e) => setOwnerPassword(e.target.value)}
            className="w-full px-4 py-2 border bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <button
            onClick={handleValidation}
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            {action === "Delete" ? "Confirm Deletion" : "Proceed to Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidateGround;
