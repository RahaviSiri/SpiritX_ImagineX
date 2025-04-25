import React from "react";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import assets from "../assets/assets.js";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2 text-yellow-400">
            <img
              src={assets.Logo}
              alt="SportsHive Logo"
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain "
            />
            SportsHive
          </h2>

          <p className="mb-3 text-sm">
            Stay in the loop and sign up for the SportsHive newsletter:
          </p>
          <div className="flex items-center rounded-full bg-white/10 overflow-hidden max-w-xs">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 bg-transparent text-white placeholder-white outline-none w-full"
            />
            <button className="bg-white text-black px-4 py-2">→</button>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Find Ground
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Find Coach
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Explore Sports
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Competitions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Communities
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Documentation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Help Centre
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Social</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Facebook size={18} />
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Facebook
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={18} />
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Instagram
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Youtube size={18} />
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Youtube
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Twitter size={18} />
              <a href="#" className="hover:text-yellow-400 transition-colors">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-white/20 pt-4 text-sm flex flex-col md:flex-row justify-between items-center text-white/70">
        <p>© SportsHive Inc. All Rights Reserved 2025</p>
        <a
          href="#"
          className="mt-2 md:mt-0 hover:text-yellow-400 transition-colors"
        >
          Terms & Conditions
        </a>
      </div>
    </footer>
  );
};

export default Footer;
