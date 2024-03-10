import React, { useState,useEffect } from 'react';

import axios from 'axios';

function Timers() {
  const [userID, setUserID] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [timers, setTimers] = useState([]); // State to store timers

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
      const response = await axios.get('http://localhost:8090/allTimers'); // Adjust endpoint as needed
      setTimers(response.data); // Assuming response.data is an array of timers
    } catch (error) {
      console.error("Error fetching timers:", error);
    }
  };

  useEffect(() => {
    fetchTimers();
  }, []);



  const fetchData = async () => {
    try {
      const requestBody = {
        userID: Number(userID), // Convert userID to a number since the input returns a string
        description: description,
        category: category,
        priority: Number(priority)
      };

      const response = await axios.post('http://localhost:8090/registerTimer', requestBody);
      console.log(response.data);
      fetchTimers();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
    <div className="timerSetup">
      
      <div className='timerHeader'>Agenda Manager</div>
      <br></br>
      <div className='TimerDataContainer'>
        <label>Description:</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        <label>Category:</label>
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
        <label>Priority:  </label>
          <input type="text" value={priority} onChange={e => setPriority(e.target.value)} />
        
        </div>
      <button onClick={fetchData}>Add Reminder</button>
    </div>
      <div>
      {timers.map((timer, index) => (
        <div className='timersDisplay' key={index}>
          <p>Description: {timer.description}</p>
          <p>Category: {timer.category}</p>
          <p>Priority: {timer.priority}</p>
          <button onClick={() => deleteTimer(timer.timerID)}>Delete</button>
          
        </div>
      ))}
    </div>
    </div>
  );
}

export default Timers;
