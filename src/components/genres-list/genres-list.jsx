import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {ALL_GENRES, MAX_GENRES_AMOUNT} from "../../const.js";
import MoviesList from "../movies-list/movies-list.jsx";
import movieType from "../../prop-types/types.js";
import Tabs from "../tabs/tabs.jsx";

class GenresList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  getMaxGenresCount(genresList) {
    return genresList.length > MAX_GENRES_AMOUNT
      ? genresList.slice(0, MAX_GENRES_AMOUNT + 1)
      : genresList;
  }

  getGenresList(movies) {
    return [ALL_GENRES].concat(Array.from(new Set(movies.map((movie) => movie.genre))));
  }

  getMoviesByGenre(genre, movies) {
    return genre === ALL_GENRES
      ? movies
      : movies.filter((movie) => movie.genre === genre);
  }

  render() {
    const {movies, genre, changeGenre, onMovieCardClick} = this.props;

    return (
      <React.Fragment>
        <ul className="catalog__genres-list">
          <Tabs
            tabNames={this.getMaxGenresCount(this.getGenresList(movies))}
            activeTab={genre}
            onTabClick={changeGenre}
          />
        </ul>
        <MoviesList
          movies={this.getMoviesByGenre(genre, movies)}
          onMovieCardClick={onMovieCardClick}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  genre: state.genre,
  movies: state.films
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  }
});

GenresList.propTypes = {
  movies: PropTypes.arrayOf(movieType).isRequired,
  genre: PropTypes.string.isRequired,
  changeGenre: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired
};

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
