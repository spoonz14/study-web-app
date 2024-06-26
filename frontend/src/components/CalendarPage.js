import React from "react";
import Calendar from "./Calendar";
import { useNavigate } from "react-router-dom";

const CalendarPage = ({ events }) => {
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  const handleDateClick = (info) => {
    // Navigate to "/Timers" when a day box is clicked
    navigate("/Timers");
  };

  return (
    <div style={{ margin: "20px auto", maxWidth: "800px" }}>
      <h1 style={{ textAlign: "center" }}>Calendar Page</h1>
      <Calendar events={events} handleDateClick={handleDateClick} />
    </div>
  );
};

export default CalendarPage;
