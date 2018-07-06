import axios from 'axios';
import { push } from 'react-router-redux';

import {
  GET_BOOKS_SUCCESS,
  GET_BOOKS_REQUEST,
  GET_BOOKS_FAILURE,
  GET_UPVOTED_BOOKS_SUCCESS,
  GET_UPVOTED_BOOKS_REQUEST,
  GET_UPVOTED_BOOKS_FAILURE,
  SEARCHING_BOOKS,
  SEARCH_BOOKS_SUCCESS,
  SEARCH_BOOKS_FAILURE,
  ADDING_BOOK,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_REQUEST,
  EDIT_BOOK_FAILURE,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_FAILURE,
} from './types';

import setHeader from '../helpers/setheader';
import { apiURL } from './userSignUp';

const getBooksRequest = () => ({
  type: GET_BOOKS_REQUEST,
});

const getBooksSuccess = ({ books, pagination }) => ({
  type: GET_BOOKS_SUCCESS,
  books,
  pagination,
});

const getBooksFailure = error => ({
  type: GET_BOOKS_FAILURE,
  error,
});

const getUpvotedBooksRequest = () => ({
  type: GET_UPVOTED_BOOKS_REQUEST,
});

const getUpvotedBooksSuccess = ({ books, pagination }) => ({
  type: GET_UPVOTED_BOOKS_SUCCESS,
  books,
  pagination,
});

const getUpvotedBooksFailure = error => ({
  type: GET_UPVOTED_BOOKS_FAILURE,
  error,
});

export const getBooks = page => (dispatch) => {
  dispatch(getBooksRequest());
  return axios.get(`${apiURL}/books/?page=${page}`)
    .then((response) => {
      dispatch(getBooksSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getBooksFailure(error));
    });
};

const addingBook = () => ({
  type: ADDING_BOOK,
});

const addBookSuccess = book => ({
  type: ADD_BOOK_SUCCESS,
  book,
});

const addBookFailure = error => ({
  type: ADD_BOOK_FAILURE,
  error,
});

export const addBook = book => (dispatch) => {
  dispatch(addingBook());
  setHeader();
  return axios.post(`${apiURL}/books`, book)
    .then((response) => {
      dispatch(addBookSuccess(response.data.bookEntry));
      dispatch(push('/admin'));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(addBookFailure(error.response.data.error));
      } else {
        dispatch(addBookFailure(error.message));
      }
    });
};

const searchingBooks = () => ({
  type: SEARCHING_BOOKS,
});

const searchBooksSuccess = ({ books, pagination }) => ({
  type: SEARCH_BOOKS_SUCCESS,
  books,
  pagination,
});

const searchBooksFailure = error => ({
  type: SEARCH_BOOKS_FAILURE,
  error,
});

export const searchBooks = (searchBy, searchParam) => (dispatch) => {
  dispatch(searchingBooks());
  return axios.post(`${apiURL}/books/search?${searchBy}=${searchParam}`)
    .then((response) => {
      dispatch(searchBooksSuccess(response.data));
      dispatch(push('/books'));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(searchBooksFailure(error.response.data.error));
      } else {
        dispatch(searchBooksFailure(error.message));
      }
    });
};

const editingBook = () => ({
  type: EDIT_BOOK_REQUEST,
});

const editBookSuccess = (book, bookId) => ({
  type: EDIT_BOOK_SUCCESS,
  book,
  bookId,
});

const editBookFailure = error => ({
  type: EDIT_BOOK_FAILURE,
  error,
});

export const editBook = (bookId, book) => (dispatch) => {
  dispatch(editingBook());
  setHeader();
  return axios.put(`${apiURL}/books/${bookId}`, book)
    .then((response) => {
      dispatch(editBookSuccess(response.data.updatedBook, bookId));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(editBookFailure(error.response.data.error
          || error.response.data.msg));
      } else {
        dispatch(editBookFailure(error.message));
      }
    });
};

const deleteBookRequest = () => ({
  type: DELETE_BOOK_REQUEST,
});

const deleteBookSuccess = bookId => ({
  type: DELETE_BOOK_SUCCESS,
  bookId,
});

const deleteBookFailure = deleteError => ({
  type: DELETE_BOOK_FAILURE,
  deleteError,
});

export const deleteBook = bookId => (dispatch) => {
  dispatch(deleteBookRequest());
  setHeader();
  return axios.delete(`${apiURL}/books/${bookId}`)
    .then(() => {
      dispatch(deleteBookSuccess(bookId));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(deleteBookFailure(error.response.data.message
            ||
            error.response.data.error));
      } else {
        dispatch(deleteBookFailure(error.message));
      }
    });
};

export const getMostUpvotedBooks = page => (dispatch) => {
  dispatch(getUpvotedBooksRequest());
  return axios
    .get(`${apiURL}/books?sort=upvotes&order=desc&page=${page}&limit=4`)
    .then((response) => {
      dispatch(getUpvotedBooksSuccess(response.data));
    })
    .catch((error) => {
      dispatch(getUpvotedBooksFailure(error));
    });
};
