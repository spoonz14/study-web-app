import React from "react";
import logoImage from "../components/StudiiLogo.jpg";
import "./styles.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logoImage} alt="Logo" classname="logo" />
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
