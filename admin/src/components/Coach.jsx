import React, { useContext, useEffect, useState } from "react";
import { CoachContext } from "../context/CoachContext";
import { toast } from "react-toastify";
import axios from "axios";
import assets from "../assets/assets.js";

const Coach = () => {
  const { backendURL, Coach, setCoach } = useContext(CoachContext);
  const [filterStatus, setFilterStatus] = useState("all"); // Default filter is "all"

  console.log(Coach);

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
      console.error(error);
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
        setCoach((prev) => prev.map((c) => c._id === id ? {...c, isReject: true} : c));
      } else {
        toast.error(response.message || "Rejection failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Filter coaches based on selected status
  const filteredCoaches = Coach.filter(coach => {
    if (filterStatus === "all") return true;
    if (filterStatus === "pending") return !coach.isApprove && !coach.isReject;
    if (filterStatus === "approved") return coach.isApprove;
    if (filterStatus === "rejected") return coach.isReject;
    return true;
  });

  return (
    <div 
      className="min-h-screen bg-cover bg-center p-6" 
      style={{ backgroundImage: `url(${assets.coach1})` }}
    >
      <div className="bg-white/90 min-h-screen rounded-lg shadow-xl p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Coach Applications</h2>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-lg transition ${filterStatus === "all" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterStatus("pending")}
              className={`px-4 py-2 rounded-lg transition ${filterStatus === "pending" 
                ? "bg-yellow-500 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Need Approval
            </button>
            <button 
              onClick={() => setFilterStatus("approved")}
              className={`px-4 py-2 rounded-lg transition ${filterStatus === "approved" 
                ? "bg-green-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Approved
            </button>
            <button 
              onClick={() => setFilterStatus("rejected")}
              className={`px-4 py-2 rounded-lg transition ${filterStatus === "rejected" 
                ? "bg-red-600 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Rejected
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Profile</th>
                <th className="p-2 border">Full Name</th>
                <th className="p-2 border">NIC Number</th>
                <th className="p-2 border">NIC Image</th>
                <th className="p-2 border">Qualifications</th>
                <th className="p-2 border">Qualifications Evidence</th>
                <th className="p-2 border">Approve / Reject</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoaches.length > 0 ? (
                filteredCoaches.map((coach) => (
                  <tr key={coach._id} className="text-center hover:bg-gray-50">
                    <td className="p-2 border">
                      <img
                        src={coach.personalInfo.profile}
                        alt="Profile"
                        className="w-20 h-20 object-cover mx-auto rounded-full border-2 border-blue-200"
                      />
                    </td>
                    <td className="p-2 border">{coach.personalInfo.fullName}</td>
                    <td className="p-2 border">{coach.personalInfo.NIC}</td>
                    <td className="p-2 border">
                      <img
                        src={coach.personalInfo.NIC_photo}
                        alt="NIC"
                        className="w-20 h-20 object-cover mx-auto rounded shadow"
                      />
                    </td>
                    <td className="p-2 border">{coach.coachSelection.qualifications}</td>
                    <td className="p-2 border">
                      <a
                        href={coach.coachSelection.qualifications_photo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
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
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleApprove(coach._id)}
                            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(coach._id)}
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
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
                  <td colSpan="7" className="p-4 text-center text-gray-500">
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