import React, { useState, useEffect, useCallback } from "react";
import axios from "../axios-config";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ChatComponent from "./ChatComponent";

const StudyRoom = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [roomUserId, setRoomUserId] = useState("");
  const { id } = useParams();
  const [tokenUserId, setUserId] = useState(null);
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  const fetchRoomDetails = useCallback(async (roomId) => {
    try {
      const response = await axios.get(`/room/${roomId}`);
      console.log("Response from backend:", response.data);
      console.log("Room's User ID: ", response.data.userId);
      console.log("Room Name: ", response.data.roomName);

      setRoomName(response.data.roomName);
      setRoomUserId(response.data.userId);
      // Check if userId from token matches userId from response
      const token = sessionStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const tokenUserId = decodedToken.id;
        setUserId(tokenUserId);
        if (tokenUserId === response.data.userId) {
          console.log("Can delete status: true");
        } else {
          console.log("Can delete status: false");
        }
      }
    } catch (error) {
      console.error("Error fetching room details: ", error);
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchRoomDetails(id);
    }
  }, [id, navigate, fetchRoomDetails]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/room/${id}`);
      console.log("Delete response:", response.data);
      // Handle delete success
      setDeletionSuccess(true);
    } catch (error) {
      console.error("Error deleting room: ", error);
    }
  };

  useEffect(() => {
    if (deletionSuccess) {
      const redirectTimer = setTimeout(() => {
        navigate("/catalog");
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [deletionSuccess, navigate]);

  return (
    <>
      <div className="studyRoom-background"></div>
      <div className="StudyRoom-container">
        <div className="StudyRoom-header">
          <h1>Welcome to "{roomName}"!</h1>
          {deletionSuccess ? (
            <div>
              <div>Deletion Successful.</div>
              <br />
              <div>Returning to study rooms...</div>
            </div>
          ) : (
            <div className="Content-section">
              <h2>Chat</h2>
              <ChatComponent roomId={id} />
            </div>
          )}
        </div>
      </div>
      {tokenUserId === roomUserId && (
        <button className="delete-room-button" onClick={handleDelete}>
          Delete Room
        </button>
      )}
    </>
  );
};

export default StudyRoom;
