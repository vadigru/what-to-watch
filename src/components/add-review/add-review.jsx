import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import UserBlock from "../user-block/user-block.jsx";

import {Operation, ActionCreator} from "../../reducer/data/data.js";
import {getReviewPosting, getReviewSendingError} from "./../../reducer/data/selectors.js";
import {getSelectedMovie} from "../../reducer/state/selectors.js";
import {getAvatar} from "../../reducer/user/selectors.js";

import {movieType} from "../../prop-types/types.js";
import {AppRoute} from "../../const.js";

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 400;

class AddReview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.submitFormRef = React.createRef();
    this.commentRef = React.createRef();
    this.sendReviewButtonRef = React.createRef();
  }

  _toggleFormDisability() {
    this.commentRef.current.disabled = !this.commentRef.current.disabled;
    this.sendReviewButtonRef.current.disabled = !this.sendReviewButtonRef
      .current.disabled;
  }

  _handleSubmit(evt, movie) {
    const {onSubmit, onCommentPost} = this.props;
    evt.preventDefault();
    this._toggleFormDisability();

    onSubmit(
        {
          movieId: movie.id,
          rating: this.submitFormRef.current.rating.value,
          comment: this.commentRef.current.value
        },
        () => {
          this._toggleFormDisability();
          onCommentPost(true);
        },
        () => {
          this._toggleFormDisability();
        }
    );
  }

  render() {

    const {
      id,
      movies,
      movie,
      isReviewPosting,
      isReviewSendingError,
      avatarUrl,
      onTextareaChange,
      isCommentAdded,
      isFormInvalid
    } = this.props;

    const starSelectDisable = isReviewPosting ? `disable` : ``;

    return (
      <React.Fragment>
        {(isCommentAdded) && <Redirect to={AppRoute.ROOT} />}
        <section className="movie-card movie-card--full">
          <div className="movie-card__header">
            <div className="movie-card__bg">
              <img src={movie.backgroundUrl} alt={movie.title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header">
              <div className="logo">
                <Link to={AppRoute.ROOT} className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              </div>

              <nav className="breadcrumbs">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link to={`${AppRoute.MOVIE_PAGE}/${movie.id}`} className="breadcrumbs__link">
                      {movie.title}
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link to={AppRoute.ADD_REVIEW} className="breadcrumbs__link">Add review</Link>
                  </li>
                </ul>
              </nav>

              <UserBlock avatarUrl={avatarUrl} />

            </header>

            <div className="movie-card__poster movie-card__poster--small">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                width="218"
                height="327"
              />
            </div>
          </div>

          <div className="add-review">
            <form
              action="#"
              className="add-review__form"
              ref={this.submitFormRef}
              onSubmit={(evt) => this._handleSubmit(evt, movie)}
            >
              <div className="rating">
                <div className="rating__stars">
                  <input className="rating__input" id="star-1" type="radio" name="rating" value="1" disabled={starSelectDisable}/>
                  <label className="rating__label" htmlFor="star-1" >Rating 1</label>

                  <input className="rating__input" id="star-2" type="radio" name="rating" value="2" disabled={starSelectDisable}/>
                  <label className="rating__label" htmlFor="star-2">Rating 2</label>

                  <input className="rating__input" id="star-3" type="radio" name="rating" value="3" disabled={starSelectDisable} defaultChecked />
                  <label className="rating__label" htmlFor="star-3">Rating 3</label>

                  <input className="rating__input" id="star-4" type="radio" name="rating" value="4" disabled={starSelectDisable} />
                  <label className="rating__label" htmlFor="star-4">Rating 4</label>

                  <input className="rating__input" id="star-5" type="radio" name="rating" value="5" disabled={starSelectDisable} />
                  <label className="rating__label" htmlFor="star-5">Rating 5</label>
                </div>
              </div>

              <div className="add-review__text">
                <textarea
                  className="add-review__textarea"
                  name="review-text"
                  id="review-text"
                  placeholder="Review text"
                  ref={this.commentRef}
                  minLength={MIN_REVIEW_LENGTH}
                  maxLength={MAX_REVIEW_LENGTH}
                  onChange={(evt) => onTextareaChange(evt.target.value.length < MIN_REVIEW_LENGTH || evt.target.value.length > MAX_REVIEW_LENGTH)}
                />
                <div className="add-review__submit">
                  <button
                    className="add-review__btn"
                    type="submit"
                    ref={this.sendReviewButtonRef}
                    disabled={isFormInvalid}
                    style={{cursor: `${isFormInvalid ? `default` : `pointer`}`}}
                  >Post</button>
                </div>

              </div>
            </form>
            {isReviewSendingError ?
              <div style={{color: `#212121`}}>We cannot post your commnet right now due to the server problem. Please try again soon.</div> : ``}
          </div>

        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isReviewPosting: getReviewPosting(state),
  isReviewSendingError: getReviewSendingError(state),
  avatarUrl: getAvatar(state),
  movie: getSelectedMovie(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(commentData, onSuccess, onError) {
    dispatch(ActionCreator.postingReview(true));
    dispatch(Operation.sendReview(commentData, onSuccess, onError));
  }
});

AddReview.propTypes = {
  id: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(movieType).isRequired,
  movie: movieType.isRequired,
  promo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    posterUrl: PropTypes.string,
    backgroundUrl: PropTypes.string,
    previewUrl: PropTypes.string,
    previewImage: PropTypes.string,
    genre: PropTypes.string,
    release: PropTypes.number,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    time: PropTypes.string,
    rating: PropTypes.number,
    votes: PropTypes.number,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  isReviewPosting: PropTypes.bool.isRequired,
  isReviewSendingError: PropTypes.bool.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  onCommentPost: PropTypes.func.isRequired,
  onTextareaChange: PropTypes.func.isRequired,
  isCommentAdded: PropTypes.bool.isRequired,
  isFormInvalid: PropTypes.bool.isRequired,
};

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
