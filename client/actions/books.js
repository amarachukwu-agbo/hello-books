import axios from 'axios';

import { GET_BOOKS_SUCCESS,
  GET_BOOKS_REQUEST,
  GET_BOOKS_FAILURE,
  GET_UPVOTED_BOOKS_SUCCESS,
  GET_UPVOTED_BOOKS_REQUEST,
  GET_UPVOTED_BOOKS_FAILURE,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_FAILURE } from './types';

import { apiURL } from './userSignUp';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('userToken')}`;

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

const deleteBookRequest = () => ({
  type: DELETE_BOOK_REQUEST,
});

const deleteBookSuccess = bookIndex => ({
  type: DELETE_BOOK_SUCCESS,
  bookIndex,
});

const deleteBookFailure = deleteError => ({
  type: DELETE_BOOK_FAILURE,
  deleteError,
});

export const deleteBook = (bookId, index) => (dispatch) => {
  dispatch(deleteBookRequest());
  return axios.post(`${apiURL}/books/remove/${bookId}`)
    .then((response) => {
      console.log(response);
      dispatch(deleteBookSuccess(index));
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        dispatch(deleteBookFailure(error.response.data.msg));
      } else {
        dispatch(deleteBookFailure(error.message));
      }
    });
};

export const getMostUpvotedBooks = () => (dispatch) => {
  dispatch(getUpvotedBooksRequest());
  return axios.get(`${apiURL}/books?sort=upvotes&order=desc`)
    .then((response) => {
      dispatch(getUpvotedBooksSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getUpvotedBooksFailure(error));
    });
};

