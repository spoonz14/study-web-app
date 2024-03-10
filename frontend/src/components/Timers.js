import React, { useState } from 'react';
import axios from 'axios';

function Timers() {
  const [userID, setUserID] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');




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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="timerSetup">
      
      <div className='timerHeader'>Agenda Manager</div>
      <br></br>
      <div className='TimerDataContainer'>
        <label>User ID:</label>
          <input type="number" value={userID} onChange={e => setUserID(e.target.value)} />
        <label>Description:</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        <label>Category:</label>
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
        <label>Priority:  </label>
          <input type="text" value={priority} onChange={e => setPriority(e.target.value)} />
        </div>
      <button onClick={fetchData}>Add Reminder</button>
      
    </div>
    
  );
}

export default Timers;
