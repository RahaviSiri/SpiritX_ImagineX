import React from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets.js";

const Volleyball = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      navigate("/sports");
    }, 500);
  };

  return (
    <div className="min-h-screen px-8 py-20 bg-black bg-opacity-90 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6" data-aos="fade-up">Volleyball</h1>

        <img
          src={assets.Volleyball1}
          alt="Volleyball Main"
          className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
          data-aos="zoom-in"
        />

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Introduction:</span>{" "}
          Volleyball is a team sport where two teams of six players are
          separated by a net. The aim is to send the ball over the net and
          ground it on the opponent’s side while preventing the same on one’s
          own side.
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Origin:</span>{" "}
          Volleyball was invented in 1895 by William G. Morgan in the United
          States. It was originally called “Mintonette” and was designed to be a
          less intense alternative to basketball. Over time, it evolved into the
          dynamic sport we know today.
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">
            Objective of the Game:
          </span>{" "}
          Teams score points by grounding the ball on the opponent’s court, or
          when the opponent commits a fault. A match is typically played as
          best-of-five sets. A team must win a set by reaching 25 points with at
          least a 2-point lead (15 points in the fifth set).
        </p>

        <div className="my-6" data-aos="zoom-in">
          <div className="max-w-md mx-auto">
            <img
              src={assets.Volleyball2}
              alt="Volleyball Action"
              className="w-full h-64 object-cover rounded border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Basic Rules:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>
              Each team can touch the ball up to three times before sending it
              over the net.
            </li>
            <li>
              Players must not catch or hold the ball; it must be hit cleanly.
            </li>
            <li>
              Players rotate clockwise every time they win the serve from the
              opponents.
            </li>
            <li>
              Only the serving team can score under older rules, but rally
              scoring (both teams can score) is now common.
            </li>
          </ul>
        </p>

        <div className="my-6" data-aos="zoom-in">
          <div className="max-w-md mx-auto">
            <img
              src={assets.Volleyball3}
              alt="Volleyball Court"
              className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-left">
          <span className="text-yellow-400 font-semibold">Equipment:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>Volleyball (lighter and smaller than footballs)</li>
            <li>Volleyball net and court (9m x 18m)</li>
            <li>Knee pads and volleyball shoes</li>
            <li>Jerseys and shorts</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-left">
          <span className="text-yellow-400 font-semibold">
            Types of Volleyball:
          </span>
          <ul className="list-disc ml-5 mt-2">
            <li>
              <strong>Indoor Volleyball:</strong> Played with six players per
              team.
            </li>
            <li>
              <strong>Beach Volleyball:</strong> Played on sand with two players
              per team.
            </li>
            <li>
              <strong>Sitting Volleyball:</strong> A Paralympic variant for
              athletes with physical impairments.
            </li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">
            Why People Love Volleyball:
          </span>{" "}
          Volleyball is fast-paced, energetic, and team-oriented. It promotes
          coordination, strategy, and athleticism. From casual beach games to
          international tournaments like the Olympics and FIVB World
          Championships, it’s a sport for all ages and skill levels.
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

export default Volleyball;
