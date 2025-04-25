import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets.js";
import AOS from "aos";
import "aos/dist/aos.css";

const Badminton = () => {
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
          Badminton
        </h1>

        <img
          src={assets.Badminton1}
          alt="Badminton Main"
          className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
          data-aos="zoom-in"
        />

        <p className="mb-4" data-aos="fade-right">
          Badminton is a dynamic racquet sport played indoors by either two players (singles) or four players (doubles). The game involves hitting a shuttlecock back and forth over a high net using a lightweight racquet. The shuttlecock, unlike a ball, flies differently due to its shape and feathered structure.
        </p>

        <p className="mb-4" data-aos="fade-left">
          The origins of badminton can be traced back to ancient games played in India and Greece, but the modern version was developed in British India and formalized in England in the 19th century.
        </p>

        <p className="mb-4" data-aos="fade-up">
          The aim of the game is to score points by landing the shuttlecock in the opponent’s court. Quick reflexes, agility, and stamina are key attributes of successful badminton players.
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto" data-aos="zoom-in-up">
            <img
              src={assets.Badminton2}
              alt="Badminton Action"
              className="w-full h-64 object-cover rounded border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Rules of the Game:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>Each match is the best of 3 games of 21 points.</li>
            <li>Every time there is a serve, a point is scored (rally scoring).</li>
            <li>At 20-all, the side which gains a 2-point lead first, wins the game.</li>
            <li>At 29-all, the side that scores the 30th point wins that game.</li>
            <li>The side winning a game serves first in the next game.</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Scoring and Faults:</span>
          Players win rallies when the opponent fails to return the shuttlecock within the boundaries or commits a fault. Common faults include:
          <ul className="list-disc ml-5 mt-2">
            <li>Shuttle lands outside the court boundaries</li>
            <li>Fails to pass over the net</li>
            <li>Touching the net with the body or racket</li>
            <li>Double hits</li>
          </ul>
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto" data-aos="zoom-in">
            <img
              src={assets.Badminton3}
              alt="Badminton Gear"
              className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Equipment Needed:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>Badminton Racket</li>
            <li>Shuttlecock (Feathered or Nylon)</li>
            <li>Proper non-marking court shoes</li>
            <li>Comfortable sportswear</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Why People Love Badminton:</span>
          The game is a blend of speed, strategy, and stamina. It's accessible for all ages and levels and can be both recreational and competitive. It offers a full-body workout and improves hand-eye coordination and cardiovascular health. The international presence of players like P. V. Sindhu, Lin Dan, and Viktor Axelsen keeps the sport exciting and widely followed.
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

export default Badminton;
