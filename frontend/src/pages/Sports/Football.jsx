import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from "../../assets/assets.js";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Football = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      navigate("/sports");
    }, 500);
  };

  return (
    <div className="min-h-screen px-8 py-20 bg-black bg-opacity-90 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6" data-aos="fade-up">
          Football
        </h1>

        <img
          src={assets.Football1}
          alt="Football Main"
          className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
          data-aos="zoom-in"
        />

        <p className="mb-4" data-aos="fade-right">
          <span className="text-yellow-400 font-semibold">Introduction:</span> Football, also known as soccer in some countries, is the world's most popular sport played between two teams of 11 players on a rectangular field. The main goal is to score by getting the ball into the opposing team’s net using any part of the body except the hands and arms (goalkeepers excluded).
        </p>

        <p className="mb-4" data-aos="fade-left">
          <span className="text-yellow-400 font-semibold">Origin:</span> Modern football originated in England in the mid-19th century, though earlier forms existed in ancient China, Greece, and Rome. The Football Association (FA) was established in 1863, which standardized the rules.
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Objective of the Game:</span> The team with the most goals at the end of 90 minutes wins. Matches can end in a draw unless tournament rules require a winner, in which case extra time and penalties are used.
        </p>

        <div className="my-6" data-aos="zoom-in-up">
          <div className="max-w-md mx-auto">
            <img
              src={assets.Football2}
              alt="Football Gear"
              className="w-full h-64 object-cover rounded border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Basic Rules:</span> Key rules in football include:
          <ul className="list-disc ml-5 mt-2">
            <li>The game is played over two halves of 45 minutes each, with a 15-minute break.</li>
            <li>Players can pass, dribble, or shoot the ball using their feet, head, or chest.</li>
            <li>Fouls result in free kicks or penalties depending on their location and severity.</li>
            <li>Offside is called when a player is closer to the goal line than the second-last defender when the ball is passed to them.</li>
          </ul>
        </p>

        <div className="my-6" data-aos="zoom-in">
          <div className="max-w-md mx-auto">
            <img
              src={assets.Football3}
              alt="Football Field"
              className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Equipment:</span> Basic football equipment includes:
          <ul className="list-disc ml-5 mt-2">
            <li>Football (size 5 for adults)</li>
            <li>Jersey, shorts, socks</li>
            <li>Shin guards</li>
            <li>Football boots (with cleats)</li>
            <li>Goalkeeper gloves (for goalies)</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Famous Tournaments:</span> The most renowned tournament is the FIFA World Cup, held every four years. Other popular tournaments include the UEFA Champions League, Copa América, and domestic leagues like the English Premier League and La Liga.
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Why People Love Football:</span> Football brings together people from all walks of life. The excitement of goals, teamwork, fast-paced action, and dramatic finishes makes it beloved by billions. Legends like Pelé, Diego Maradona, Lionel Messi, and Cristiano Ronaldo have inspired generations.
        </p>

        <button
          onClick={handleBack}
          className="inline-block mt-8 bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300 transition-all"
          data-aos="fade-up"
        >
          ← Back to Explore
        </button>
      </div>
    </div>
  );
};

export default Football;
