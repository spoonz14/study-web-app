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
      const requestBody = {
        userId: userId,
        description: description,
        category: category,
        priorityLevel: Number(priorityLevel),
        dueDate: castedDate,
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
      navigate(`/Timers/${month}/${day}`)
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
