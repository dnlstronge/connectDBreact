import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState } from "react";


function App() {
  const [moviesList, setMoviesList] = useState()

  function fetchMoviesHandler() {
    fetch("https://swapi.dev/api/films/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMoviesList(data.results)
      }); // get req by default & returns a promise
  }

  return (
    <React.Fragment>
      <section>
        <button>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={MoviesList} />
      </section>
    </React.Fragment>
  );
}

export default App;
