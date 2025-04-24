import React from 'react';
import { Link } from 'react-router-dom';
import assets from "../../assets/assets.js";

const Netball = () => {
  return (
    <div className="min-h-screen px-8 py-20 bg-black bg-opacity-90 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6">Netball</h1>

        <img
          src={assets.Netball1}
          alt="Netball Main"
          className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
        />

        <p className="mb-4">
          <span className="text-yellow-400 font-semibold">Introduction:</span> Netball is a fast-paced, non-contact team sport played by two teams of seven players. It’s particularly popular among women and played in over 80 countries. The game is played on a rectangular court with raised goal rings at each end.
        </p>

        <p className="mb-4">
          <span className="text-yellow-400 font-semibold">Origin:</span> Netball was derived from early versions of basketball. It was formalized in England in the 1890s and quickly became widespread in Commonwealth countries, especially Australia, New Zealand, and the UK.
        </p>

        <p className="mb-4">
          <span className="text-yellow-400 font-semibold">Objective of the Game:</span> The aim is to score goals by passing a ball down the court and shooting it through the opponent’s goal ring. Each goal is worth one point. The team with the most points at the end of four 15-minute quarters wins.
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto">
            <img
              src={assets.Netball2}
              alt="Netball Action"
              className="w-full h-64 object-cover rounded border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4">
          <span className="text-yellow-400 font-semibold">Basic Rules:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>Each player has a specific area on the court they can move within based on their position.</li>
            <li>No dribbling or running with the ball—players can take only one step while holding it.</li>
            <li>Players must pass or shoot the ball within three seconds of receiving it.</li>
            <li>Only the Goal Shooter and Goal Attack can score goals, and only from within the shooting circle.</li>
          </ul>
        </p>

        <div className="my-6">
          <div className="max-w-md mx-auto">
            <img
              src={assets.Netball3}
              alt="Netball Court"
              className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
            />
          </div>
        </div>

        <p className="mb-4">
          <span className="text-yellow-400 font-semibold">Equipment:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>Netball (similar to a basketball but slightly lighter)</li>
            <li>Goal posts with rings (no backboards)</li>
            <li>Team uniforms with position bibs</li>
            <li>Netball shoes with good grip</li>
          </ul>
        </p>

        <p className="mb-4">
          <span className="text-yellow-400 font-semibold">Why People Love Netball:</span> Netball is all about speed, precision, and teamwork. It encourages quick decision-making, coordination, and strategic passing. It’s especially empowering for women and girls and fosters strong team spirit in both competitive and social settings.
        </p>

        <Link
          to="/sports"
          className="inline-block mt-8 bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300 transition-all"
        >
          ← Back to Explore
        </Link>
      </div>
    </div>
  );
};

export default Netball;
