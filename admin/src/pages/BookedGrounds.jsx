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
    <div className="p-4">
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="px-4 py-2">Ground Name</th>
              <th className="px-4 py-2">Owner Email</th>
              <th className="px-4 py-2">Booked By</th>
              <th className="px-4 py-2">Time Slot</th>
              <th className="px-4 py-2">Booked Time</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{booking.groundName}</td>
                  <td className="px-4 py-2">{booking.ownerEmail}</td>
                  <td className="px-4 py-2">{booking.userName}</td>
                  <td className="px-4 py-2">{booking.timeSlot}</td>
                  <td className="px-4 py-2">
                    {new Date(booking.bookedTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 capitalize">{booking.status}</td>
                  <td className="px-4 py-2">
                    {booking.status !== "cancelled" ? (
                      <button
                        onClick={() =>
                          handleCancel(booking.groundId, booking.timeSlot, booking.userId._id)
                        }
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-gray-400">Cancelled</span>
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
