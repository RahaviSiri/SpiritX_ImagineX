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
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `url(${assets.ValidationBackround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black/40 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4 text-white">
          Are you sure to {action} ground ? 
        </h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Owner Email"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Owner Password"
            value={ownerPassword}
            onChange={(e) => setOwnerPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleValidation}
            className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition"
          >
            {action === "Delete" ? "Confirm Deletion" : "Proceed to Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidateGround;
