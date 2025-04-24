import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SportCard = ({ title, players, rules, history, origin, equipment, image, link }) => {
  return (
    <motion.div
      className="bg-black bg-opacity-50 border border-yellow-400 rounded-xl overflow-hidden shadow-lg text-white hover:border-yellow-300 transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-yellow-400 mb-3">{title}</h2>
        <p className="text-sm mb-2"><span className="font-semibold">Origin:</span> {origin}</p>
        <p className="text-sm mb-2"><span className="font-semibold">History:</span> {history}</p>
        <p className="text-sm mb-2"><span className="font-semibold">Rules:</span> {rules}</p>
        <p className="text-sm mb-2"><span className="font-semibold">Equipment:</span> {equipment}</p>
        <p className="text-sm"><span className="font-semibold">Number of Players:</span> {players}</p>
        
        <Link to={link}>
          <button className="mt-4 bg-yellow-400 text-black px-4 py-1.5 rounded hover:bg-yellow-300 transition-colors">
            Learn More
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default SportCard;
