import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const AddStudyRoom = () => {
    const navigate = useNavigate();

    const [studyRoom, setStudyRoom] = useState({roomName: ""});

    const [creationSuccess, setCreationSuccess] = useState(false);
    
      const handleChange = (e) => {
        setStudyRoom({ ...studyRoom, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("/catalog", studyRoom);
          console.log(response.data);
          setCreationSuccess(true);
        } catch (error) {
          if (error.response) {
            console.error("Creation failed:", error.response.data);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Request failed:", error.message);
          }
        }
      };

    useEffect(() => {
    if (creationSuccess) {
        const redirectTimer = setTimeout(() => {
        navigate("/catalog");
        }, 3000);

        return () => clearTimeout(redirectTimer);
    }
    }, [creationSuccess, navigate]);

    return (
    <div className="register">
        <h2>Create a Study Room</h2>
        {creationSuccess ? (
        <div>
            <div>Study Room Creation Successful!</div>
            <br />
            <div>Returning to study rooms...</div>
        </div>
        ) : (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="roomName"
            placeholder="Roomname"
            onChange={handleChange}
            />
            <button type="submit">Create</button>
            <Link to="/login"><button type="button">Back</button></Link>
        </form>
        )}
    </div>
    );
};

export default AddStudyRoom

