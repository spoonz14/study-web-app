//import React from "react";
import React, { useEffect } from 'react';

import logoImage from "../components/StudiiLogo.jpg";
import { Link } from "react-router-dom";
import Notes from "./Notes";
import Timers from "./Timers";
import Notif from "./Notif";

import RegisterUser from "./RegisterUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles.css";

const NavBar = () => {
  useEffect(() => {
   var notif = new Notif();
   const token = sessionStorage.getItem("token");
   console.log("token:"+token)
   if (token) {
   notif.fetchTimers();
   }
   
  })
  return (
    <div className="navbar">
      <img src={logoImage} alt="Logo" className="logo" />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/RegisterUser">Register</Link>
          </li>
          <li>
            <Link to="/Notes">Notes</Link>
          </li>
         
  <li>
    <Link to="/Timers">Timers</Link>
  </li>

          <li>
            <Link to="/Catalog">Catalog</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
