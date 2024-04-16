import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { Link, useNavigate } from "react-router-dom";

const Catalog = () => {
  const [studyRooms, setStudyRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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
    e.preventDefault();
    navigate(`/catalog/search/${query}`);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleStudyRoomClick = (roomId) => {
    navigate(`/Room/${roomId}`);
  };

  return (
    <div className="catalog-background">
      <div className="catalog-container">
        <div className="catalog-title">Study Groups</div>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search groups..."
            value={query}
            onChange={handleInputChange}
          />
        </form>
        <Link to="/Room/create" className="create-room-button">
          Create New Room
        </Link>
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
      </div>
    </div>
  );
};

export default Catalog;
