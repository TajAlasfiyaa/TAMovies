import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link
          className="text-blue-600 hover:underline"
          to={`/movie/${movie._id}`}
        >
          {movie.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.like} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button onClick={() => this.props.onDelete(movie)} className="btn-red">
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        movies={movies}
      />
    );
  }
}

export default MoviesTable;
