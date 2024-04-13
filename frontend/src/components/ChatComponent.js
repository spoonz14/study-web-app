import React, { useState, useEffect } from "react";

function ChatComponent() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8090/websocket-chat");

    ws.onopen = () => {
      console.log("WebSocket connected");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      // Handle incoming WebSocket messages
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = (event) => {
      if (event.code === 1000) {
        console.log("WebSocket disconnected normally");
      } else {
        console.error(`WebSocket disconnected with code ${event.code}`);
        setError(`WebSocket disconnected with code ${event.code}`);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("WebSocket error. See console for details.");
    };

    return () => {
      // Clean up WebSocket connection when component unmounts
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        content: inputMessage,
        sender: "You", // Assuming the sender is the current user
        type: "CHAT", // Assuming MessageType is a string enum
      };
      socket.send(JSON.stringify(message));
      setInputMessage("");
    } else {
      console.error("WebSocket connection not established");
      setError(
        "WebSocket connection not established. Please refresh the page."
      );
    }
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span>{message.sender}: </span>
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatComponent;
