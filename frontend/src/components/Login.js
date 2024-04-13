import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import axios from "../axios-config";

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post("/login", user);
          console.log(response.data);
          setLoginSuccess(true);
      } catch (error) {
          if (error.response) {
            // Error response from the server
            console.error("Login failed:", error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
          } else {
            // Something happened in setting up the request that triggered an error
            console.error("Request failed:", error.message);
          }
      }
  }  

    // Redirect to "/Home" after 3 seconds of displaying the "Registration Successful!" message
  useEffect(() => {
    if (loginSuccess) {
      const redirectTimer = setTimeout(() => {
        navigate("/"); // Use navigate instead of history.push
      }, 3000);

      return () => clearTimeout(redirectTimer); // Clear the timer on unmount
    }
  }, [loginSuccess, navigate]);

  return (
    <div className="register">
      <h2>Login</h2>
      {loginSuccess ? (
        <div>
          <div>Login Successful!</div>
          <br />
          <div>Returning to home page...</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
