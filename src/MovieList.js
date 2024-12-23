import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch movies from the JSON file
  useEffect(() => {
    fetch("/movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));

    fetch("/series.json")
      .then((response) => response.json())
      .then((data) => setSeries(data))
      .catch((error) => console.error("Error fetching series:", error));
  }, []);

  const filterContent = (items) => {
    return items.filter((item) => {
      // Check basic details
      const matchesBasicDetails =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Object.values(item.cast)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      // Check episode cast for series
      const matchesEpisodeCast =
        item.seasons?.some((season) =>
          season.episodes?.some((episode) =>
            Object.values(episode.cast || {})
              .join(" ")
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        ) || false;

      return matchesBasicDetails || matchesEpisodeCast;
    });
  };

  const filteredMovies = filterContent(movies);
  const filteredSeries = filterContent(series);

  const handleMovieClick = (index) => {
    navigate(`/movie/${index}`);
  };

  const handleSeriesClick = (index) => {
    navigate(`/series/${index}`);
  };

  return (
    <div className="movie-list-container">
      <h1>Moviez Player</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search movies or series..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie, index) => (
          <div
            key={`movie-${index}`}
            className="movie-card-container"
            onClick={() => handleMovieClick(index)}
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
        {filteredSeries.map((series, index) => (
          <div
            key={`series-${index}`}
            className="movie-card-container"
            onClick={() => handleSeriesClick(index)}
          >
            <div className="movie-thumbnail-container">
              <img
                src={series.poster}
                alt={series.title}
                className="movie-thumbnail"
              />
              <div className="hover-content">
                <img
                  src={series.hoverPoster}
                  alt={`${series.title} Hover`}
                  className="hover-image"
                />
                <div className="movie-description">
                  <p>
                    <strong>{series.title}</strong>
                  </p>
                  <p>{series.genre}</p>
                  <p>Hero: {series.cast.hero}</p>
                  <p>Heroine: {series.cast.heroine}</p>
                </div>
              </div>
            </div>
            <div className="movie-name">{series.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
