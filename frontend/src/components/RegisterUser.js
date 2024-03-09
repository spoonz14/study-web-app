import React, { useState } from "react";
import axios from "../axios-config";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

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
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register">
      {registrationSuccess ? (
        <div>
          <h2>Registration Successful!</h2>
          <p>Your registration was successful.</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default RegisterUser;
