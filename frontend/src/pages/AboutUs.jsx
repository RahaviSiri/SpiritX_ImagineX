import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaTrophy,
  FaChalkboardTeacher,
  FaQuestionCircle,
} from "react-icons/fa";
import assets from "../assets/assets";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-12 px-6 md:px-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-10 text-center text-blue-800"
      >
        About SportHive
      </motion.h1>

      {/* About Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
        <motion.img
          src={assets.AboutPage}
          alt="People playing sports"
          className="rounded-2xl shadow-2xl object-cover w-full h-96"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-700">
            What is SportHive?
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            SportHive is your all-in-one sports destination that connects players,
            coaches, and venue owners. Discover courts, hire certified coaches,
            join vibrant sports communities, and compete in events all under one
            roof!
          </p>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {[
          {
            icon: <FaMapMarkerAlt className="text-4xl text-blue-600 mx-auto mb-4" />,
            title: "Find Places to Play",
            text: "Search and book sports facilities near you with ease.",
          },
          {
            icon: <FaChalkboardTeacher className="text-4xl text-green-600 mx-auto mb-4" />,
            title: "Hire Coaches",
            text: "Connect with certified coaches to level up your game.",
          },
          {
            icon: <FaUsers className="text-4xl text-purple-600 mx-auto mb-4" />,
            title: "Join Communities",
            text: "Meet like-minded players and grow your network.",
          },
          {
            icon: <FaTrophy className="text-4xl text-yellow-500 mx-auto mb-4" />,
            title: "Compete & Shine",
            text: "Participate in tournaments and show off your skills.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="rounded-2xl shadow-xl p-6 text-center bg-white border hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {feature.icon}
            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{feature.text}</p>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 rounded-2xl p-10 shadow-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8 flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-blue-500" /> Frequently Asked Questions
          </h2>

          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                q: "How do I book a ground?",
                a: "Just head over to the 'Find Places' section, select your preferred sport and location, then pick a time slot that works for you.",
              },
              {
                q: "How can I hire a coach?",
                a: "Go to 'Hire Coaches', filter by sport and experience, and book directly from their profile.",
              },
              {
                q: "Is SportHive free to use?",
                a: "Absolutely! Browsing, joining communities, and connecting is free. Booking venues or hiring coaches may have separate fees.",
              },
              {
                q: "Can I organize a tournament?",
                a: "Yes! SportHive allows verified users and community leaders to host tournaments and invite players.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="border-b pb-4">
                <h4 className="text-lg font-semibold text-gray-800">{faq.q}</h4>
                <p className="text-sm text-gray-600 mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <p className="text-xl font-medium text-gray-800">
          Join <span className="text-blue-600 font-semibold">SportHive</span> today and turn your passion into action. 🏆
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
