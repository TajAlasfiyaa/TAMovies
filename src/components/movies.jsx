import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Paginiation from "./common/pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import ListGroup from "./common/listgroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link, Outlet } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ name: "All Genres ", _id: null }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = (move) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(move);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGerneSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ selectedGenre: null, currentPage: 1, query });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { pageSize, currentPage, selectedGenre, genres, sortColumn } =
      this.state;

    const { totalCount, data: movies } = this.getPageData();

    if (totalCount === 0)
      return <h2 className=" mt-4">There are no moives in our database</h2>;
    return (
      <div className="grid grid-cols-7 gap-3 max-w-5xl mx-auto ">
        <div className=" mt-5 col-span-2">
          <ListGroup
            selectedItem={selectedGenre}
            items={genres}
            onItemSelect={this.handleGerneSelect}
          />
        </div>
        <div className=" col-span-5 ">
          <div className="text-3xl dark:text-white mb-5">
            Number of moives
            <span className="badge-dark text-3xl dark:text-white ml-2">
              {totalCount}
            </span>
          </div>
          <button className="btn-default">
            <Link to="/movies/new"> New Movie </Link>
          </button>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Paginiation
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}
Paginiation.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Movies;
