import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "../axios-config";
import studyImage from "../components/StudyGroup.jpg";

const Home = () => {
  return (
    <div className="Home-container">
      <img src={studyImage} alt="studyImage" className="studyImage" />
      <div className="Home-header">
        <h1>Welcome to Studii</h1>
        <p>The ultimate study tool</p>
      </div>
      <div className="About-section">
        <h2>What Is Studii?</h2>
        <p>
          Studii is the ultimate study tool. it provides all of the essential
          neccessities. Studii provides students with the opportunity to create
          study rooms, message fellow students, manage their tasks, and take
          notes in a modern and convenient fashion.
          <br></br>
          <br></br>
          <br></br>
        </p>
      </div>
    </div>
  );
};

export default Home;
