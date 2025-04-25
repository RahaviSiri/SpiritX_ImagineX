import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets.js";
import AOS from "aos";
import "aos/dist/aos.css";

const Cricket = () => {
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
          Cricket
        </h1>

        <img
          src={assets.Cricket1}
          alt="Cricket Main"
          className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
          data-aos="zoom-in"
        />

        <p className="mb-4" data-aos="fade-right">
          <span className="text-yellow-400 font-semibold">Introduction:</span>{" "}
          Cricket is a bat-and-ball game played between two teams of 11 players
          each on a circular or oval-shaped field. The center of the field has a
          rectangular 22-yard pitch with wickets (three wooden stumps) at each
          end. It’s one of the most popular sports globally, especially in
          countries like India, Pakistan, England, Australia, and South Africa.
        </p>

        <p className="mb-4" data-aos="fade-left">
          <span className="text-yellow-400 font-semibold">Origin:</span> Cricket
          was born in England in the 16th century. By the 18th century, it was
          considered the country’s national sport. With the British Empire's
          expansion, cricket spread across continents, gaining massive
          popularity in South Asia and other Commonwealth nations.
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">
            Objective of the Game:
          </span>{" "}
          One team bats, attempting to score as many runs as possible, while the
          other team bowls and fields to restrict those runs and dismiss the
          batters. After a set number of overs or dismissals, the teams switch
          roles. The team with the most runs at the end of the match wins.
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto" data-aos="zoom-in-up">
            <img
              src={assets.Cricket2}
              alt="Cricket Gear"
              className="w-full h-64 object-cover rounded border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Basic Rules:</span>{" "}
          Cricket can be played in different formats:
          <ul className="list-disc ml-5 mt-2">
            <li>
              <strong>Test Matches:</strong> Played over 5 days with two innings
              per team. Considered the most traditional form.
            </li>
            <li>
              <strong>One Day Internationals (ODIs):</strong> Each team bats for
              50 overs.
            </li>
            <li>
              <strong>Twenty20 (T20):</strong> A fast-paced format with 20 overs
              per side, usually completed within 3 hours.
            </li>
          </ul>
          In all formats, a bowler delivers the ball, a batter tries to score
          runs, and fielders try to prevent runs or get batters out.
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Scoring:</span> Runs
          are scored by:
          <ul className="list-disc ml-5 mt-2">
            <li>Running between the wickets after hitting the ball</li>
            <li>Hitting the ball to the boundary (4 runs)</li>
            <li>
              Hitting the ball over the boundary without it touching the ground
              (6 runs)
            </li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">
            Methods of Getting Out:
          </span>{" "}
          Common ways a batter can be dismissed include:
          <ul className="list-disc ml-5 mt-2">
            <li>
              <strong>Bowled:</strong> The ball hits the stumps
            </li>
            <li>
              <strong>Caught:</strong> The ball is caught before touching the
              ground
            </li>
            <li>
              <strong>Leg Before Wicket (LBW):</strong> The ball hits the
              batter's leg in front of the stumps
            </li>
            <li>
              <strong>Run Out:</strong> A batter fails to reach the crease
              before the stumps are hit
            </li>
          </ul>
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto" data-aos="zoom-in">
            <img
              src={assets.Cricket3}
              alt="Cricket Field"
              className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Equipment:</span> A
          cricket match requires:
          <ul className="list-disc ml-5 mt-2">
            <li>Bat and ball</li>
            <li>Stumps and bails (for wickets)</li>
            <li>Protective gear like pads, gloves, helmet</li>
            <li>Team uniform and shoes with spikes</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">
            Why People Love Cricket:
          </span>{" "}
          Cricket is more than a sport in many countries—it’s a passion. It
          brings people together, builds community spirit, and showcases
          incredible skill, strategy, and drama. Players like Sachin Tendulkar,
          Virat Kohli, MS Dhoni, and international icons like Jacques Kallis and
          Ben Stokes have become legends of the game.
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

export default Cricket;
