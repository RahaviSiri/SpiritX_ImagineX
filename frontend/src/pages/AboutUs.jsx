import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaMapMarkerAlt, FaTrophy, FaChalkboardTeacher } from "react-icons/fa";
import assets from "../assets/assets";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-12 px-6 md:px-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-10 text-center"
      >
        About SportHive
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.img
          src={assets.AboutPage}
          alt="People playing sports"
          className="rounded-2xl shadow-xl object-cover w-full h-96"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">What is SportHive?</h2>
          <p className="text-lg leading-relaxed">
            SportHive is a dynamic online platform that brings together sports lovers, players, coaches, and ground owners. Whether you're looking to book a court, find a coach, join a sports community, or participate in competitions — SportHive is your all-in-one sports hub.
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl shadow-lg p-6 text-center bg-white border">
          <FaMapMarkerAlt className="text-4xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Find Places to Play</h3>
          <p className="text-sm mt-2">Search and book sports facilities near you with just a few clicks.</p>
        </div>

        <div className="rounded-2xl shadow-lg p-6 text-center bg-white border">
          <FaChalkboardTeacher className="text-4xl text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Hire Coaches</h3>
          <p className="text-sm mt-2">Connect with experienced coaches to help you improve and grow.</p>
        </div>

        <div className="rounded-2xl shadow-lg p-6 text-center bg-white border">
          <FaUsers className="text-4xl text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Join Communities</h3>
          <p className="text-sm mt-2">Meet players who love the same sport as you and create lasting connections.</p>
        </div>

        <div className="rounded-2xl shadow-lg p-6 text-center bg-white border">
          <FaTrophy className="text-4xl text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Compete & Shine</h3>
          <p className="text-sm mt-2">Participate in local tournaments and showcase your talent to the world.</p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-lg">Join SportHive today and turn your passion into action. 🏆</p>
      </div>
    </div>
  );
};

export default AboutUs;
