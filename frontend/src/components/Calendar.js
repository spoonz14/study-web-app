import React, { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";

const Calendar = ({ events, handleDateClick }) => {
  const navigate = useNavigate(); // Using the useNavigate hook for navigation
  const calendarRef = useRef(null); // Ref to access the FullCalendar instance

  useEffect(() => {
    const handleEventClick = (info) => {
      console.log("Clicked!");
      // Prevent default behavior of FullCalendar's event handling
      info.jsEvent.preventDefault();

      // Navigate to "/Timers" when a day box is clicked
      navigate("/Timers");
    };

    const calendarApi = calendarRef.current.getApi();
    calendarApi.on("dateClick", handleEventClick);
    return () => {
      calendarApi.off("dateClick", handleEventClick);
    };
  }, [navigate]);

  const getCurrentMonth = () => {
    const now = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[now.getMonth()];
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{ textAlign: "center" }}>{getCurrentMonth()}</h2>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        events={events}
        selectable={true}
      />
    </div>
  );
};

export default Calendar;
