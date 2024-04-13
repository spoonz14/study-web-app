import React, { useState, useEffect } from "react";

function ChatComponent() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

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

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      // Clean up WebSocket connection when component unmounts
      if (ws) {
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
      console.log("WebSocket connection not established");
    }
  };

  return (
    <div>
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
