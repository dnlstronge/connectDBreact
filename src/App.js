import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null)

  async function fetchMoviesHandler() {

    try {
      setIsPending(!isPending);
      setError(null) // clear prev errors
      const response = await fetch("https://swapi.dev/api/films/");
      const data = await response.json();
  

      if(!response.ok) {
        throw new Error(`Ooops, Error: ${response.statusCode}`)
      }
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      setIsPending(false);  
    } catch (error) {
      setError(error.message)
    }
    
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isPending && movies.length > 0 && <MoviesList movies={movies} />}
        {!isPending && movies.length === 0 && <p>No movies found</p>}
        {error && !isPending && <p>{error}</p>}
        {isPending && !error && <p>LOADING...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
