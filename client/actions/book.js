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
import Notify from '../helpers/Notify';
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

const favoriteFailure = () => ({
  type: FAVORITE_FAILURE,
});

export const favoriteBook = bookId => (dispatch) => {
  dispatch(favoriteRequest());
  setHeader();
  return axios.post(`${apiURL}/books/${bookId}/favorite`)
    .then((response) => {
      dispatch(favoriteSuccess(response.data.book.favCount));
      Notify.notifySuccess('Book has been added to favorites');
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      Notify.notifyInfo(errorMessage);
      dispatch(favoriteFailure());
    });
};

const upvoteRequest = () => ({
  type: UPVOTE_REQUEST,
});

const upvoteSuccess = book => ({
  type: UPVOTE_SUCCESS,
  book,
});

const upvoteFailure = () => ({
  type: UPVOTE_FAILURE,
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
      Notify.notifyInfo(errorMessage);
      dispatch(upvoteFailure());
    });
};

const downvoteRequest = () => ({
  type: DOWNVOTE_REQUEST,
});

const downvoteSuccess = book => ({
  type: DOWNVOTE_SUCCESS,
  book,
});

const downvoteFailure = () => ({
  type: DOWNVOTE_FAILURE,
});

export const downvoteBook = bookId => (dispatch) => {
  dispatch(downvoteRequest());
  setHeader();
  return axios.post(`${apiURL}/books/${bookId}/downvote`)
    .then((response) => {
      dispatch(downvoteSuccess(response.data.vote.book));
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      Notify.notifyInfo(errorMessage);
      dispatch(downvoteFailure());
    });
};

const borrowBookRequest = () => ({
  type: BORROW_BOOK_REQUEST,
});

const borrowBookSuccess = borrowStatus => ({
  type: BORROW_BOOK_SUCCESS,
  borrowStatus,
});

const borrowBookFailure = () => ({
  type: BORROW_BOOK_FAILURE,
});

export const borrowBook = (userId, book, request) => (dispatch) => {
  dispatch(borrowBookRequest());
  setHeader();
  return axios.post(`${apiURL}/users/${userId}/borrow/${book.id}/`, request)
    .then((response) => {
      dispatch(borrowBookSuccess(response.data.request.status));
      Notify
        .notifySuccess(`Your request to borrow ${
          book.title} has been sent. Check status in your profile`);
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      dispatch(borrowBookFailure());
      Notify.notifyInfo(errorMessage);
    });
};

const reviewBookRequest = () => ({
  type: REVIEW_BOOK_REQUEST,
});

const reviewBookSuccess = book => ({
  type: REVIEW_BOOK_SUCCESS,
  book,
});

const reviewBookFailure = () => ({
  type: REVIEW_BOOK_FAILURE,
});

export const reviewBook = (bookId, review) => (dispatch) => {
  dispatch(reviewBookRequest());
  setHeader();
  return axios.post(`${apiURL}/books/${bookId}/review`, review)
    .then((response) => {
      dispatch(reviewBookSuccess(response.data.reviewedBook));
      Notify.notifySuccess('Your review has been created');
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      dispatch(reviewBookFailure());
      Notify.notifyError(errorMessage);
    });
};

