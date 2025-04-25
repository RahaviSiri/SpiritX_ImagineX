import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AllGrounds = () => {
    const [grounds, setGrounds] = useState([]);
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const getAllGrounds = async () => {
        try {
            const { data } = await axios.get(`${backend_url}/api/ground/get-all-grounds`);
            if (data.success) {
                setGrounds(data.grounds);
            } else {
                toast.error("Error in fetching all grounds");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleVerify = async (id) => {
        try {
            const { data } = await axios.post(`${backend_url}/api/ground/verify-ground/${id}`);
            if (data.success) {
                toast.success(data.message);
                getAllGrounds();
            } else {
                toast.error("Error");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getAllGrounds();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-4 text-white">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center drop-shadow-lg">
            All Grounds
          </h2>
      
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grounds.map((ground) => (
              <div
                key={ground._id}
                className="bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-700 flex flex-col transition hover:scale-105 duration-300"
              >
                <img
                  src={ground.image}
                  alt={ground.name}
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-yellow-400">{ground.name}</h3>
                  <p className="text-sm text-gray-300 mt-1">{ground.address}</p>
                  <p className="text-sm text-gray-400 capitalize mt-1">{ground.category} | {ground.groundType}</p>
      
                  <div className="mt-2 flex items-center gap-2">
                    {ground.verified ? (
                      <span className="text-green-400 flex items-center gap-1 text-sm">
                        <FaCheckCircle /> Verified
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1 text-sm">
                        <FaTimesCircle /> Not Verified
                      </span>
                    )}
                  </div>
      
                  {!ground.verified && (
                    <button
                      onClick={() => handleVerify(ground._id)}
                      className="mt-4 px-4 py-2 bg-yellow-400 text-black text-sm font-semibold rounded-full hover:bg-yellow-500 transition-all"
                    >
                      Verify Ground
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
};

export default AllGrounds;
