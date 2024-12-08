import React from "react";
import MovieList from "./MovieList";
import SeriesList from "./SeriesList";
import "./App.css";

const MovieAndSeries = () => {
  
  return (
    <div className="movie-and-series-container">
      <MovieList />
      <SeriesList />
    </div>
  );
};

export default MovieAndSeries;
