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

import checkError from '../helpers/checkError';
import setHeader from '../helpers/setHeader';
import { apiURL } from './signUp';
import Notify from '../helpers/Notify';

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
      const errorMessage = checkError(error);
      dispatch(getBooksFailure(errorMessage));
    });
};

const addingBook = () => ({
  type: ADDING_BOOK,
});

const addBookSuccess = book => ({
  type: ADD_BOOK_SUCCESS,
  book,
});

const addBookFailure = () => ({
  type: ADD_BOOK_FAILURE,
});

export const addBook = book => (dispatch) => {
  dispatch(addingBook());
  setHeader();
  return axios.post(`${apiURL}/books`, book)
    .then((response) => {
      dispatch(addBookSuccess(response.data.bookEntry));
      Notify.notifySuccess('Book has been added');
      dispatch(push('/admin'));
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      dispatch(addBookFailure());
      Notify.notifyError(`Error adding book. ${errorMessage}`);
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
      const errorMessage = checkError(error);
      dispatch(searchBooksFailure(errorMessage));
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

const editBookFailure = () => ({
  type: EDIT_BOOK_FAILURE,
});

export const editBook = (bookId, book) => (dispatch) => {
  dispatch(editingBook());
  setHeader();
  return axios.put(`${apiURL}/books/${bookId}`, book)
    .then((response) => {
      dispatch(editBookSuccess(response.data.updatedBook, bookId));
      Notify.notifySuccess('Book has been updated');
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      dispatch(editBookFailure());
      Notify.notifyError(`Error editing book. ${errorMessage}`);
    });
};

const deleteBookRequest = () => ({
  type: DELETE_BOOK_REQUEST,
});

const deleteBookSuccess = bookId => ({
  type: DELETE_BOOK_SUCCESS,
  bookId,
});

const deleteBookFailure = () => ({
  type: DELETE_BOOK_FAILURE,
});

export const deleteBook = bookId => (dispatch) => {
  dispatch(deleteBookRequest());
  setHeader();
  return axios.delete(`${apiURL}/books/${bookId}`)
    .then(() => {
      dispatch(deleteBookSuccess(bookId));
      Notify.notifySuccess('Book has been successfully deleted');
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      dispatch(deleteBookFailure());
      Notify.notifyError(errorMessage);
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
      const errorMessage = checkError(error);
      dispatch(getUpvotedBooksFailure(errorMessage));
    });
};
