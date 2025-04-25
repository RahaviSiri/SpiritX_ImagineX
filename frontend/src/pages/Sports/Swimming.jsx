import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets.js";
import AOS from "aos";
import "aos/dist/aos.css";

const Swimming = () => {
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
          Swimming
        </h1>

        <img
          src={assets.Swimming1}
          alt="Swimming Main"
          className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
          data-aos="zoom-in"
        />

        <p className="mb-4" data-aos="fade-right">
          Swimming is a water-based sport that involves using the arms and legs to move through water. It is one of the most popular and beneficial forms of exercise, combining cardio and strength training into a full-body workout.
        </p>

        <p className="mb-4" data-aos="fade-left">
          Originating as a survival skill, swimming evolved into a competitive sport in the 19th century. It is now a major part of the Olympic Games with several different strokes and distances.
        </p>

        <p className="mb-4" data-aos="fade-up">
          Competitive swimming includes events in freestyle, backstroke, breaststroke, and butterfly. Swimmers must complete races as quickly as possible while adhering to the stroke regulations.
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto" data-aos="zoom-in-up">
            <img
              src={assets.Swimming2}
              alt="Swimming Action"
              className="w-full h-64 object-cover rounded border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Rules of the Game:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>Each stroke has specific technique requirements that must be followed.</li>
            <li>Swimmers must touch the wall at each turn and at the finish.</li>
            <li>False starts result in disqualification.</li>
            <li>No swimmer is allowed to obstruct another competitor.</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Scoring and Timing:</span>
          Swimming is purely time-based. The winner is the swimmer who touches the wall first. Heats, semifinals, and finals determine rankings and medal positions in major competitions.
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto" data-aos="zoom-in">
            <img
              src={assets.Swimming3}
              alt="Swimming Equipment"
              className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Equipment Needed:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>Swimsuit (performance suit for competition)</li>
            <li>Swimming cap and goggles</li>
            <li>Kickboard, pull buoy, and fins for training</li>
            <li>Towel and water bottle for hydration</li>
          </ul>
        </p>

        <p className="mb-4" data-aos="fade-up">
          <span className="text-yellow-400 font-semibold">Why People Love Swimming:</span>
          Swimming is accessible, therapeutic, and ideal for people of all fitness levels. It improves cardiovascular health, strengthens muscles, and reduces stress. Whether you're diving into a pool for fun or training for a race, swimming offers both joy and challenge. Famous swimmers like Michael Phelps and Katie Ledecky have inspired millions worldwide.
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

export default Swimming;
