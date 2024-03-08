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
    </div>
  );
};

export default Home;
