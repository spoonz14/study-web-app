import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Make sure to import your stylesheet

const CatalogSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/catalog?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="catalog-search-container">
      <form onSubmit={handleSearchSubmit} className="catalog-search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter study group name..."
          className="catalog-search-input"
        />
        <button type="submit" className="catalog-search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default CatalogSearch;
