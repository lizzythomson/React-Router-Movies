import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies") // Study this endpoint with Postman
        .then((response) => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Server Error", error);
        });
    };
    getMovies();
  }, []);

  const addToSavedList = (id) => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    const foundId = saved.find((movieId) => {
      return movieId === id;
    });
    if (foundId === undefined) {
      setSaved((currentValue) => {
        return [...currentValue, id];
      });
    }
  };

  console.log("saved", saved);
  return (
    <div>
      <SavedList
        list={movieList.filter((movie) => {
          console.log(saved.includes(movie.id));
          return saved.includes(String(movie.id));
        })}
      />

      <div>
        <Switch>
          <Route exact path="/">
            <MovieList movies={movieList} />
          </Route>
          {/* If you don't have props to pass to the component (shorter verison - doesn't have to be a child) */}
          <Route path="/movies/:id">
            <Movie addToSavedList={addToSavedList} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
