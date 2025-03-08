import React, { useEffect, useState } from "react";
import { FaTint, FaPowerOff } from "react-icons/fa";

const API_URL = "http://192.168.81.63"; // ESP32 IP Address
const API_KEY = "9032898930";

const Status = () => {
  const [waterLevel, setWaterLevel] = useState(0);
  const [motorStatus, setMotorStatus] = useState(false);

  // Fetch Data from ESP32 API
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/status?key=${API_KEY}`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      console.log("API Response:", data);

      let level = 0;
      if (data.bottom === 0 && data.top === 0) level = 10;
      else if (data.bottom === 0 && data.top === 1) level = 50;
      else if (data.bottom === 1 && data.top === 1) level = 100;

      setWaterLevel(level);
      setMotorStatus(level < 100);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gradient-to-br from-blue-200 to-indigo-400 p-6">
      {/* Header */}
      <div className="text-center mt-5">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">
          Water Detection Status
        </h1>
        <h2 className="text-lg md:text-xl text-gray-700 mt-2">
          Real-time Monitoring System
        </h2>
      </div>

      {/* Main Section: Water Tank & Motor Side-by-Side */}
      <div className="flex flex-row items-center justify-center mt-10 space-x-16">
        {/* Water Tank UI */}
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-80 border-4 border-blue-900 rounded-lg overflow-hidden bg-gray-300 shadow-2xl">
            {/* Solid Water Level */}
            <div
              className="absolute bottom-0 left-0 w-full bg-blue-500 transition-all duration-700 ease-in-out"
              style={{ height: `${waterLevel}%` }}
            >
              {/* Continuous Left-to-Right Moving Waves */}
              <div className="absolute w-full h-8 overflow-hidden" style={{ top: "-5px" }}>
                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
              </div>
            </div>
          </div>
          <p className="text-lg font-semibold mt-3 text-blue-900 flex items-center">
            <FaTint className="text-blue-500 text-2xl animate-pulse mr-2" />
            Water Level: {waterLevel}%
          </p>
        </div>

        {/* Motor Status */}
        <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-2xl w-40">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Motor Status</h3>
          <span
            className={`text-white px-5 py-3 rounded-full text-lg font-bold transition-all duration-500 flex items-center ${
              motorStatus ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          >
            <FaPowerOff className={`mr-2 text-xl ${motorStatus ? "animate-spin" : ""}`} />
            {motorStatus ? "ON" : "OFF"}
          </span>
        </div>
      </div>

      {/* Tailwind Custom CSS for Water Waves */}
      <style>{`
        .wave {
          position: absolute;
          width: 200%;
          height: 100%;
          background: url('data:image/svg+xml;utf8,<svg width="300" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M 0 20 Q 50 0, 100 20 T 200 20 T 300 20 V40 H0 Z" fill="rgba(255, 255, 255, 0.5)"/></svg>') repeat-x;
          background-size: 150px 40px;
        }

        .wave1 {
          top: -10;
          animation: waveMove 4s linear infinite;
        }

        .wave2 {
          top: 0;
          opacity: 0.5;
          animation: waveMove 6s linear infinite reverse;
        }

        @keyframes waveMove {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(100px); }
        }
      `}</style>
    </div>
  );
};

export default Status;
