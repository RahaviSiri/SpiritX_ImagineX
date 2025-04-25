import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "../context/UserContext";
import { GroundContext } from '../context/GroundContext';

const BookedItems = () => {
    const { userData, uToken, fetchUser } = useContext(UserContext);
    const groundBookings = userData.groundBookings || [];
    const coachBooking = userData.coachBooking || [];
    const academyBooking = userData.academyBooking || [];

    const { getGround, ground } = useContext(GroundContext);

    const [groundDetails, setGroundDetails] = useState(null);

    useEffect(() => {
        if (uToken) {
            fetchUser();
        }
    }, [uToken]);

    useEffect(() => {
        if (groundBookings.length > 0) {
            const fetchGroundDetails = async () => {
                const groundId = groundBookings[0]?.groundId;
                if (groundId) {
                    await getGround(groundId);
                    setGroundDetails(ground);
                }
            };
            fetchGroundDetails();
        }
    }, [groundBookings, getGround, ground]);

    const renderTable = (data, title, type) => {
        if (data.length === 0) {
            return <p>No bookings found for {title}.</p>;
        }

        return (
            <div className="my-6 bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-yellow-500 text-2xl font-semibold mb-4">{title}</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-yellow-500 text-left py-2 px-4">ID</th>
                                <th className="text-yellow-500 text-left py-2 px-4">Booking Date</th>
                                <th className="text-yellow-500 text-left py-2 px-4">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                let bookingDate = '';
                                let details = '';

                                if (type === 'Ground') {
                                    bookingDate = item.timeSlot;
                                    if (groundDetails) {
                                        details = `Ground Name: ${groundDetails.name}`;
                                    } else {
                                        details = 'Ground details loading...';
                                    }
                                } else if (type === 'Coach') {
                                    bookingDate = item.preferredDateTime ? new Date(item.preferredDateTime).toLocaleString() : 'N/A';
                                    details = `Coach Name: ${item.fullName}, Email: ${item.email}`;
                                } else if (type === 'Academics') {
                                    bookingDate = item.preferredStartDate ? new Date(item.preferredStartDate).toLocaleString() : 'N/A';
                                    details = `Academy ID: ${item.academyId}, Payment Status: ${item.paymentStatus}`;
                                }

                                return (
                                    <tr key={index} className="text-white">
                                        <td className="py-2 px-4">{item._id}</td>
                                        <td className="py-2 px-4">{bookingDate}</td>
                                        <td className="py-2 px-4">{details}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6 pt-20">
            <h1 className="text-yellow-500 text-center text-3xl font-bold mb-6">Booked Items</h1>

            {/* Ground Bookings */}
            {renderTable(groundBookings, "Ground Bookings", 'Ground')}

            {/* Coach Bookings */}
            {renderTable(coachBooking, "Coach Bookings", 'Coach')}

            {/* Academics Bookings */}
            {renderTable(academyBooking, "Academics Bookings", 'Academics')}
        </div>
    );
}

export default BookedItems;
