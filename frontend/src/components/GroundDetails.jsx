import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GroundContext } from '../context/GroundContext';
import { toast } from 'react-toastify';

const GroundDetails = () => {
  const { backend_url } = useContext(GroundContext);
  const [ground, setGround] = useState(null);
  const { id } = useParams();

  const getGroundById = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/ground/get-ground/${id}`);
      if (data.success) {
        setGround(data.ground);
      }
    } catch (error) {
      toast.error("Error in fetching ground");
    }
  };

  const handleBooking = (timeSlot) => {
    toast.success(`Booking requested for: ${timeSlot}`);
    // Optionally navigate or call API to book
  };

  useEffect(() => {
    getGroundById();
  }, [id]);

  if (!ground) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="rounded-xl overflow-hidden shadow-lg">
        <img
          src={ground.image}
          alt={ground.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{ground.name}</h2>
          <p className="text-gray-600 mb-1"><strong>Category:</strong> {ground.category}</p>
          <p className="text-gray-600 mb-4"><strong>Address:</strong> {ground.address}</p>

          <h3 className="text-lg font-semibold mb-2">Available Time Slots:</h3>
          <div className="flex flex-wrap gap-3">
            {ground.freeTime?.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => handleBooking(slot)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroundDetails;
