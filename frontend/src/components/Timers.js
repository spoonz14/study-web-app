import React, { useState,useEffect } from 'react';
import { jwtDecode, InvalidTokenError } from "jwt-decode";


import axios from 'axios';

function Timers() {
  const [userID, setUserID] = useState('');
  const [description, setDescription] = useState('');
  const [priorityLevel, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [timers, setTimers] = useState([]); // State to store timers
  var userId;

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
      console.log(`Fetch timers with id ${getIdFromToken()}`)
      const response = await axios.get(`http://localhost:8090/userTimers/${getIdFromToken()}`); // Adjust endpoint as needed
      setTimers(response.data); // Assuming response.data is an array of timers
    } catch (error) {
      console.error("Error fetching timers:", error);
    }
  };
const getIdFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token); // Use jwtDecode directly
      console.log("Token: ", decodedToken);
      const userId = decodedToken.id;
      console.log("User ID: ", userId);
      console.log("userid" +userId);
      return userId;
    }
  }
  useEffect(() => {
    fetchTimers();
  }, []);



  const fetchData = async () => {
   
    try {
      const requestBody = {
        userID: Number(getIdFromToken()), // Convert userID to a number since the input returns a string
        description: description,
        category: category,
        priorityLevel: Number(priorityLevel),
        dueDate: dueDate
      };

      const response = await axios.post('http://localhost:8090/registerTimer', requestBody);
      console.log(response.data);
      fetchTimers();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
