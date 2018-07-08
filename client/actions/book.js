import axios from 'axios';
import {
  GET_BOOK_SUCCESS,
  GET_BOOK_REQUEST,
  GET_BOOK_FAILURE,
  FAVORITE_REQUEST,
  FAVORITE_SUCCESS,
  FAVORITE_FAILURE,
  UPVOTE_REQUEST,
  UPVOTE_SUCCESS,
  UPVOTE_FAILURE,
  DOWNVOTE_REQUEST,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_FAILURE,
  BORROW_BOOK_SUCCESS,
  BORROW_BOOK_REQUEST,
  BORROW_BOOK_FAILURE,
  REVIEW_BOOK_SUCCESS,
  REVIEW_BOOK_REQUEST,
  REVIEW_BOOK_FAILURE,
} from './types';
import checkError from '../helpers/checkError';
import setHeader from '../helpers/setHeader';
import { apiURL } from './signUp';

const getBookRequest = () => ({
  type: GET_BOOK_REQUEST,
});

const getBookSuccess = book => ({
  type: GET_BOOK_SUCCESS,
  book,
});

const getBookFailure = error => ({
  type: GET_BOOK_FAILURE,
  error,
});


export const getBook = params => (dispatch) => {
  dispatch(getBookRequest());
  return axios.get(`${apiURL}/books/${params}`)
    .then((response) => {
      dispatch(getBookSuccess(response.data.book));
    })
    .catch((error) => {
      let errorMessage;
      if (error.response !== undefined &&
        error.response.status === 400) {
        errorMessage = 'Bad request';
      } else {
        errorMessage = checkError(error);
      }
      dispatch(getBookFailure(errorMessage));
    });
};

const favoriteRequest = () => ({
  type: FAVORITE_REQUEST,
});

const favoriteSuccess = favCount => ({
  type: FAVORITE_SUCCESS,
  favCount,
});

const favoriteFailure = error => ({
  type: FAVORITE_FAILURE,
  error,
});

export const favoriteBook = bookId => (dispatch) => {
  dispatch(favoriteRequest());
  setHeader();
  return axios.post(`${apiURL}/books/${bookId}/favorite`)
    .then((response) => {
      dispatch(favoriteSuccess(response.data.book.favCount));
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      dispatch(favoriteFailure(errorMessage));
    });
};

const upvoteRequest = () => ({
  type: UPVOTE_REQUEST,
});

const upvoteSuccess = book => ({
  type: UPVOTE_SUCCESS,
  book,
});

const upvoteFailure = error => ({
  type: UPVOTE_FAILURE,
  error,
});

export const upvoteBook = bookId => (dispatch) => {
  dispatch(upvoteRequest());
  setHeader();
  return axios.post(`${apiURL}/books/${bookId}/upvote`)
    .then((response) => {
      dispatch(upvoteSuccess(response.data.vote.book));
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      dispatch(upvoteFailure(errorMessage));
    });
};

const downvoteRequest = () => ({
  type: DOWNVOTE_REQUEST,
});

const downvoteSuccess = book => ({
  type: DOWNVOTE_SUCCESS,
  book,
});

const downvoteFailure = error => ({
  type: DOWNVOTE_FAILURE,
  error,
});

export const downvoteBook = (userId, bookId) => (dispatch) => {
  dispatch(downvoteRequest());
  setHeader();
  return axios.post(`${apiURL}/books/${bookId}/downvote`)
    .then((response) => {
      dispatch(downvoteSuccess(response.data.vote.book));
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      dispatch(downvoteFailure(errorMessage));
    });
};

const borrowBookRequest = () => ({
  type: BORROW_BOOK_REQUEST,
});

const borrowBookSuccess = (borrowStatus, book) => ({
  type: BORROW_BOOK_SUCCESS,
  borrowStatus,
  book,
});

const borrowBookFailure = error => ({
  type: BORROW_BOOK_FAILURE,
  error,
});

export const borrowBook = (userId, book, request) => (dispatch) => {
  dispatch(borrowBookRequest());
  setHeader();
  return axios.post(`${apiURL}/users/${userId}/borrow/${book.id}/`, request)
    .then((response) => {
      dispatch(borrowBookSuccess(response.data.request.status, book));
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      dispatch(borrowBookFailure(errorMessage));
    });
};

const reviewBookRequest = () => ({
  type: REVIEW_BOOK_REQUEST,
});

const reviewBookSuccess = book => ({
  type: REVIEW_BOOK_SUCCESS,
  book,
});

const reviewBookFailure = error => ({
  type: REVIEW_BOOK_FAILURE,
  error,
});

export const reviewBook = (bookId, review) => (dispatch) => {
  dispatch(reviewBookRequest());
  setHeader();
  return axios.post(`${apiURL}/books/${bookId}/review`, review)
    .then((response) => {
      dispatch(reviewBookSuccess(response.data.reviewedBook));
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      dispatch(reviewBookFailure(errorMessage));
    });
};

