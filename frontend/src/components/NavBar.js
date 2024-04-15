import React, { useState, useEffect } from "react";
import logoImage from "../components/StudiiLogo.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn based on token existence

    const handleLoginSuccess = () => {
      setIsLoggedIn(true); // Update isLoggedIn state on login success
    };

    const navbar = document.getElementById("navbar-root");
    if (navbar) {
      navbar.addEventListener("loginSuccess", handleLoginSuccess);
    }

    return () => {
      if (navbar) {
        navbar.removeEventListener("loginSuccess", handleLoginSuccess);
      }
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <div id="navbar-root" className="navbar">
      <img src={logoImage} alt="Logo" className="logo" />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout} className="nav-link logout-button">
                Logout
              </button>
            </li>
          ) : (
            <React.Fragment>
              <li>
                <Link to="/Login">Login</Link>
              </li>
            </React.Fragment>
          )}
          <li>
            <Link to="/Notes">Notes</Link>
          </li>
          <li>
            <Link to="/Timers">To Do List</Link>
          </li>
          <li>
            <Link to="/Catalog">Study Rooms</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
