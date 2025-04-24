import React, { useState, useEffect } from 'react'; 
import competition from '../assets/competition.jpg';
import { toast } from "react-toastify";

function App() {
  const [competitions, setCompetitions] = useState([]);
  const [posterImage, setPosterImage] = useState(null);
  const [registrationLink, setRegistrationLink] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/competition/getCompetition');
      const data = await response.json();
      setCompetitions(data.competitions);
    } catch (error) {
      console.error('Failed to load competitions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('posterImage', posterImage);
    formData.append('registrationLink', registrationLink);

    try {
      await fetch('http://localhost:3000/api/competition/registerCompetition', {
        method: 'POST',
        body: formData,
      });

      setPosterImage(null);
      setRegistrationLink('');
      loadCompetitions();
      toast.success('Competition added successfully!');
    } catch (error) {
      console.error('Error submitting competition:', error);
      toast.error('Error adding competition!');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4 flex items-center justify-center relative"
      style={{ backgroundImage: `url(${competition})` }}
    >
      {/* Background overlay with blur when form is shown */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"></div>
      )}

      {/* Main content with blur when form is open */}
      <div
        className={`max-w-7xl w-full flex flex-col lg:flex-row space-x-0 lg:space-x-12 justify-center items-center transition duration-300 ${
          showForm ? 'blur-sm pointer-events-none select-none' : ''
        }`}
      >
        <div className="bg-white bg-opacity-60 backdrop-blur-md rounded-2xl p-8 w-full lg:w-2/3 shadow-xl overflow-y-auto max-h-screen">
          <h2 className="text-5xl font-extrabold text-center mb-8 text-sky-900 drop-shadow">Competitions</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {competitions.map((competition) => (
              <li
                key={competition._id}
                className="bg-white bg-opacity-80 p-6 rounded-xl shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <img
                  src={competition.posterImage}
                  alt="Competition Poster"
                  onClick={() => setPreviewImage(competition.posterImage)}
                  className="w-full h-56 object-cover rounded-lg shadow-sm mb-4 transition duration-300 transform hover:scale-105 cursor-pointer"
                />
                <a
                  href={competition.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold hover:underline text-lg transition duration-300 transform hover:scale-105"
                >
                  Register Here
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-72 bg-blue-600 text-white py-3 rounded-xl text-xl hover:bg-sky-700 transition duration-300 font-semibold transform hover:scale-105"
            >
              Add Competition
            </button>
          </div>
        </div>
      </div>

      {/* Add Competition Form (Popup) */}
      {showForm && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white w-full lg:w-[30rem] p-8 rounded-t-xl shadow-2xl z-50 transition-all duration-500 ease-in-out">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-sky-900">Add Competition</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="file"
              onChange={(e) => setPosterImage(e.target.files[0])}
              required
              className="w-full file:px-4 file:py-2 text-lg file:border-0 file:rounded-full file:bg-blue-600 file:text-white file:cursor-pointer transition duration-300 hover:scale-105"
            />
            <input
              type="text"
              value={registrationLink}
              onChange={(e) => setRegistrationLink(e.target.value)}
              placeholder="🔗 Registration Link"
              required
              className="w-full p-3 border border-gray-300 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 hover:border-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 transition duration-300 font-semibold transform hover:scale-105"
            >
              Add Competition
            </button>
          </form>

          <button
            onClick={handleCloseForm}
            className="absolute top-2 right-4 text-2xl font-semibold text-gray-600 hover:text-red-600 transition duration-300"
          >
            &times;
          </button>
        </div>
      )}

      {/* Full-screen Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Full View"
            className="max-w-5xl max-h-[90vh] object-contain rounded-xl shadow-lg border-4 border-white"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-8 text-white text-4xl font-bold hover:text-red-400 transition duration-300"
            onClick={() => setPreviewImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
