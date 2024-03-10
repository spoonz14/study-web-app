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
