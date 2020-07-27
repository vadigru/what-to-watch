import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getReviews} from "../../reducer/data/selectors.js";
import {getLoadingReviewsStatus} from "../../reducer/data/selectors.js";

import {formatReviewDate} from "../../utils/common.js";

const renderReviews = (reviews) => {
  return (
    <React.Fragment>
      {reviews.map((review) => (
        <div key={review.id} className="review">
          <blockquote className="review__quote">
            <p className="review__text">{review.comment}</p>

            <footer className="review__details">
              <cite className="review__author">{review.user.name}</cite>
              <time className="review__date" dateTime={formatReviewDate(review.date, false)}>{formatReviewDate(review.date, true)}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{review.rating}</div>
        </div>
      ))}
    </React.Fragment>
  );
};

const MovieReviews = (props) => {
  const {reviews, loadingReviews} = props;
  const reviewsHalf = Math.ceil(reviews.length / 2);
  const reviewsFirstHalf = reviews.slice(0, reviewsHalf);
  const reviewsSecondHalf = reviews.slice(reviewsHalf);

  return (
    <React.Fragment>
      {loadingReviews ?
        <div style={{marginTop: `100px`, color: `#212121`}}>FAILED TO LOAD COMMENTS</div> :
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            {renderReviews(reviewsFirstHalf)}
          </div>
          <div className="movie-card__reviews-col">
            {renderReviews(reviewsSecondHalf)}
          </div>
        </div>}
    </React.Fragment>
  );
};

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  loadingReviews: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  loadingReviews: getLoadingReviewsStatus(state)
});

export {MovieReviews};
export default connect(mapStateToProps)(MovieReviews);
