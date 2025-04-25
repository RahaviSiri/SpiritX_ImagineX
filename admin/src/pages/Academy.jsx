import React, { useContext, useEffect, useState } from "react";
import { AcademyContext } from "../context/AcademyContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Academy = () => {
  const { backendURL, academies, setAcademies } = useContext(AcademyContext); // Renamed to plural
  const [filterStatus, setFilterStatus] = useState("all");

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { data: response } = await axios.post(
        `${backendURL}/api/admin/approve-academy`,
        { academyId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.success) {
        toast.success("Academy approved successfully!");
        setAcademies((prev) =>
          prev.map((a) => (a._id === id ? { ...a, isApprove: true } : a))
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
        `${backendURL}/api/admin/reject-academy`,
        { academyId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.success) {
        toast.success("Academy rejected successfully!");
        setAcademies((prev) =>
          prev.map((a) => (a._id === id ? { ...a, isReject: true } : a))
        );
      } else {
        toast.error(response.message || "Rejection failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const filteredAcademies = academies.filter((academy) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "pending") return !academy.isApprove && !academy.isReject;
    if (filterStatus === "approved") return academy.isApprove;
    if (filterStatus === "rejected") return academy.isReject;
    return true;
  });

  return (
    <div className="min-h-screen bg-cover bg-center p-4 sm:p-6 overflow-x-hidden">
      <div className="min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Academy Applications</h2>

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
                <th className="p-2 border text-xs sm:text-sm">Image</th>
                <th className="p-2 border text-xs sm:text-sm">Academy Name</th>
                <th className="p-2 border text-xs sm:text-sm">District</th>
                <th className="p-2 border text-xs sm:text-sm">Mode</th>
                <th className="p-2 border text-xs sm:text-sm">Fee</th>
                <th className="p-2 border text-xs sm:text-sm">Start Dates</th>
                <th className="p-2 border text-xs sm:text-sm">Approve / Reject</th>
              </tr>
            </thead>
            <tbody>
              {filteredAcademies.length > 0 ? (
                filteredAcademies.map((academy) => (
                  <tr key={academy._id} className="text-center text-sm">
                    <td className="p-2 border">
                      {academy.academyBasicDetails?.academyLogo ? (
                        <img
                          src={academy.academyBasicDetails.academyLogo}
                          alt="Academy"
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover mx-auto rounded shadow"
                        />
                      ) : (
                        <span>No image</span> // Fallback if image is missing
                      )}
                    </td>
                    <td className="p-2 border">{academy.academyBasicDetails?.academyName}</td>
                    <td className="p-2 border">{academy.Address?.district}</td>
                    <td className="p-2 border capitalize">{academy.academyBasicDetails?.mode}</td>
                    <td className="p-2 border">
                      {academy.academyBasicDetails?.feeAmount === 0
                        ? "Free"
                        : `Rs. ${academy.academyBasicDetails?.feeAmount}`}
                    </td>
                    <td className="p-2 border">
                      {academy.academyBasicDetails?.isFlexible
                        ? "Flexible"
                        : academy.academyBasicDetails?.startDate
                        ? new Date(academy.academyBasicDetails.startDate).toLocaleDateString()
                        : "Not Set"}
                    </td>
                    <td className="p-2 border">
                      {academy.isApprove ? (
                        <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">
                          Approved
                        </span>
                      ) : academy.isReject ? (
                        <span className="text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-full">
                          Rejected
                        </span>
                      ) : (
                        <div className="flex flex-col sm:flex-row justify-center gap-2">
                          <button
                            onClick={() => handleApprove(academy._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors text-xs sm:text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(academy._id)}
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
                    No academies found with the selected filter.
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

export default Academy;
