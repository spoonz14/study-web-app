import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

function Timers() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const { dayNumber, monthNumber } = useParams(); 
  const [description, setDescription] = useState('');
  const [priorityLevel, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      setUserId(userId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const deleteTimer = async (timerId) => {
    console.log(timerId);
    try {
      await axios.delete(`http://localhost:8090/deleteTimer/${timerId}`);
      fetchTimers();
    } catch (error) {
      console.error("Error deleting timer:", error);
    }
  };

  const fetchTimers = async () => {
    try {
      const userId = getIdFromToken();
      const response = await axios.get(`http://localhost:8090/Timers/${userId}/${dayNumber}/${monthNumber}`);
      console.log(response.data)
      setTimers(response.data);
    } catch (error) {
      console.error("Error fetching timers:", error);
    }
  };

  const fetchUserTimers = async () => {
    try {
      const userId = getIdFromToken();
      const response = await axios.get(`http://localhost:8090/userTimers/${userId}`);
      console.log(response.data)
      setTimers(response.data);
    } catch (error) {
      console.error("Error fetching timers:", error);
    }
  };

  const getIdFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    }
  };

  useEffect(() => {
    fetchTimers();
  }, [dayNumber, monthNumber]);

  const formatDueDate = (dueDateStr) => {
    const dateObj = new Date(dueDateStr);
    const day = dateObj.getDate(); // Get the day of the month (1-31)
    const month = dateObj.getMonth() + 1; // Get the month (0-11), add 1 to match numberedMonth
    return { day, month };
  };

  const fetchData = async () => {
    try {
      const { day, month } = formatDueDate(dueDate);
      const dateParts = dueDate.split(/[-T:]/);
      console.log("Date parts: ", dateParts);
      // Create a new Date object directly from the components (local time)
    const localDate = new Date(
      dateParts[0], // year
      dateParts[1] - 1, // month (subtract 1 as months are 0-indexed)
      dateParts[2], // day
      dateParts[3], // hour
      dateParts[4] // minute
    );
      console.log("local date: ", localDate);
      const requestBody = {
        userId: userId,
        description: description,
        category: category,
        priorityLevel: Number(priorityLevel),
        dueDate: localDate,
        numberedDay: day,
        numberedMonth: month,
      };
      
      const response = await axios.post('http://localhost:8090/Timers', requestBody);
      navigate(`/Timers/${month}/${day}`);
      // window.location.reload();
      fetchTimers();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const formatDateForInput = (date) => {
    return new Date(date[0], date[1] - 1, date[2], date[3], date[4]);
  };

  return (
    <div className="timers-background">
      <div className="timerSetup">
        <div className='timerHeader'>Agenda Manager</div>
        <br></br>
        <div className='TimerDataContainer'>
          <label>Description:</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
          <label>Category:</label>
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
          <label>Priority:  </label>
          <input type="number" value={priorityLevel} onChange={e => setPriority(e.target.value)} />
          <label>Due Date:  </label>
          <input type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        </div>
        <button onClick={fetchData}>Add Reminder</button>
        <button onClick={fetchUserTimers}>Fetch Timers</button>
      </div>
      <div>
        {timers.map((timer, index) => (
          <div className='timersDisplay' key={index}>
            <p>Description: {timer.description}</p>
            <p>Category: {timer.category}</p>
            <p>Priority: {timer.priorityLevel}</p>
            <p>Due: {timer.dueDate}</p>
            <button onClick={() => deleteTimer(timer.timerID)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default Timers;
