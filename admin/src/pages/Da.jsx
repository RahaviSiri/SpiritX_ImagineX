import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Fetch booking data from the backend (example URL)
    const fetchBookingData = async () => {
      try {
        const response = await fetch('/api/admin/booking-stats');
        const data = await response.json();
        setBookingData(data);  // Set your response data here
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookingData();
  }, []);

  // Check if data is loaded
  if (!bookingData) {
    return <div>Loading...</div>;
  }

  // Prepare chart data
  const chartData = {
    labels: ['Coaches', 'Grounds', 'Academies'], // X-axis labels
    datasets: [
      {
        label: 'Number of Bookings',
        data: [
          bookingData.coachesCount, 
          bookingData.groundsCount, 
          bookingData.academiesCount
        ], // Data for bookings (replace with your data)
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Bar color
        borderColor: 'rgba(54, 162, 235, 1)', // Border color
        borderWidth: 1,
      },
      {
        label: 'Total Amount',
        data: [
          bookingData.coachesAmount,
          bookingData.groundsAmount,
          bookingData.academiesAmount
        ], // Data for amounts (replace with your data)
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Bar color for amount
        borderColor: 'rgba(255, 99, 132, 1)', // Border color
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Bookings and Amounts Overview',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div className="admin-dashboard">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AdminDashboard;
