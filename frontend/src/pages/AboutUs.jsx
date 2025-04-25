import React, { useEffect } from "react";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaTrophy,
  FaChalkboardTeacher,
  FaQuestionCircle,
} from "react-icons/fa";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const features = [
    {
      icon: (
        <FaMapMarkerAlt className="text-4xl text-yellow-400 mx-auto mb-3" />
      ),
      title: "Find Places to Play",
      desc: "Search and book nearby courts or grounds with ease.",
    },
    {
      icon: (
        <FaChalkboardTeacher className="text-4xl text-yellow-400 mx-auto mb-3" />
      ),
      title: "Hire Coaches",
      desc: "Choose from skilled and certified coaches to help you grow.",
    },
    {
      icon: <FaUsers className="text-4xl text-yellow-400 mx-auto mb-3" />,
      title: "Join Communities",
      desc: "Meet fellow players and build your sports tribe.",
    },
    {
      icon: <FaTrophy className="text-4xl text-yellow-400 mx-auto mb-3" />,
      title: "Compete & Shine",
      desc: "Showcase your skills in exciting local tournaments.",
    },
  ];

  const faqs = [
    {
      q: "How do I book a ground?",
      a: "Go to the 'Find Places' page, select your sport and area, and choose an available time slot.",
    },
    {
      q: "How can I hire a coach?",
      a: "Visit the 'Hire Coaches' section, filter by sport and experience, and book your favorite coach.",
    },
    {
      q: "Is SportHive free to use?",
      a: "Yes! You can explore communities and listings for free. Booking fees apply for venues and coaches.",
    },
    {
      q: "Can I organize a tournament?",
      a: "Yes, verified users can host tournaments and invite others through SportHive’s event tools.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black bg-opacity-90">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 animate__animated animate__fadeIn">
        {/* Intro Section */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-16 mt-16">
          {/* Text Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              What is SportHive?
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              SportHive is your all-in-one sports destination that connects
              players, coaches, and venue owners. Discover courts, hire
              certified coaches, join vibrant sports communities, and compete in
              events — all in one place!
            </p>

            {/* Stats Section */}
            <div className="flex flex-col md:flex-row gap-6 justify-start">
              <div className="flex flex-col items-center justify-center bg-black/50 rounded-xl shadow-lg p-6 w-full md:w-1/2">
                <div className="flex items-center gap-3">
                  <FaUsers className="text-3xl text-yellow-500" />
                  <p className="text-lg text-yellow-500 font-semibold">
                    User Counts
                  </p>
                </div>
                <p className="text-3xl text-center font-bold text-yellow-300">20</p>
              </div>

              <div className="flex flex-col items-center justify-center bg-black/50 rounded-xl shadow-lg p-6 w-full md:w-1/2">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-3xl text-yellow-500" />
                  <p className="text-lg text-yellow-500 font-semibold">
                    Registered Ground Counts
                  </p>
                </div>
                <p className="text-3xl text-center font-bold text-yellow-300">20</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/3">
            <img
              src={assets.AboutPage}
              alt="People playing sports"
              className="rounded-2xl shadow-lg w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-black shadow-md border border-gray-600 text-center hover:scale-105 transition-all"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-yellow-500 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-black/60 p-8 rounded-2xl shadow-inner mb-16">
          <h2 className="text-3xl font-bold text-yellow-500 text-center mb-8 flex items-center justify-center gap-2">
            <FaQuestionCircle className="text-yellow-300" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="pb-4 border-b border-yellow-100"
                data-aos="fade-up"
              >
                <h4 className="font-semibold text-yellow-400 text-lg">
                  {faq.q}
                </h4>
                <p className="text-gray-300 text-sm mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-xl font-medium text-gray-200">
            Join <span className="text-yellow-500 font-bold">SportHive</span> today
            and turn your passion into action. 🏆
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-6 py-3 bg-yellow-500 text-black rounded-xl shadow hover:bg-yellow-600 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
