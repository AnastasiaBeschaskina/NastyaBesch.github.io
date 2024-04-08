import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FairyTale from "./components/fairyTale/FairyTale";
import Log from "./pages/Log";
import GalleryPage from "./pages/GalleryPage";
import CreationPage from "./pages/Home";
import RegistrationForm from "./components/form/RegistrationForm";
import Home from "./pages/Home";
// import { UserProvider, useUser } from "./UserContext";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/fairy-tale" element={<FairyTale />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/log" element={<Log />} />
        {/* <Route path="/gallery" element={<CreationPage />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
