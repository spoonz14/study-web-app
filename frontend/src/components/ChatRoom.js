import React, { useState, useEffect } from "react";

const ChatRoom = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8090/chat");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [socket]);

  const sendMessage = () => {
    if (!socket || !messageInput.trim()) return;
    const message = {
      content: messageInput.trim(),
      sender: "User",
      type: "CHAT",
    };
    socket.send(JSON.stringify(message));
    setMessageInput("");
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{`${message.sender}: ${message.content}`}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
