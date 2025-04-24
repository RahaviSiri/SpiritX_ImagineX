import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFutbol,
  FaChalkboardTeacher,
  FaBookOpen,
  FaTrophy,
  FaUsers,
  FaGraduationCap
} from "react-icons/fa";

const features = [
  {
    title: "Ground Selection",
    path: "/grounds",
    icon: <FaFutbol className="text-5xl text-yellow-400" />,
    description: "Explore and book sports grounds near you."
  },
  {
    title: "Coach Selection",
    path: "/coaches",
    icon: <FaChalkboardTeacher className="text-5xl text-green-400" />,
    description: "Connect with skilled coaches for personalized training."
  },
  {
    title: "Explore Sports",
    path: "/sports",
    icon: <FaBookOpen className="text-5xl text-blue-400" />,
    description: "Discover various sports, rules, history, and team sizes."
  },
  {
    title: "Find Competitions",
    path: "/competitions",
    icon: <FaTrophy className="text-5xl text-red-400" />,
    description: "Discover upcoming tournaments and compete."
  },
  {
    title: "Find Clubs",
    path: "/clubs",
    icon: <FaUsers className="text-5xl text-purple-400" />,
    description: "Meet people with shared sports interests."
  },
  {
    title: "Academy",
    path: "/academy",
    icon: <FaGraduationCap className="text-5xl text-pink-400" />,
    description: "Find sports academies for all age groups and levels."
  }
];

const FeatureCards = () => {
  return (
    <div className="overflow-x-auto w-full px-4 py-10 scrollbar-hide">
      <div className="flex gap-6 w-max">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link
              to={feature.path}
              className="w-72 h-60 min-w-[18rem] bg-gray-800 hover:bg-gray-700 text-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center transition-all duration-300"
            >
              {feature.icon}
              <h3 className="mt-4 text-2xl font-bold">{feature.title}</h3>
              <p className="mt-3 text-base text-gray-300">{feature.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
