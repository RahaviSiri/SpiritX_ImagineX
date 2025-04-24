import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import assets from '../assets/assets';

const ContactUs = () => {
  const { backendURL } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendURL}/api/contact/contact-admin`, { email, question });
      if (data.success) {
        toast.success(data.message);
        setEmail('');
        setQuestion('');
      } else {
        toast.error('Error in sending message');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage: `url(${assets.AddGroundBackroundImage})`,
      }}
    >
      <div className="bg-white/50 bg-opacity-95 backdrop-blur-sm p-10 rounded-3xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">Contact Us</h2>
        <p className="text-center text-gray-600 mb-6">
          We'd love to hear from you! Fill out the form below with your question.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">Your Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              rows="5"
              className="w-full p-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Type your question here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
