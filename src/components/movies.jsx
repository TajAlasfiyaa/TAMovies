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
import TableSearch from "./tablesearch";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const apiEndPoint = "http://localhost:3900/api";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 10,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null,
    filteredlength: 10,
  };
  async componentDidMount() {
    const { data } = await axios.get(apiEndPoint + "/genres");
    const { data: movies } = await axios.get(apiEndPoint + "/movies");
    const genres = [{ name: "All Genres ", _id: null }, ...data];
    this.setState({ movies: movies, genres });
  }
  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    try {
      const myPromise = await axios.delete(
        apiEndPoint + "/movies/" + movie._id
      );
    } catch {
      this.setState({ movies: originalMovies });
    }

    this.setState({ movies });
    toast.success("deleted successfuly");
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
    this.setState({ searchQuery: "", selectedGenre: genre, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ selectedGenre: null, currentPage: 1, searchQuery: query });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    let filteredlength = 10;

    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      filteredlength = filtered.length;
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies, filteredlength };
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      sortColumn,
      selectedGenre,
      searchQuery,
    } = this.state;

    const { totalCount, data: movies, filteredlength } = this.getPageData();
    if (totalCount === 0 && filteredlength !== 0)
      return (
        <div>
          <h2 className=" mt-4">There are no moives in our database</h2>
          <Link to="/movies/new">
            <button className="btn-default"> New Movie</button>
          </Link>
        </div>
      );

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
          <Link to="/movies/new">
            <button className="btn-default"> New Movie</button>
          </Link>

          <TableSearch onChange={this.handleSearch} value={searchQuery} />
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
