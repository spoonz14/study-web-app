import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ChatComponent = ({ roomId }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    const username = decodedToken.sub;
    setUsername(username);
    setUserId(userId);

    console.log("Username: ", username)

    const ws = new WebSocket(
      `ws://localhost:8090/websocket?&roomId=${roomId}`
    );

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log("Received message:", receivedMessage);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setSocket(null);
    };

    const fetchMessages = async () => {
      try {
        console.log("Room ID: ", roomId);
        const response = await axios.get(
          `http://localhost:8090/api/messages/${roomId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [roomId, navigate]);

  const sendMessage = async () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const newMessage = {
        content: inputMessage,
        sender: username,
        studyRoomId: roomId,
        userId: userId,
      };

      console.log("Sending message:", newMessage);

      try {
        await axios.post("http://localhost:8090/api/messages", newMessage);
        console.log("Message successfully sent and saved to the database.");

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.error("WebSocket connection not established");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === username ? "sent-message" : "received-message"}
          >
            <span>{message.sender}: </span>
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
