import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Notif from "./Notif"

function Timers() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const { dayNumber, monthNumber } = useParams();
  const [description, setDescription] = useState("");
  const [priorityLevel, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

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
      const response = await axios.get(
        `http://localhost:8090/Timers/${userId}/${dayNumber}/${monthNumber}`
      );
      console.log(response.data);
      setTimers(response.data);
    } catch (error) {
      console.error("Error fetching timers:", error);
    }
  };

  const fetchUserTimers = async () => {
    try {
      const userId = getIdFromToken();
      const response = await axios.get(
        `http://localhost:8090/userTimers/${userId}`
      );
      console.log(response.data);
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

  const fetchData = async () => {
    try {
      const castedDate = new Date();
      console.log("Casted Date (1): ", castedDate);
      let day = castedDate.getDate();
      let month = castedDate.getMonth();
      month++;
  
      // Calculate the GMT offset for Alberta (Mountain Time)
      const isDaylightSavingTime = () => {
        const month = castedDate.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = castedDate.getDate();
        const dayOfWeek = castedDate.getDay(); // Sunday (0) to Saturday (6)
  
        // Determine the start and end dates for MDT based on typical rules (second Sunday in March to first Sunday in November)
        const startMDTDate = new Date(castedDate.getFullYear(), 2, 8); // March 8th (March is month 2)
        const endMDTDate = new Date(castedDate.getFullYear(), 10, 1); // November 1st (November is month 10)
  
        // Check if the current date is within the MDT period
        return (
          month > startMDTDate.getMonth() &&
          month < endMDTDate.getMonth() &&
          !(month === startMDTDate.getMonth() && day < 8) &&
          !(month === endMDTDate.getMonth() && day >= 8) &&
          dayOfWeek === 0 // Sunday
        );
      };
  
      const getGMTOffset = () => {
        const isDaylightSaving = isDaylightSavingTime();
  
        // Set the base offset for Mountain Standard Time (MST)
        let gmtOffsetHours = -7;
        gmtOffsetHours++;
  
        // Adjust for Mountain Daylight Time (MDT) if applicable
        // if (isDaylightSaving) {
        //   gmtOffsetHours++; // MDT is GMT-6
        // }
  
        return gmtOffsetHours;
      };
  
      const gmtOffsetHours = getGMTOffset();
  
      // Apply the GMT offset to the casted date
      castedDate.setHours(castedDate.getHours() + gmtOffsetHours);
  
      // Convert castedDate to a string representation
      const dateString = castedDate.toISOString(); // or castedDate.toString();
      console.log("Date string: ", dateString);
  
      const requestBody = {
        userId: userId,
        description: description,
        category: category,
        priorityLevel: Number(priorityLevel),
        dueDate: dateString, // Use the string representation of castedDate
        numberedDay: day,
        numberedMonth: month,
      };
      console.log("Casted date (2): ", castedDate);
      console.log("Info (1): ", requestBody);
  
      const response = await axios.post(
        "http://localhost:8090/Timers",
        requestBody
      );
      console.log("Info (2): ", requestBody);
      fetchTimers();
      var notif = new Notif();
      notif.fetchTimers();
      navigate(`/Timers/${month}/${day}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterByCategory = async () => {
    if (categorySearch != null || categorySearch != ""){
      fetchTimers();
    }
    try {
      const userId = getIdFromToken();
      const response = await axios.get(`http://localhost:8090/userTimers/${userId}/${categorySearch}`);
      console.log(response.data);
      setTimers(response.data);
    } catch (error) {
      console.error("Error getting timers by category:", error);
    }
  }
  const comboBoxComp = () => {

    return (
      <div> 
      <input id = "filerCategoryInput" placeholder="Enter category name"
       value={categorySearch}
       onChange={(e) => {setCategorySearch(e.target.value)
      
      }
       }></input>
      <button onClick={filterByCategory}>Filter</button>
    </div> 
   )
  }
  return (
    <div className="timers-background">
      <div className="timerSetup">
        <div className="timerHeader">Agenda Manager</div>
        <br></br>
        <div className="TimerDataContainer">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <label>Priority: </label>
          <input
            type="number"
            value={priorityLevel}
            onChange={(e) => setPriority(e.target.value)}
          />
          <label>Due Date: </label>
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button className="add-timer-button" onClick={fetchData}>
          Add Reminder
        </button>
        <button className="view-tasks-button" onClick={fetchUserTimers}>
          View Tasks
        </button>
        {comboBoxComp()}
      </div>
      <div>
        {timers.map((timer, index) => (
          <div className="timersDisplay" key={index}>
            <p>Description: {timer.description}</p>
            <p>Category: {timer.category}</p>
            <p>Priority: {timer.priorityLevel}</p>
            <p>Due: {timer.dueDate}</p>
            <button
              className="delete-timer-button"
              onClick={() => deleteTimer(timer.timerID)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timers;
