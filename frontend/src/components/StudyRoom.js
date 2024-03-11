import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { useParams } from "react-router-dom";

const StudyRoom = () => {
  const [roomName, setRoomName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // const roomId = 202;
    fetchRoomName(id);
  }, [id]);

  const fetchRoomName = async (roomId) => {
    try {
      const response = await axios.get(`/room/${roomId}`);
      console.log("Response from backend:", response.data);
      setRoomName(response.data.roomName);
      console.log("Room Name:", response.data.roomName);
    } catch (error) {
      console.error("Error fetching roomName: ", error);
    }
  };
  return (
    <div className="StudyRoom-container">
      <div className="StudyRoom-header">
        <h1>Welcome to "{roomName}"!</h1>
      </div>
      <div className="Content-section">
        <h2>Content</h2>
      </div>
    </div>
  );
};

export default StudyRoom;