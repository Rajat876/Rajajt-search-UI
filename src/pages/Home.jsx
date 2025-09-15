// src/App.jsx
import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { LuLoaderCircle, LuSearch } from "react-icons/lu";
import { food_items } from "../food";


export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      setLoading(true);
      setTimeout(() => {
        const filtered = food_items.filter(
          (item) =>
            item &&
            item.food_name &&
            item.food_name.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
        setLoading(false);
      }, 500); 
    } else {
      setResults([]);
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredResults = results.filter((item) => {
    if (filter === "All") { return true;
    return item.food_type === filter; 
    } else if (filter === "Veg") {
      return item.food_type === "veg";
    } else if (filter === "Non-Veg") {
      return item.food_type === "non_veg";
    }
  });

  return (
    <div className={`seacrh-main-div ${results.length > 0 ? " expanded" : ""}`}>
      <div className="inner-div">
        {/* --------------Search Box----------------- */}
        <div className="search-box">
          {loading ? (
            <span className="loading-dots">
              <LuLoaderCircle className="loader-rotate" />
            </span>
          ) : (
            <LuSearch className="search-icon" />
          )}
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search..."
            className="input-field"
          />
          {query && (
            <button className="6" onClick={clearSearch}>
              clear
            </button>
          )}
        </div>
        {query && results.length === 0 ? (
          <div className="no-results">No results found</div>
        ) : null}
        {/* -----------Filter UI---------- */}

        {query && results.length > 1 && (
        <div className="filter-bar">
          <label className={`filter-label ${filter === "All" ? "active" : ""}`}>
            <input
              type="radio"
              value="All"
              checked={filter === "All"}
              onChange={handleFilterChange}
            />{" "}
            All
          </label>
          <label className={`filter-label ${filter === "Veg" ? "active" : ""}`}>
            <input
              type="radio"
              value="Veg"
              checked={filter === "Veg"}
              onChange={handleFilterChange}
            />{" "}
            Veg
          </label>
          <label className={`filter-label ${filter === "Non-Veg" ? "active" : ""}`}>
            <input
              type="radio"
              value="Non-Veg"
              checked={filter === "Non-Veg"}
              onChange={handleFilterChange}
            />{" "}
            Non-Veg
          </label>
        </div>)}

        {/* ------------Suggestion List--------------- */}
        {filteredResults.length > 0 && (
          <ul className="animate-fadeIn suggestions-list-ul">
            {filteredResults.map((item, index) => {
              const name = item.food_name;
              const queryIndex = name.toLowerCase().indexOf(query.toLowerCase());
              if (queryIndex === -1) {
                return (
                  <li key={index} className="suggestion-item">
                    <div className="item-image">
                      <img src={item.food_image} alt="" />
                    </div>
                    <div className="item-name">{name}</div>
                  </li>
                );
              }
              const before = name.slice(0, queryIndex);
              const match = name.slice(queryIndex, queryIndex + query.length);
              const after = name.slice(queryIndex + query.length);
              return (
                <li key={index} className="suggestion-item">
                  <div className="item-image">
                    <img src={item.food_image} alt="" />
                  </div>
                  <div className="item-name">
                    {before}
                    <span className="highlight-match">{match}</span>
                    {after}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
