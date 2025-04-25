import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GroundContext } from "../context/GroundContext";
import { toast } from "react-toastify";
import { Trash2, Pencil } from "lucide-react";
import { UserContext } from "../context/UserContext";

const GroundDetails = () => {
  const { getGround, ground, backend_url } = useContext(GroundContext);
  const { uToken } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBooking = async (timeSlot) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/ground/handle-booking`,
        {
          groundId: id,
          timeSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Booking successful!");
        getGround(id);
      } else {
        toast.error(response.data.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getGround(id);
  }, [id]);

  if (!ground)
    return (
      <div className="text-center py-10 text-gray-300 text-lg bg-black min-h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-black px-4 py-16 flex flex-col items-center font-sans text-white">
      {/* Yellow Glow Background Layer */}
      <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] bg-yellow-300 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />

      <div className="relative w-full max-w-5xl  rounded-xl shadow-2xl p-6 md:p-10 z-10">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-2 drop-shadow-lg">
          Welcome to {ground.name}
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Book Us and Grow Up Your Skills!
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={ground.image}
            alt={ground.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md border border-yellow-400"
          />

          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              {ground.name}{" "}
              <span className="text-sm text-gray-400">
                ({ground.groundType})
              </span>
            </h2>

            <p className="text-gray-300">
              <strong className="text-yellow-400">Category:</strong> {ground.category}
            </p>
            <p className="text-gray-300">
              <strong className="text-yellow-400">Address:</strong> {ground.address}
            </p>

            <div>
              <h3 className="text-lg font-semibold text-white mt-6 mb-4">
                Available Time Slots: ( Touch Your Time )
              </h3>
              <div className="flex flex-wrap gap-3">
                {ground.freeTime?.length > 0 ? (
                  ground.freeTime.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBooking(slot)}
                      className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition text-sm shadow"
                    >
                      {slot}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">
                    No slots available currently.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={() =>
              navigate("/validate-ground", { state: { id, action: "Update" } })
            }
            className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition"
          >
            <Pencil size={18} /> Update
          </button>

          <button
            onClick={() =>
              navigate("/validate-ground", { state: { id, action: "Delete" } })
            }
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroundDetails;
