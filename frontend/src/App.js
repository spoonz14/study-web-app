import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import RegisterUser from "./components/RegisterUser";
import Notes from "./components/Notes";
import Timers from "./components/Timers";
import StudyRoom from "./components/StudyRoom";
import AddStudyRoom from "./components/AddStudyRoom";
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
          <Route path="/Room/:id" element={<StudyRoom />} />
          <Route path="/Room/create" element={<AddStudyRoom />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
