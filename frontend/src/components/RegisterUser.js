import React, { useState } from "react";
import axios from "../axios-config"; // Import the axios instance

const RegisterUser = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", user); // Use the axios instance
      console.log(response.data);
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

  return (
    <div>
      <h2>Register User</h2>
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
    </div>
  );
};

export default RegisterUser;
