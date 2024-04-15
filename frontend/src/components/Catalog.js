import React, { useState, useEffect } from "react";
import axios from "../axios-config";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
const submitSearch = (param) => {
  console.log("FFF"+param)
  try {
    const endpoint = param ? `/catalog/search/${param}` : "/catalog";
    const response = axios.get(endpoint);
    return response.data;
  } catch (error) {
  }
}
const Catalog = () => {
  const [studyRooms, setStudyRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => { //this is called everytime the search changes for now
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
    setSearchParams({ query }); // Update URL with search query
  };

  const handleStudyRoomClick = (roomId) => {
    navigate(`/Room/${roomId}`);
  };

  return (
    <>
      <div className="search-container">
       
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
            onChange={(e) => {setQuery(e.target.value)}}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
};

export default Catalog;
