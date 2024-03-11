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
