import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios-config";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (user.username.trim() === "") {
      errors.username = "Please enter a username";
    }
    if (user.password.trim() === "") {
      errors.password = "Please enter a password";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await axios.post("/login", user);
      sessionStorage.setItem("token", response.data);
      setLoginSuccess(true);

      const navbar = document.getElementById("navbar-root");
      if (navbar) {
        navbar.dispatchEvent(new Event("loginSuccess"));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError("Incorrect username or password");
      } else {
        console.error("Login error:", error);
      }
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoginSuccess(true);
    }
  }, []);

  useEffect(() => {
    if (loginSuccess) {
      const redirectTimer = setTimeout(() => {
        navigate("/"); // Use navigate instead of history.push
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [loginSuccess, navigate]);

  return (
    <div className="register">
      <h2>Login</h2>
      {loginSuccess ? (
        <div>
          <div>Login Successful!</div>
          <br />
          <div>Returning to Home page...</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          {validationErrors.username && (
            <p className="error-message">{validationErrors.username}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {validationErrors.password && (
            <p className="error-message">{validationErrors.password}</p>
          )}

          {loginError && <p className="error-message">{loginError}</p>}

          <button type="submit">Login</button>
          <Link to="/RegisterUser">
            <button type="button">Sign up</button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default Login;
