import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ChatComponent = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    setUserId(userId);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/api/messages/${userId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    const ws = new WebSocket(`ws://localhost:8090/websocket?userId=${userId}`);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log("Received message:", receivedMessage);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [navigate]);

  const sendMessage = async () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const newMessage = {
        content: inputMessage,
        sender: "You",
        userId: userId,
      };

      console.log("Sending message:", newMessage);

      try {
        // Send message to the backend
        await axios.post("http://localhost:8090/api/messages", newMessage);

        // Display confirmation message
        console.log("Message successfully sent and saved to the database.");

        // Update the UI or perform any additional actions
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
            className={
              message.sender === "You" ? "sent-message" : "received-message"
            }
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
