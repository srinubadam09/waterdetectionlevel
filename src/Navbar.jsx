import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaWater } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FaWater className="text-white text-3xl" />
            <span className="text-white text-xl font-bold">Water Monitor</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/status"
              className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
            >
              Status
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 py-3 px-6 space-y-3">
          <Link
            to="/"
            className="block text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/status"
            className="block text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Status
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
