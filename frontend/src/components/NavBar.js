import React, { useState, useEffect } from "react";
import logoImage from "../components/StudiiLogo.jpg";
import { Link, useNavigate } from "react-router-dom";

import RegisterUser from "./RegisterUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles.css";

const NavBar = () => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if there is a token in the session storage on initial render
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); // Ensure isLoggedIn is false if there's no token
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    // Remove the token from session storage on logout
    sessionStorage.removeItem("token");
    // Update the logged-in state
    setIsLoggedIn(false);
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="navbar">
      <img src={logoImage} alt="Logo" className="logo" />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <React.Fragment>
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/RegisterUser">Register</Link>
              </li>
            </React.Fragment>
          )}
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
