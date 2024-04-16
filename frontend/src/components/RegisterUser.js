import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios-config";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [registrationStatus, setRegistrationStatus] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (registrationSuccess) {
      const redirectTimer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [registrationSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (formData.username.trim() === "") {
      errors.username = "Please enter a username";
    }
    if (formData.password.trim() === "") {
      errors.password = "Please enter a password";
    }
    if (formData.firstName.trim() === "") {
      errors.firstName = "Please enter your First Name";
    }
    if (formData.lastName.trim() === "") {
      errors.lastName = "Please enter your Last Name";
    }
    if (formData.email.trim() === "") {
      errors.email = "Please enter an email";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Additional check to prevent null values
    for (const key in formData) {
      if (formData[key].trim() === "") {
        errors[key] = `Please enter ${key}`;
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await axios.post("/register", formData);
      console.log(response.data);
      setRegistrationStatus("Registration successful!");
      setRegistrationSuccess(true);
    } catch (error) {
      if (error.response && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes("username")) {
          setValidationErrors({ username: "Username already exists" });
        } else if (errorMessage.includes("email")) {
          setValidationErrors({ email: "Email already exists" });
        }
      } else {
        console.error(
          "Registration failed:",
          error.response ? error.response.data : error.message
        );
        setRegistrationStatus("Registration failed");
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
            value={formData.username}
            onChange={handleChange}
          />
          {validationErrors.username && (
            <p className="error-message">{validationErrors.username}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {validationErrors.password && (
            <p className="error-message">{validationErrors.password}</p>
          )}

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {validationErrors.firstName && (
            <p className="error-message">{validationErrors.firstName}</p>
          )}

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {validationErrors.lastName && (
            <p className="error-message">{validationErrors.lastName}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {validationErrors.email && (
            <p className="error-message">{validationErrors.email}</p>
          )}

          <button type="submit">Register</button>
          <Link to="/login">
            <button type="button">Back</button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default RegisterUser;
