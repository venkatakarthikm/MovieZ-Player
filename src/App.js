import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieAndSeries from "./MovieAndSeries";
import MoviePlayer from "./MoviePlayer";
import SeriesPlayer from "./SeriesPlayer";
import "./App.css";

const App = () => {
  
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MovieAndSeries />} />
          <Route path="/movie/:id" element={<MoviePlayer />} />
          <Route path="/series/:id" element={<SeriesPlayer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
