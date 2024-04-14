import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import RegisterUser from "./components/RegisterUser";
import Notes from "./components/Notes";
import Timers from "./components/Timers";
import StudyRoom from "./components/StudyRoom";
import Catalog from "./components/Catalog";
import Login from "./components/Login";
import "./components/styles.css";

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/RegisterUser" element={<RegisterUser />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Timers" element={<Timers />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/room/:id" element={<StudyRoom />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
