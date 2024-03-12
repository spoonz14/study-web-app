import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const Catalog = () => {
  const [studyRooms, setStudyRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    console.log("Fetching study rooms...");
    const fetchStudyRooms = async () => {
      try {
        const response = await axios.get("/catalog");
        console.log("Study rooms fetched:", response.data);
        setStudyRooms(response.data);
      } catch (error) {
        console.error("Error fetching study rooms:", error);
        setError(error);
      }
      setIsLoading(false);
    };

    fetchStudyRooms();
  }, []);

  // Handle study room click event
  const handleStudyRoomClick = (roomId) => {
    // Navigate to the room page with the corresponding ID
    navigate(`/Room/${roomId}`);
  };

  return (
    <>
      <div className="catalog-background"></div>
      <div className="catalog-container">
        <div className="catalog-title">Study Groups</div>
        {studyRooms.map((room) => (
          // Render each study room as a clickable element
          <div
            key={room.studyRoomId}
            className="catalog-item"
            onClick={() => handleStudyRoomClick(room.studyRoomId)} // Attach click event handler
          >
            {room.roomName}
          </div>
        ))}
      </div>
    </>
  );
};

export default Catalog;
