import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";

const MoviePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [partyMode, setPartyMode] = useState(false); // State for party mode

  // Fetch the selected movie from JSON
  useEffect(() => {
    fetch("/movies.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedMovie = data[parseInt(id)]; // Use the index from the URL
        setMovie(selectedMovie);
      })
      .catch((error) => console.error("Error fetching movie:", error));
  }, [id]);

  return (
    <div>
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Movies
      </button>
      {movie && (
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <title>{movie.title}</title>
          <p>
            <strong>Hero:</strong> {movie.cast.hero} |{" "}
            <strong>Heroine:</strong> {movie.cast.heroine} |{" "}
            <strong>Director:</strong> {movie.cast.director}
          </p>
        </div>
      )}
      <div
        className={`player-wrapper ${partyMode ? "party-loop" : ""}`} // Add party-loop class
      >
        {movie ? (
          <iframe
            src={movie.link}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={movie.title}
          ></iframe>
        ) : (
          <div>Loading movie...</div>
        )}
      </div>
      <button
        className="party-button"
        onClick={() => setPartyMode((prev) => !prev)}
      >
        Party
      </button>
    </div>
  );
};

export default MoviePlayer;
