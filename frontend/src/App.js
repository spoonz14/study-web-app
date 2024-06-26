import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import RegisterUser from "./components/RegisterUser";
import Notes from "./components/Notes";
import Timers from "./components/Timers";
import StudyRoom from "./components/StudyRoom";
import AddStudyRoom from "./components/AddStudyRoom";
import ChatComponent from "./components/ChatComponent";
import Catalog from "./components/Catalog";
import Login from "./components/Login";
import CalendarPage from "./components/CalendarPage";
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
          <Route path="/Calendar" element={<CalendarPage />} />
          <Route path="/Timers/:monthNumber/:dayNumber" element={<Timers />} />
          <Route path="/Chat" element={<ChatComponent />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/Room/:id" element={<StudyRoom />} />
          <Route path="/Room/create" element={<AddStudyRoom />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
