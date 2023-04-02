import React, { useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState } from "react";

/* use effect for fetch requests if code rendered as part of component lifecycle  */

function App() {
  const [movies, setMovies] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);



 const fetchMoviesHandler = useCallback( async() => {
    setIsPending(!isPending);
    setError(null); // clear prev errors

    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error(`Ooops, Error: ${response.status}`);
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      })
      setMovies(transformedMovies);
      setIsPending(false);
    } catch (error) {
      setError(error.message);
    }
    setIsPending(false);
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])
  let content = <p>No movies found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isPending) {
    content = <p>Loading....</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
