import React, { Component, useEffect } from "react";
import Joi from "joi-browser";
import Form from "./form";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { Navigate } from "react-router-dom";
import NotFound from "./notFound";
class MovieForms extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      genreId: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  componentDidMount() {
    const { params } = this.props;
    const genres = getGenres();
    this.setState({ genres });

    if (params === "new") return;
    const movie = getMovie(params);
    if (!movie) return (window.location = "/not-found");
    else this.setState({ data: this.mapToViewModel(movie) });
  }
  componentWillUnmount() {
    // const { params, navigate } = this.props;
    // if (params === "new") return;
    // const movie = getMovie(params);
    // if (!movie) return navigate("/not-found");
  }
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

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    const { navigate } = this.props;

    saveMovie(this.state.data);

    return navigate("/");
  };

  render() {
    return (
      <div className=" max-w-xs lg:max-w-xl mx-auto text-left">
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
