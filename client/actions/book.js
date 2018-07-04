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
import setHeader from '../helpers/setheader';
import { apiURL } from './userSignUp';

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
      if (error.response) {
        let errorMessage = '';
        if (error.response.status === 400) {
          errorMessage = 'Bad Request';
        } else if (error.response.status === 404) {
          errorMessage = 'Book not found';
        } else {
          errorMessage = 'An error occured';
        }
        dispatch(getBookFailure(errorMessage));
      } else {
        dispatch(getBookFailure(error.message));
      }
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

export const favoriteBook = (userId, bookId) => (dispatch) => {
  dispatch(favoriteRequest());
  setHeader();
  return axios.post(`${apiURL}/books/${bookId}/favorite`)
    .then((response) => {
      dispatch(favoriteSuccess(response.data.book.favCount));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(favoriteFailure(error.response.data.error));
      } else {
        dispatch(favoriteFailure(error.message));
      }
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

export const upvoteBook = (userId, bookId) => (dispatch) => {
  dispatch(upvoteRequest());
  setHeader();
  return axios.post(`${apiURL}/books/${bookId}/upvote`)
    .then((response) => {
      dispatch(upvoteSuccess(response.data.vote.book));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(upvoteFailure(error.response.data.error));
      } else {
        dispatch(upvoteFailure(error.message));
      }
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
      if (error.response) {
        dispatch(downvoteFailure(error.response.data.error));
      } else {
        dispatch(downvoteFailure(error.message));
      }
    });
};

const borrowBookRequest = () => ({
  type: BORROW_BOOK_REQUEST,
});

const borrowBookSuccess = borrowStatus => ({
  type: BORROW_BOOK_SUCCESS,
  borrowStatus,
});

const borrowBookFailure = error => ({
  type: BORROW_BOOK_FAILURE,
  error,
});

export const borrowBook = (userId, bookId, request) => (dispatch) => {
  dispatch(borrowBookRequest());
  setHeader();
  return axios.post(`${apiURL}/users/${userId}/borrow/${bookId}/`, request)
    .then((response) => {
      dispatch(borrowBookSuccess(response.data.message));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(borrowBookFailure(error.response.data.error));
      } else {
        dispatch(borrowBookFailure(error.message));
      }
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

export const reviewBook = (userId, bookId, review) => (dispatch) => {
  dispatch(reviewBookRequest());
  setHeader();
  return axios.post(`${apiURL}/books/${bookId}/review`, review)
    .then((response) => {
      dispatch(reviewBookSuccess(response.data.reviewedBook));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(reviewBookFailure(error.response.data.msg));
      } else {
        dispatch(reviewBookFailure(error.message));
      }
    });
};

