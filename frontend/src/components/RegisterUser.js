import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import axios from "../axios-config";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Function to handle the submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", user);
      console.log(response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      if (error.response) {
        // Error response from the server
        console.error("Registration failed:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Request failed:", error.message);
      }
    }
  };

  // Redirect to home page after 3 seconds of displaying the "Registration Successful!" message
  useEffect(() => {
    if (registrationSuccess) {
      const redirectTimer = setTimeout(() => {
        navigate("/"); // Return to home page
      }, 3000);

      return () => clearTimeout(redirectTimer); // Clear the timer on unmount
    }
  }, [registrationSuccess, navigate]);

  return (
    <div className="register">
      <h2>Register User</h2>
      {registrationSuccess ? (
        <div>
          <div>Registration Successful!</div>
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
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegisterUser;
