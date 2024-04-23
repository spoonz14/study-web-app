import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Calendar = ({ handleDateClick }) => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const [timers, setTimers] = useState([]);
  const [events, setEvents] = useState([]);

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
        setEvents([...events, ...timersByMonth]);
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
    const token = sessionStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    setUserId(userId);
    console.log("User ID: ", userId);
    try {
      const response = await axios.get(
        `http://localhost:8090/Timers/${userId}/${monthNumber}`
      );
      console.log("Response: ", response);
      const currentYear = now.getFullYear();
      const timers = response.data.map((timer) => ({
        id: timer.timerID,
        title: timer.description,
        start: new Date(
          currentYear,
          parseInt(timer.numberedMonth) - 1,
          parseInt(timer.numberedDay)
        ),
        allDay: true,
      }));
      console.log("Timers: ", timers);
      return timers;
    } catch (error) {
      console.error("Error fetching timers by month:", error);
      return [];
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Current Month</h2>
      {console.log("Events:", events)}
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
        eventContent={null}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default Calendar;
