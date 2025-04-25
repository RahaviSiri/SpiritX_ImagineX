import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookedGrounds = () => {
  const [bookings, setBookings] = useState([]);
  const backend_url = "http://localhost:3000";

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/ground/get-all-bookings`);
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error("Failed to fetch bookings");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCancel = async (groundId, timeSlot, userId) => {
    try {
      const { data } = await axios.post(`${backend_url}/api/ground/cancel-booking`, {
        groundId,
        timeSlot,
        userId,
      });

      if (data.success) {
        toast.success("Booking cancelled successfully");
        getAllBookings(); // Refresh the bookings
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4 text-white">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center drop-shadow">
        Booked Grounds
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-2xl bg-gray-800 border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700 text-sm text-left">
          <thead className="bg-gray-900 text-yellow-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Ground Name</th>
              <th className="px-4 py-3">Owner Email</th>
              <th className="px-4 py-3">Booked By</th>
              <th className="px-4 py-3">Time Slot</th>
              <th className="px-4 py-3">Booked Time</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3">{booking.groundName}</td>
                  <td className="px-4 py-3">{booking.ownerEmail}</td>
                  <td className="px-4 py-3">{booking.userName}</td>
                  <td className="px-4 py-3">{booking.timeSlot}</td>
                  <td className="px-4 py-3">
                    {new Date(booking.bookedTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 capitalize">
                    {booking.status === "cancelled" ? (
                      <span className="text-red-400">Cancelled</span>
                    ) : (
                      <span className="text-green-400">{booking.status}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {booking.status !== "cancelled" ? (
                      <button
                        onClick={() =>
                          handleCancel(booking.groundId, booking.timeSlot, booking.userId._id)
                        }
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-gray-500 italic">N/A</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookedGrounds;
