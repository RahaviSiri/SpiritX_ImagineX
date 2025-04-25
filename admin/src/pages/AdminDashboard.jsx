import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/count-booking');
        const data = await response.json();
        setBookingData(data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookingData();
  }, []);

  if (!bookingData) {
    return (
      <div className="w-full min-h-screen bg-black text-yellow-400 flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  const chartData = {
    labels: ['Coaches', 'Grounds', 'Academies'],
    datasets: [
      {
        label: 'Number of Bookings',
        data: [
          bookingData.coachesCount,
          bookingData.groundsCount,
          bookingData.academiesCount,
        ],
        backgroundColor: 'rgba(250, 204, 21, 0.7)', // yellow-400
        borderColor: 'rgba(250, 204, 21, 1)', // yellow-400
        borderWidth: 2,
      },
      {
        label: 'Total Amount',
        data: [
          bookingData.coachesAmount,
          bookingData.groundsAmount,
          bookingData.academiesAmount,
        ],
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // light gray/white
        borderColor: 'rgba(255, 255, 255, 1)', // white
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Bookings and Amounts Overview',
        color: '#FACC15', // yellow-400
        font: {
          size: 20,
          weight: 'bold',
        },
      },
      legend: {
        labels: {
          color: '#ffffff', // white legend text
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FACC15', // yellow x-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#FACC15', // yellow y-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 py-10">
      <h2 className="text-4xl font-extrabold text-center text-yellow-400 mb-8 drop-shadow-lg">
        Admin Dashboard
      </h2>
      <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AdminDashboard;
