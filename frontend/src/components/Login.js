import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios-config";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", password: "" });
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/login", user);
            sessionStorage.setItem('token', response.data);
            setLoginSuccess(true);

            const navbar = document.getElementById("navbar-root");
            if (navbar) {
                navbar.dispatchEvent(new Event("loginSuccess"));
            }
        } catch (error) {
            console.error("Login error:", error);
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
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
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
