import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets.js";
import AOS from "aos";
import "aos/dist/aos.css";

const Hockey = () => {
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
          Hockey
        </h1>

        <img
          src={assets.Hockey1}
          alt="Hockey Main"
          className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
          data-aos="zoom-in"
        />

        <p className="mb-4" data-aos="fade-right">
          <span className="text-yellow-400 font-semibold">Introduction:</span>{" "}
          Hockey is a fast-paced team sport played on a field or ice, where players use a stick to hit a ball or puck into the opposing team’s goal. It's known for its speed, teamwork, and thrilling gameplay.
        </p>

        <p className="mb-4" data-aos="fade-left">
          <span className="text-yellow-400 font-semibold">Origin:</span> Field hockey dates back to ancient civilizations, but the modern version developed in 19th-century England. Ice hockey originated in Canada in the late 1800s and has become a major sport, especially in North America and Europe.
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Objective of the Game:</span>{" "}
          The aim is to score more goals than the opponent by maneuvering the ball or puck into the goal using a stick, while following the game rules and working as a team.
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto" data-aos="zoom-in-up">
            <img
              src={assets.Hockey2}
              alt="Hockey Match"
              className="w-full h-64 object-cover rounded border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Basic Rules:</span>{" "}
          Hockey has distinct rules based on whether it's field or ice hockey, but some basics include:
          <ul className="list-disc ml-5 mt-2">
            <li>Teams usually have 11 players (field) or 6 (ice).</li>
            <li>The game is played in two or three periods.</li>
            <li>Only the flat side of the stick can be used in field hockey.</li>
            <li>Body contact and dangerous plays are penalized.</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Scoring:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>1 goal = 1 point</li>
            <li>Goals are scored by hitting the ball/puck into the net.</li>
            <li>Most goals at the end of regulation wins the game.</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Violations:</span>{" "}
          Key violations in hockey include:
          <ul className="list-disc ml-5 mt-2">
            <li><strong>High stick:</strong> Lifting the stick dangerously</li>
            <li><strong>Obstruction:</strong> Blocking an opponent unfairly</li>
            <li><strong>Offside:</strong> Entering the opponent’s area too early (ice hockey)</li>
            <li><strong>Stick fouls:</strong> Hitting or tripping with the stick</li>
          </ul>
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto" data-aos="zoom-in">
            <img
              src={assets.Hockey3}
              alt="Hockey Equipment"
              className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Equipment:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>Hockey stick</li>
            <li>Ball (field) or puck (ice)</li>
            <li>Protective gear (helmet, shin guards, pads)</li>
            <li>Goalkeeper equipment</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Why People Love Hockey:</span>{" "}
          Hockey is beloved for its speed, physical intensity, and thrilling gameplay. It demands teamwork, strategy, and skill. Iconic players like Wayne Gretzky, Dhyan Chand, and Sidney Crosby have made hockey legendary across different formats.
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

export default Hockey;
