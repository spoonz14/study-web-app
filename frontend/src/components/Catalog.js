import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { Link, useNavigate } from "react-router-dom";

const Catalog = () => {
  const [studyRooms, setStudyRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(''); // Add query state and setQuery function
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchStudyRooms = async () => {
      setIsLoading(true);
      try {
        const endpoint = query ? `/catalog/search/${query}` : "/catalog";
        const response = await axios.get(endpoint);
        setStudyRooms(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchStudyRooms();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setQuery(e.target.value); // Update query state with input value
  };

  const handleStudyRoomClick = (roomId) => {
    navigate(`/Room/${roomId}`);
  };

  return (
    <div className="catalog-background"> {/* Apply background styles to this div */}
      <div className="catalog-container">
        <div className="catalog-title">Study Groups</div>
        <Link to="/Room/create" className="create-room-button">Create New Room</Link>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {studyRooms.map((room) => (
          <div
            key={room.studyRoomId}
            className="catalog-item"
            onClick={() => handleStudyRoomClick(room.studyRoomId)}
          >
            {room.roomName}
          </div>
        ))}
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search groups..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Catalog;
