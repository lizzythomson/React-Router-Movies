import React from "react";
import { Link } from "react-router-dom";

export default function SavedList(props) {
  return (
    <Link to="/">
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {props.list.map((movie) => (
          <span key={movie.id} className="saved-movie">
            {movie.title}
          </span>
        ))}
        <div className="home-button">Home</div>
      </div>
    </Link>
  );
}
