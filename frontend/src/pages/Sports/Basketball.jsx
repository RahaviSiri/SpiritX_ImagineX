import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets.js";
import AOS from "aos";
import "aos/dist/aos.css";

const Basketball = () => {
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
          Basketball
        </h1>

        <img
          src={assets.Basketball1}
          alt="Basketball Main"
          className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
          data-aos="zoom-in"
        />

        <p className="mb-4" data-aos="fade-right">
          <span className="text-yellow-400 font-semibold">Introduction:</span>{" "}
          Basketball is a fast-paced team sport played between two teams of five players each. The objective is to shoot the ball through the opposing team’s hoop to score points. It's one of the most popular sports in the world, known for its high energy, athleticism, and excitement.
        </p>

        <p className="mb-4" data-aos="fade-left">
          <span className="text-yellow-400 font-semibold">Origin:</span> Basketball was invented in 1891 by Dr. James Naismith in Springfield, Massachusetts, USA. Originally played with a soccer ball and peach baskets, it evolved into a global sport with millions of fans and professional leagues like the NBA.
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Objective of the Game:</span>{" "}
          The goal is to score more points than the opponent by shooting the ball into the basket. Teams use offense to create scoring opportunities and defense to prevent the opposing team from scoring.
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto" data-aos="zoom-in-up">
            <img
              src={assets.Basketball2}
              alt="Basketball Match"
              className="w-full h-64 object-cover rounded border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Basic Rules:</span>{" "}
          Basketball has several key rules:
          <ul className="list-disc ml-5 mt-2">
            <li>Each game is played in four quarters of 10 or 12 minutes.</li>
            <li>Players can dribble, pass, and shoot the ball.</li>
            <li>No physical contact like pushing or hitting is allowed (fouls).</li>
            <li>A shot made inside the arc is worth 2 points; outside the arc is 3 points; free throws are 1 point each.</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Scoring:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>Field goal inside the 3-point line = 2 points</li>
            <li>Field goal beyond the 3-point line = 3 points</li>
            <li>Free throw = 1 point</li>
          </ul>
          The team with the most points at the end of the game wins.
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Violations:</span>{" "}
          Common violations in basketball include:
          <ul className="list-disc ml-5 mt-2">
            <li><strong>Traveling:</strong> Moving without dribbling the ball</li>
            <li><strong>Double dribble:</strong> Stopping and restarting the dribble</li>
            <li><strong>Shot clock violation:</strong> Failing to attempt a shot within the time limit</li>
            <li><strong>Fouls:</strong> Illegal physical contact with an opponent</li>
          </ul>
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto" data-aos="zoom-in">
            <img
              src={assets.Basketball3}
              alt="Basketball Equipment"
              className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Equipment:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>Basketball</li>
            <li>Basketball court with hoops</li>
            <li>Team uniforms and basketball shoes</li>
            <li>Scoreboard and shot clock</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Why People Love Basketball:</span>{" "}
          Basketball combines speed, skill, teamwork, and strategy. It’s exciting to play and watch. Iconic players like Michael Jordan, LeBron James, Kobe Bryant, and Stephen Curry have made the sport legendary, inspiring generations across the globe.
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

export default Basketball;
