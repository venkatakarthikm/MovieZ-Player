import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";

const SeriesPlayer = () => {
  const { id } = useParams(); // 'id' from URL params
  const navigate = useNavigate();
  const [series, setSeries] = useState(null); // Store the series data
  const [selectedSeason, setSelectedSeason] = useState(0); // Track the selected season
  const [currentEpisode, setCurrentEpisode] = useState(0); // Track the selected episode

  const renderCastDetails = (cast) => {
    return (
      <div className="cast-details">
        {Object.entries(cast).map(
          ([key, value], index) =>
            value && ( // Only render the cast item if value is not empty
              <div key={index} className="cast-item">
                <strong>{key}: </strong>{value}
              </div>
            )
        )}
      </div>
    );
  };

  useEffect(() => {
    // Fetching the series data from the JSON file
    fetch("/series.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedSeries = data[parseInt(id)]; // Selecting the series based on the ID
        if (selectedSeries) {
          setSeries(selectedSeries); // Set series data
          const lastSeasonIndex = selectedSeries.seasons.length - 1;
          const lastSeasonEpisodes = selectedSeries.seasons[lastSeasonIndex].episodes;
          setSelectedSeason(lastSeasonIndex); // Select the latest season
          setCurrentEpisode(lastSeasonEpisodes.length > 0 ? lastSeasonEpisodes.length - 1 : 0); // Select the latest episode or 0 if no episodes
        } else {
          console.error("Series not found");
          setSeries(null); // Handle case where series is not found
        }
      })
      .catch((error) => console.error("Error fetching series:", error));
  }, [id]); // Re-run effect if 'id' changes

  if (!series) return <div>Loading series...</div>; // Display loading until data is fetched

  // Get the list of episodes for the selected season
  const episodes = series.seasons[selectedSeason]?.episodes || [];

  return (
    <div className="series-player-container">
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Series
      </button>
      <div className="series-info">
        <h2>{series.title}</h2>
        <title>{series.title}</title>
        <div className="season-selector">
          {/* Map over seasons and allow user to select a season */}
          {series.seasons.map((season, index) => (
            <button
              key={index}
              className={`season-button ${index === selectedSeason ? "active" : ""}`}
              onClick={() => {
                setSelectedSeason(index);
                setCurrentEpisode(0); // Reset to first episode when switching seasons
              }}
            >
              Season {season.season}
            </button>
          ))}
        </div>
      </div>
      <div className="series-player">
        {episodes.length > 0 ? (
          <>
            <div className="episodes-list">
              {/* Map over the episodes in the selected season */}
              {episodes.map((episode, index) => (
                <button
                  key={index}
                  className={`episode-button ${index === currentEpisode ? "active" : ""}`}
                  onClick={() => setCurrentEpisode(index)} // Change current episode
                >
                  {episode.episodeTitle}
                </button>
              ))}
            </div>
            <div className="cast-container">
              {renderCastDetails(episodes[currentEpisode].cast)}
            </div>
            <div className="player-wrapper">
              {/* If there's a valid link, show the iframe */}
              {episodes[currentEpisode].link ? (
                <iframe
                  src={episodes[currentEpisode].link}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={episodes[currentEpisode].episodeTitle}
                ></iframe>
              ) : (
                <div>Video not available</div>
              )}
            </div>
          </>
        ) : (
          <div className="no-content">No episodes found for this season.</div>
        )}
      </div>
    </div>
  );
};

export default SeriesPlayer;
