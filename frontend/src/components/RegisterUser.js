import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", user);
      console.log(response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      if (error.response) {
        console.error("Registration failed:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request failed:", error.message);
      }
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      const redirectTimer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [registrationSuccess, navigate]);

  return (
    <div className="register">
      <h2>Register User</h2>
      {registrationSuccess ? (
        <div>
          <div>Registration Successful!</div>
          <br />
          <div>Returning to login page...</div>
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
          <Link to="/login"><button type="button">Back</button></Link>
        </form>
      )}
    </div>
  );
};

export default RegisterUser;
