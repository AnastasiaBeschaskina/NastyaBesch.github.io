import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Log from "./pages/Log";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<Log />} />
      </Routes>
    </Router>
  );
}

export default App;
