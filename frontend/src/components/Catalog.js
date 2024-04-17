import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Catalog = () => {
  const [studyRooms, setStudyRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [searchParams, setSearchParams] = useSearchParams(); // useSearchParams hook for URL query parameters
  const [query, setQuery] = useState(searchParams.get("query") || ""); // State to hold the search query

  useEffect(() => {
    setIsLoading(true); // Start loading
    const fetchStudyRooms = async () => {
      try {
        const endpoint = query ? `/catalog/search?query=${encodeURIComponent(query)}` : "/catalog";
        const response = await axios.get(endpoint); // Fetch data from the backend
        setStudyRooms(response.data); // Set fetched data to state
      } catch (error) {
        setError(error); // Set error to state if any
      } finally {
        setIsLoading(false); // Stop loading regardless of the result
      }
    };

    fetchStudyRooms(); // Call the function to fetch data
  }, [query]); // Only re-run the effect if the query changes

  // Function to handle clicks on study room items
  const handleStudyRoomClick = (studyRoomId) => {
    navigate(`/Room/${studyRoomId}`); // Navigate to the individual study room page
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ query: query }); // Update the URL search parameters with the search query
  };

  return (
    <>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search groups..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update the query state as the user types
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="catalog-container">
        <div className="catalog-title">Study Groups</div>
        <Link to="/Room/create" className="create-room-button">Create New Room</Link>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {studyRooms.map((room) => (
          <div
            key={room.studyRoomId}
            className="catalog-item"
            onClick={() => handleStudyRoomClick(room.studyRoomId)} // Attach the click handler
          >
            <div className="room-name">{room.roomName}</div>
            <div className="room-description">{room.description}</div> {/* Display the description */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Catalog;