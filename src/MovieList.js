import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch movies from the JSON file
  useEffect(() => {
    fetch("/movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(movie.cast)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const handleMovieClick = (index) => {
    navigate(`/movie/${index}`); // Use the index as the identifier
  };

  return (
    <div className="movie-list-container">
      <h1>Movie List</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search movies by title, genre, or cast..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie, index) => (
          <div
            key={index}
            className="movie-card-container"
            onClick={() => handleMovieClick(index)} // Pass the index
          >
            <div className="movie-thumbnail-container">
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-thumbnail"
              />
              <div className="hover-content">
                <img
                  src={movie.hoverPoster}
                  alt={`${movie.title} Hover`}
                  className="hover-image"
                />
                <div className="movie-description">
                  <p>
                    <strong>{movie.title}</strong>
                  </p>
                  <p>{movie.genre}</p>
                  <p>Hero: {movie.cast.hero}</p>
                  <p>Heroine: {movie.cast.heroine}</p>
                </div>
              </div>
            </div>
            <div className="movie-name">{movie.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
