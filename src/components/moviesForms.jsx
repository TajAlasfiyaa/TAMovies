import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "./../services/fakeMovieService";

class MovieForms extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    const { params, navigate } = this.props.params;
    const genres = getGenres();
    this.setState({ genres });

    const movieId = params;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return () => navigate("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      //    //  _id: movie._id,
      //    title: movie.title,
      //    genreId: movie.genre._id,
      //    numberInStock: movie.numberInStock,
      //    dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    const { navigate } = this.props.params;

    saveMovie(this.state.data);

    return () => navigate("/");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForms;
