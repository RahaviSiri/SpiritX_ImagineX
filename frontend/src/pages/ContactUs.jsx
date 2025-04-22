import React from "react";
import assets from "../assets/assets";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-cover bg-center px-6 py-12" style={{ backgroundImage: `url(${assets.AddGroundBackroundImage})` }}>
      <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-10 max-w-7xl mx-auto shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 text-center mb-10">About SportHive</h1>

        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <img
            src={assets.AboutPage}
            alt="People playing sports"
            className="rounded-2xl shadow-lg w-full h-96 object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">What is SportHive?</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              SportHive is your all-in-one sports destination that connects players,
              coaches, and venue owners. Discover courts, hire certified coaches,
              join vibrant sports communities, and compete in events — all in one place!
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              title: "Find Places to Play",
              desc: "Search and book nearby courts or grounds with ease.",
            },
            {
              title: "Hire Coaches",
              desc: "Choose from skilled and certified coaches to help you grow.",
            },
            {
              title: "Join Communities",
              desc: "Meet fellow players and build your sports tribe.",
            },
            {
              title: "Compete & Shine",
              desc: "Showcase your skills in exciting local tournaments.",
            },
          ].map((item, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white shadow-md border border-gray-200 text-center hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white/80 p-8 rounded-2xl shadow-inner mb-16">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
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
            ].map((faq, i) => (
              <div key={i} className="pb-4 border-b border-blue-100">
                <h4 className="font-semibold text-blue-800 text-lg">{faq.q}</h4>
                <p className="text-gray-600 text-sm mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-xl font-medium text-gray-800">
            Join <span className="text-blue-600 font-bold">SportHive</span> today and turn your passion into action. 🏆
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
