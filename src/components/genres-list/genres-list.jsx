import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {ALL_GENRES, MAX_GENRES_AMOUNT} from "../../const.js";
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

  render() {
    const {movies, genre, changeGenre, showDefaultMovies} = this.props;

    return (
      <Tabs
        className={`catalog__genres-`}
        tabNames={this.getMaxGenresCount(this.getGenresList(movies))}
        activeTab={genre}
        onTabClick={changeGenre}
        onGenreTabClick={showDefaultMovies}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  genre: state.genre,
  movies: state.films,
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  showDefaultMovies() {
    dispatch(ActionCreator.showDefaultMovies());
  }
});

GenresList.propTypes = {
  movies: PropTypes.arrayOf(movieType).isRequired,
  genre: PropTypes.string.isRequired,
  changeGenre: PropTypes.func.isRequired,
  showDefaultMovies: PropTypes.func.isRequired
};

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
