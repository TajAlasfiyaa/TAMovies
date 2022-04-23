import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// import Form from "./form";
// import { Joi } from "joi-browser";
// import { getGenres } from "../services/fakeGenreService";
// import { getMovie, saveMovie } from "./../services/fakeMovieService";
import MoviesForms from "./moviesForms";
const MoviesForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  return (
    <div>
      <h1>Movie Form {id} </h1>
      <MoviesForms params={id} navigate={navigate} />
    </div>
  );
};

export default MoviesForm;
