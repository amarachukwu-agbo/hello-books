import axios from 'axios';

import { GET_BOOKS_SUCCESS,
  GET_BOOKS_REQUEST,
  GET_BOOKS_FAILURE,
  GET_UPVOTED_BOOKS_SUCCESS,
  GET_UPVOTED_BOOKS_REQUEST,
  GET_UPVOTED_BOOKS_FAILURE } from './types';

import { apiURL } from './userSignUp';

const getBooksRequest = () => ({
  type: GET_BOOKS_REQUEST,
});

const getBooksSuccess = books => ({
  type: GET_BOOKS_SUCCESS,
  books,
});

const getBooksFailure = error => ({
  type: GET_BOOKS_FAILURE,
  error,
});

const getUpvotedBooksRequest = () => ({
  type: GET_UPVOTED_BOOKS_REQUEST,
});

const getUpvotedBooksSuccess = books => ({
  type: GET_UPVOTED_BOOKS_SUCCESS,
  books,
});

const getUpvotedBooksFailure = error => ({
  type: GET_UPVOTED_BOOKS_FAILURE,
  error,
});

export const getBooks = () => (dispatch) => {
  dispatch(getBooksRequest());
  return axios.get(`${apiURL}/books`)
    .then((response) => {
      dispatch(getBooksSuccess(response.data.books));
    })
    .catch((error) => {
      dispatch(getBooksFailure(error));
    });
};

export const getMostUpvotedBooks = () => (dispatch) => {
  dispatch(getUpvotedBooksRequest());
  return axios.get(`${apiURL}/books?sort=upvotes&order=desc`)
    .then((response) => {
      console.log(response);
      dispatch(getUpvotedBooksSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getUpvotedBooksFailure(error));
    });
};

