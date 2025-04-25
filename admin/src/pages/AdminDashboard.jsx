import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
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
  const [popularCoaches, setPopularCoaches] = useState([]);
  const [popularGrounds, setPopularGrounds] = useState([]);
  const [popularAcademies, setPopularAcademies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true); // Set loading state to true when fetching data

        // 1. Fetch popular data
        const response = await axios.get('http://localhost:3000/api/admin/dashboard');
        const { data } = response;
        console.log(data);

        if (data && data.popularCoaches && data.popularGrounds && data.popularAcademies) {
          setPopularCoaches(data.popularCoaches);
          setPopularGrounds(data.popularGrounds);
          setPopularAcademies(data.popularAcademies);
        } else {
          throw new Error('Data format is incorrect');
        }

        // 2. Fetch count data for chart
        const countResponse = await axios.get('http://localhost:3000/api/admin/count-booking');
        const countData = countResponse.data;
        setBookingData(countData);
      } catch (error) {
        setError('Failed to fetch data from the server. Please try again later.');
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-black text-yellow-400 flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-black text-red-400 flex items-center justify-center text-xl font-semibold">
        {error}
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
        font: { size: 20, weight: 'bold' },
      },
      legend: {
        labels: { color: '#ffffff' }, // white legend text
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: '#FACC15' }, // yellow x-axis labels
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      y: {
        ticks: { color: '#FACC15' }, // yellow y-axis labels
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 py-10">
      <h2 className="text-4xl font-extrabold text-center text-yellow-400 mb-8 drop-shadow-lg">
        Admin Dashboard
      </h2>
  
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Chart Section */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl w-full lg:w-1/2">
          <Bar data={chartData} options={options} />
        </div>
  
        {/* Most Popular Section */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-full lg:w-1/2">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Most Popular Coaches</h3>
          <ul>
            {popularCoaches.map(coach => (
              <li key={coach.coachId} className="text-white mb-2 flex items-center gap-2">
                <img src={coach.profile} alt={coach.fullName} className="w-10 h-10 rounded-full object-cover" />
                {coach.fullName} - {coach.bookings} bookings
              </li>
            ))}
          </ul>
  
          <h3 className="text-2xl font-bold text-yellow-400 mt-6 mb-4">Most Popular Grounds</h3>
          <ul>
            {popularGrounds.map(ground => (
              <li key={ground.groundId} className="text-white mb-2 flex items-center gap-2">
                <img src={ground.image} alt={ground.name} className="w-10 h-10 rounded-full object-cover" />
                {ground.name} - {ground.bookings} bookings
              </li>
            ))}
          </ul>
  
          <h3 className="text-2xl font-bold text-yellow-400 mt-6 mb-4">Most Popular Academies</h3>
          <ul>
            {popularAcademies.map(academy => (
              <li key={academy.academyId} className="text-white mb-2 flex items-center gap-2">
                <img src={academy.image} alt={academy.name} className="w-10 h-10 rounded-full object-cover" />
                {academy.name} - {academy.bookings} bookings
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
};

export default AdminDashboard;
