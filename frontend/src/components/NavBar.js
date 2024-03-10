import React from "react";
import logoImage from "../components/StudiiLogo.jpg";
import { Link } from "react-router-dom";
import Notes from "./Notes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={logoImage} alt="Logo" className="logo" />
      <nav>
        <ul>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/RegisterUser">Register</Link>
          </li>
          <li>
            <Link to="/Notes">Notes</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;