import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets.js";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Netball = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
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
        <h1 data-aos="fade-down" className="text-4xl font-bold text-yellow-400 mb-6">Netball</h1>

        <img
          data-aos="zoom-in"
          src={assets.Netball1}
          alt="Netball Main"
          className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
        />

        <p data-aos="fade-up" className="mb-4">
          <span className="text-yellow-400 font-semibold">Introduction:</span> Netball is a fast-paced, non-contact team sport played by two teams of seven players. The game emphasizes sharp passing, quick footwork, spatial awareness, and precise teamwork. Popular in Commonwealth countries, it's a game that fosters discipline, collaboration, and fitness.
        </p>

        <p data-aos="fade-up" className="mb-4">
          <span className="text-yellow-400 font-semibold">Origin:</span> Netball was derived from early versions of basketball in the late 19th century. It developed in England as a women's sport and spread through the British Empire. The rules were adapted to encourage less physical contact and became formalized in the 1900s. Today, it's played globally, particularly in countries like Australia, New Zealand, England, and Jamaica.
        </p>

        <p data-aos="fade-up" className="mb-4">
          <span className="text-yellow-400 font-semibold">Objective of the Game:</span> The aim is to score goals by passing a ball down the court and shooting it through a raised ring. The team that scores the most goals in four 15-minute quarters wins. Players have designated positions and must stay within their assigned zones, creating a unique and tactical approach to the game.
        </p>

        <div className="my-6" data-aos="fade-up">
          <div className="max-w-md mx-auto">
            <img
              src={assets.Netball2}
              alt="Netball Action"
              className="w-full h-64 object-cover rounded border border-yellow-400"
            />
          </div>
        </div>

        <div data-aos="fade-up" className="mb-4">
          <span className="text-yellow-400 font-semibold">Basic Rules:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>Each player has a specific area on the court they are allowed to move within, based on their position (e.g., Goal Attack, Centre, Goal Keeper).</li>
            <li>No dribbling or running with the ball. Players must pass the ball to move it down the court.</li>
            <li>Players must pass or shoot the ball within three seconds of receiving it, promoting quick decisions and teamwork.</li>
            <li>Only the Goal Shooter and Goal Attack are permitted to score goals and only from within the goal circle.</li>
            <li>Contact is not allowed; players must defend from at least three feet away, ensuring a clean, tactical game.</li>
          </ul>
        </div>

        <div className="my-6" data-aos="fade-up">
          <div className="max-w-md mx-auto">
            <img
              src={assets.Netball3}
              alt="Netball Court"
              className="w-full h-64 object-cover rounded mb-6 border border-yellow-400"
            />
          </div>
        </div>

        <div data-aos="fade-up" className="mb-4">
          <span className="text-yellow-400 font-semibold">Equipment:</span>
          <ul className="list-disc ml-5 mt-2">
            <li>Netball (similar in size to a basketball but lighter and easier to grip)</li>
            <li>Goal posts with rings but no backboard, making accurate shots more challenging</li>
            <li>Team uniforms with position bibs that clearly indicate the role of each player on court</li>
            <li>Supportive footwear with strong grip to allow for fast movements and sudden changes in direction</li>
          </ul>
        </div>

        <p data-aos="fade-up" className="mb-4">
          <span className="text-yellow-400 font-semibold">Why People Love Netball:</span> Netball is all about speed, precision, and teamwork. It promotes fitness, discipline, and communication, making it a great sport for players of all ages. It’s especially popular in schools and communities for its accessibility and inclusiveness. The sport continues to grow internationally, driven by passionate fans and competitive leagues.
        </p>

        <button
          onClick={handleBack}
          data-aos="fade-up"
          className="inline-block mt-8 bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300 transition-all"
        >
          ← Back to Explore
        </button>
      </div>
    </div>
  );
};

export default Netball;
