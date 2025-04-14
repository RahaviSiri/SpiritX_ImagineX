import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GroundContext } from '../context/GroundContext';
import { toast } from 'react-toastify';
import { Trash2, Pencil } from 'lucide-react';

const GroundDetails = () => {
  const { backend_url,getGround,ground } = useContext(GroundContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBooking = (timeSlot) => {
    toast.success(`Booking requested for: ${timeSlot}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${backend_url}/api/ground/delete-ground/${id}`);
      if (data.success) {
        toast.success("Ground deleted successfully");
        navigate("/all-ground");
      }
    } catch (error) {
      toast.error("Failed to delete ground");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    navigate(`/add-ground/${id}`);
  };

  useEffect(() => {
    getGround(id);
  }, [id]);

  if (!ground) return <div className="text-center py-10 text-gray-600 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-10">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Welcome to {ground.name}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Book Us and Grow Up Your Skills!
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={ground.image}
            alt={ground.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
          />

          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {ground.name} <span className="text-sm text-gray-500">({ground.groundType})</span>
            </h2>

            <p className="text-gray-700"><strong>Category:</strong> {ground.category}</p>
            <p className="text-gray-700"><strong>Address:</strong> {ground.address}</p>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">
                Available Time Slots:
              </h3>
              <div className="flex flex-wrap gap-3">
                {ground.freeTime?.length > 0 ? (
                  ground.freeTime.map((slot, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBooking(slot)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm shadow"
                    >
                      {slot}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No slots available currently.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={handleUpdate}
            className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
          >
            <Pencil size={18} /> Update
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroundDetails;
