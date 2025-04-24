import React, { useContext, useEffect, useState } from "react";
import { CoachContext } from "../context/CoachContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import assets from "../assets/assets.js";

const Coach = () => {
  const { backendURL, Coach, setCoach } = useContext(CoachContext);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data: response } = await axios.post(
        `${backendURL}/api/admin/approve`,
        { userId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.success) {
        toast.success("Coach approved successfully!");
        setCoach((prev) =>
          prev.map((c) => (c._id === id ? { ...c, isApprove: true } : c))
        );
      } else {
        toast.error(response.message || "Approval failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data: response } = await axios.post(
        `${backendURL}/api/admin/reject`,
        { userId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.success) {
        toast.success("Coach rejected successfully!");
        setCoach((prev) =>
          prev.map((c) => (c._id === id ? { ...c, isReject: true } : c))
        );
      } else {
        toast.error(response.message || "Rejection failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const filteredCoaches = Coach.filter((coach) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "pending") return !coach.isApprove && !coach.isReject;
    if (filterStatus === "approved") return coach.isApprove;
    if (filterStatus === "rejected") return coach.isReject;
    return true;
  });

  return (
    <div className="min-h-screen bg-cover bg-center p-4 sm:p-6 overflow-x-hidden">
      <div className="min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Coach Applications
          </h2>

          <div className="flex flex-wrap gap-2">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg transition text-sm ${
                  filterStatus === status
                    ? status === "all"
                      ? "bg-blue-600 text-white"
                      : status === "pending"
                      ? "bg-yellow-500 text-white"
                      : status === "approved"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {status === "all"
                  ? "All"
                  : status === "pending"
                  ? "Need Approval"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full border">
            <thead>
              <tr>
                <th className="p-2 border text-xs sm:text-sm">Profile</th>
                <th className="p-2 border text-xs sm:text-sm">Full Name</th>
                <th className="p-2 border text-xs sm:text-sm">NIC Number</th>
                <th className="p-2 border text-xs sm:text-sm">NIC Image</th>
                <th className="p-2 border text-xs sm:text-sm">Qualifications</th>
                <th className="p-2 border text-xs sm:text-sm">Qualifications Evidence</th>
                <th className="p-2 border text-xs sm:text-sm">Approve / Reject</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoaches.length > 0 ? (
                filteredCoaches.map((coach) => (
                  <tr key={coach._id} className="text-center text-sm">
                    <td className="p-2 border">
                      <img
                        src={coach.personalInfo.profile}
                        alt="Profile"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover mx-auto rounded-full border-2 border-blue-200"
                      />
                    </td>
                    <td className="p-2 border">{coach.personalInfo.fullName}</td>
                    <td className="p-2 border">{coach.personalInfo.NIC}</td>
                    <td className="p-2 border">
                      <img
                        src={coach.personalInfo.NIC_photo}
                        alt="NIC"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover mx-auto rounded shadow"
                      />
                    </td>
                    <td className="p-2 border">{coach.coachSelection.qualifications}</td>
                    <td className="p-2 border">
                      <a
                        href={coach.coachSelection.qualifications_photo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 underline hover:text-green-200 text-xs sm:text-sm"
                      >
                        View Document
                      </a>
                    </td>
                    <td className="p-2 border">
                      {coach.isApprove ? (
                        <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">
                          Approved
                        </span>
                      ) : coach.isReject ? (
                        <span className="text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-full">
                          Rejected
                        </span>
                      ) : (
                        <div className="flex flex-col sm:flex-row justify-center gap-2">
                          <button
                            onClick={() => handleApprove(coach._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors text-xs sm:text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(coach._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-xs sm:text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500 text-sm">
                    No coaches found with the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Coach;
