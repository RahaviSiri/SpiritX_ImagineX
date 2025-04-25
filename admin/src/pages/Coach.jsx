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
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 overflow-x-auto">
      {/* Yellow glowing orb */}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-yellow-300 opacity-10 rounded-full blur-3xl pointer-events-none z-0" />
  
      {/* Main container */}
      <div className="relative z-10 w-full min-h-screen bg-black/60 p-6 rounded-xl shadow-xl">
        {/* Header and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
            Coach Applications
          </h2>
  
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  filterStatus === status
                    ? "bg-yellow-400 text-black font-semibold"
                    : "bg-gray-800 text-white border-yellow-400 hover:bg-yellow-500 hover:text-black"
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
  
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full border border-yellow-400 text-sm rounded-xl overflow-hidden">
            <thead className="bg-gray-800 text-yellow-300">
              <tr>
                <th className="p-2 border border-yellow-400">Profile</th>
                <th className="p-2 border border-yellow-400">Full Name</th>
                <th className="p-2 border border-yellow-400">NIC Number</th>
                <th className="p-2 border border-yellow-400">NIC Image</th>
                <th className="p-2 border border-yellow-400">Qualifications</th>
                <th className="p-2 border border-yellow-400">Evidence</th>
                <th className="p-2 border border-yellow-400">Approve / Reject</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoaches.length > 0 ? (
                filteredCoaches.map((coach) => (
                  <tr key={coach._id} className="text-center bg-gray-900 border-t border-yellow-400">
                    <td className="p-2 border border-yellow-400">
                      <img
                        src={coach.personalInfo.profile}
                        alt="Profile"
                        className="w-16 h-16 object-cover mx-auto rounded-full border-2 border-yellow-400"
                      />
                    </td>
                    <td className="p-2 border border-yellow-400">
                      {coach.personalInfo.fullName}
                    </td>
                    <td className="p-2 border border-yellow-400">
                      {coach.personalInfo.NIC}
                    </td>
                    <td className="p-2 border border-yellow-400">
                      <img
                        src={coach.personalInfo.NIC_photo}
                        alt="NIC"
                        className="w-16 h-16 object-cover mx-auto rounded border"
                      />
                    </td>
                    <td className="p-2 border border-yellow-400">
                      {coach.coachSelection.qualifications}
                    </td>
                    <td className="p-2 border border-yellow-400">
                      <a
                        href={coach.coachSelection.qualifications_photo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 underline hover:text-yellow-300"
                      >
                        View Document
                      </a>
                    </td>
                    <td className="p-2 border border-yellow-400">
                      {coach.isApprove ? (
                        <span className="text-green-400 font-semibold bg-green-900 px-3 py-1 rounded-full">
                          Approved
                        </span>
                      ) : coach.isReject ? (
                        <span className="text-red-400 font-semibold bg-red-900 px-3 py-1 rounded-full">
                          Rejected
                        </span>
                      ) : (
                        <div className="flex flex-col sm:flex-row justify-center gap-2">
                          <button
                            onClick={() => handleApprove(coach._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(coach._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition-colors"
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
                  <td
                    colSpan="7"
                    className="p-4 text-center text-gray-400 border-t border-yellow-400"
                  >
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
