import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import configureStore from "redux-mock-store";

import Main from "./main";

import Namespace from "../../reducer/namespace";

import {ALL_GENRES, MOVIES_DEFAULT_AMOUNT} from "../../const";
import history from "../../history";
import {Movie} from "../../prop-types/types";
import {noop} from "../../utils/common";

const mockStore = configureStore([]);

const movie: Movie = {
  title: `Movie Name`,
  posterUrl: `https://url.com`,
  backgroundUrl: `https://url.com`,
  backgroundColor: `some color`,
  previewUrl: `https://url.com`,
  previewImage: `https://url.com`,
  genre: `genre`,
  release: 2020,
  director: `Famous Director`,
  starring: [`Actor One`, `Actor Two`, `Actor Three`],
  time: `1h 30m`,
  rating: 10,
  votes: 1000000,
  description: `Some Description`,
  id: 1,
  isFavorite: true,
  videoUrl: `https://url.com`,
};

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

it(`Should render Main component`, () => {
  const store = mockStore({
    [Namespace.DATA]: {
      films: [],
      promo: movie,
      reviews: [],
      isFilmsLoading: false,
      isPromoLoading: false,
      isReviewsLoading: false,
      isReviewPosting: false,
      isReviewSendingError: false,
    },
    [Namespace.STATE]: {
      genre: ALL_GENRES,
      showedMovies: MOVIES_DEFAULT_AMOUNT,
    },
    [Namespace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      isValidAuthorization: true,
      avatarUrl: ``,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <Main
              avatarUrl={``}
              onMovieCardClick={() => noop}
              loadingFilmsStatus={true}
              loadingPromoStatus={true}
            />
          </Router>
        </Provider>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
