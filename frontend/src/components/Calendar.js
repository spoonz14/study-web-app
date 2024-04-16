import React, { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";

const Calendar = ({ events, handleDateClick }) => {
  const navigate = useNavigate(); 
  const calendarRef = useRef(null); 

  useEffect(() => {
    const handleEventClick = (info) => {
      info.jsEvent.preventDefault();
      const clickedDate = info.date;
      const dayNumber = clickedDate.getDate();
      console.log("Day value: ", dayNumber);
      const monthNumber = clickedDate.getMonth() + 1; // Adding 1 because months are zero-based
      console.log("Month value: ", monthNumber);
      navigate(`/Timers/`);
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
