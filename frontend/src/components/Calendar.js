import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Calendar = ({ events }) => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const [timers, setTimers] = useState([]);

  const renderEventContent = (eventInfo) => {
    const dayNumber = eventInfo.date.getDate();
    const monthNumber = eventInfo.date.getMonth() + 1;
    const timerNames = timers.filter(
      (timer) =>
        timer.numberedDay === dayNumber && timer.numberedMonth === monthNumber
    ).map((timer) => timer.description);

    const content = (
      <>
        <div>{eventInfo.dayNumberText}</div>
        {timerNames.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
      </>
    );

    return { domNodes: [content] };
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      setUserId(userId);
    } else {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const timersByMonth = await getCurrentMonth();
        setTimers(timersByMonth);
      } catch (error) {
        console.error("Error fetching timers:", error);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const handleEventClick = (info) => {
      info.jsEvent.preventDefault();
      const clickedDate = info.date;
      const dayNumber = clickedDate.getDate();
      const monthNumber = clickedDate.getMonth() + 1;
      navigate(`/Timers/${monthNumber}/${dayNumber}`);
    };

    const calendarApi = calendarRef.current.getApi();
    calendarApi.on("dateClick", handleEventClick);
    return () => {
      calendarApi.off("dateClick", handleEventClick);
    };
  }, [navigate]);

  const getCurrentMonth = async () => {
    const now = new Date();
    const monthNumber = now.getMonth() + 1;

    try {
      const response = await axios.get(
        `http://localhost:8090/Timers/${userId}/${monthNumber}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching timers by month:", error);
      return [];
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Current Month</h2>
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
        eventContent={renderEventContent}
      />
    </div>
  );
};

export default Calendar;
