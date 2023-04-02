import React from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  function fetchMoviesHandler () {
      fetch("https://swapi.dev/api/films/").then(res => {
        return res.json() // also returns a promise
      }).then(
        data => {
          
        }
      )  // get req by default & returns a promise
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
