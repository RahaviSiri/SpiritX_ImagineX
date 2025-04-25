import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets.js";
import AOS from "aos";
import "aos/dist/aos.css";

const Tennis = () => {
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
          Tennis
        </h1>

        <img
          src={assets.Tennis1}
          alt="Tennis Main"
          className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
          data-aos="zoom-in"
        />

        <p className="mb-4" data-aos="fade-right">
          <span className="text-yellow-400 font-semibold">Introduction:</span>{" "}
          Tennis is a racket sport that can be played individually or in pairs. The objective is to hit the ball over the net and into the opponent's court, aiming to score points by making the ball land in the correct areas of the court.
        </p>

        <p className="mb-4" data-aos="fade-left">
          <span className="text-yellow-400 font-semibold">Origin:</span> Tennis originated in France during the late 19th century and was originally played with bare hands. The game evolved, and by the early 20th century, it had gained immense popularity globally, with major tournaments like Wimbledon, the US Open, and the French Open.
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">
            Objective of the Game:
          </span>{" "}
          In tennis, players aim to score points by hitting the ball into the opponent's side of the court. The goal is to win a set, and the first player or team to win a set typically needs to win six games with a two-game advantage.
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto" data-aos="zoom-in-up">
            <img
              src={assets.Tennis2}
              alt="Tennis Gear"
              className="w-full h-64 object-cover rounded border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Basic Rules:</span>{" "}
          Tennis can be played in singles (one player per side) or doubles (two players per side). The key rules are:
          <ul className="list-disc ml-5 mt-2">
            <li>
              The game begins with a serve, where the server must hit the ball into the opposite side of the court.
            </li>
            <li>
              The ball must stay inside the baseline and sidelines. Points are scored when the opponent fails to return the ball.
            </li>
            <li>
              The server serves each point from alternating sides of the court.
            </li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Scoring:</span> Tennis scoring is unique:
          <ul className="list-disc ml-5 mt-2">
            <li>0 points = Love</li>
            <li>1 point = 15</li>
            <li>2 points = 30</li>
            <li>3 points = 40</li>
            <li>4 points = Game (if ahead by 2 points)</li>
          </ul>
          A player must win 4 points with at least a 2-point lead to win a game. If the score reaches 40-40, it’s called a deuce.
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Methods of Winning:</span>{" "}
          Players win points when:
          <ul className="list-disc ml-5 mt-2">
            <li>
              The opponent fails to return the ball within the allowed boundaries.
            </li>
            <li>
              The opponent hits the ball out of bounds.
            </li>
            <li>
              The opponent hits the ball into the net.
            </li>
          </ul>
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto" data-aos="zoom-in">
            <img
              src={assets.Tennis3}
              alt="Tennis Court"
              className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Equipment:</span> A
          tennis match requires:
          <ul className="list-disc ml-5 mt-2">
            <li>Tennis racket</li>
            <li>Tennis balls</li>
            <li>Tennis shoes with proper grip</li>
            <li>Tennis court (grass, clay, or hard surface)</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Why People Love Tennis:</span>{" "}
          Tennis is known for its exciting rallies, intense rivalries, and individualistic nature. It brings out the best in players and has produced legends like Roger Federer, Serena Williams, Rafael Nadal, and Novak Djokovic.
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

export default Tennis;
