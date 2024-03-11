import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import RegisterUser from "./components/RegisterUser";
import NoteList from "./components/NoteList";
import Notes from "./components/Notes";
import ChatRoom from "./components/ChatRoom";
import StudyRoom from "./components/StudyRoom"
import "./components/styles.css";

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/RegisterUser" element={<RegisterUser />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Chat" element={<ChatRoom />} />{" "}
          <Route path="/room/:id" element={<StudyRoom />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
