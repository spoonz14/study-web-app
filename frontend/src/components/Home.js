import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "../axios-config";

const Home = () => {
  return (
    <div className="Home-header">
      <h1>Welcome to Studii!</h1>
    </div>
  );
};

export default Home;
