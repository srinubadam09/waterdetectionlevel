import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-[url('https://source.unsplash.com/1600x900/?water')] bg-cover bg-center opacity-30"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg animate-fade-in">
          Welcome to the Home Page
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-lg mx-auto">
          Monitor your water detection system in real-time with automation and efficiency.
        </p>

        {/* CTA Button */}
        <Link to="/status">
          <button className="mt-6 px-8 py-3 text-lg font-semibold rounded-full shadow-lg bg-blue-700 hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-blue-300">
            Check Water Status
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
