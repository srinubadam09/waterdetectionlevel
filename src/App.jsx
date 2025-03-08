import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Status from "./Status";
import Home from "./Home";
import Navbar from "./Navbar";

const App = () => {
  return (
    <Router>
     <Navbar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={<Status />} />
        </Routes>
    </Router>
  );
};

export default App;
