import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const SeriesList = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/series.json")
      .then((response) => response.json())
      .then((data) => {
        setSeries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching series:", error);
        setError("Failed to load series. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleSeriesClick = (index) => {
    navigate(`/series/${index}`); // Navigate to the SeriesPlayer with series index
  };

  if (loading) return <div className="loading">Loading series...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="list-container">
      <h1>Series List</h1>
      <div className="grid-container">
        {series.map((s, index) => (
          <div
            key={index}
            className="card-container"
            onClick={() => handleSeriesClick(index)} // Navigate on card click
          >
            <img src={s.poster} alt={s.title} className="card-thumbnail" />
            <div className="card-details">{s.title}</div>
            <div className="card-hover-content">
              <img
                src={s.hoverPoster}
                alt={`${s.title} Hover`}
                className="hover-image"
              />
              <div className="hover-description">
                <p><strong>{s.title}</strong></p>
                <p>Hero: {s.cast.hero}</p>
                <p>Heroine: {s.cast.heroine}</p>
                <p>Director: {s.cast.director}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesList;
