import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AllGrounds = () => {
    const [grounds, setGrounds] = useState([]);
    const backend_url = "http://localhost:3000";

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
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">All Grounds</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {grounds.map((ground) => (
                    <div
                        key={ground._id}
                        className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 flex flex-col"
                    >
                        <img
                            src={ground.image}
                            alt={ground.name}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="mt-3">
                            <h3 className="text-xl font-semibold text-gray-800">{ground.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{ground.address}</p>
                            <p className="text-sm text-gray-500 capitalize mt-1">{ground.category} | {ground.groundType}</p>

                            <div className="mt-2 flex items-center gap-2">
                                {ground.verified ? (
                                    <span className="text-green-600 flex items-center gap-1 text-sm">
                                        <FaCheckCircle /> Verified
                                    </span>
                                ) : (
                                    <span className="text-red-600 flex items-center gap-1 text-sm">
                                        <FaTimesCircle /> Not Verified
                                    </span>
                                )}
                            </div>

                            {!ground.verified && (
                                <button
                                    onClick={() => handleVerify(ground._id)}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-all"
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
