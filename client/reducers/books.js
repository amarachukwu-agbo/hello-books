import swal from 'sweetalert';
import {
  GET_BOOKS_SUCCESS,
  GET_BOOKS_REQUEST,
  GET_BOOKS_FAILURE,
  SEARCHING_BOOKS,
  SEARCH_BOOKS_SUCCESS,
  SEARCH_BOOKS_FAILURE,
  GET_UPVOTED_BOOKS_SUCCESS,
  GET_UPVOTED_BOOKS_REQUEST,
  GET_UPVOTED_BOOKS_FAILURE,
  ADDING_BOOK,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_REQUEST,
  EDIT_BOOK_FAILURE,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_FAILURE,
} from '../actions/types';
import Notify from '../helpers/Notify';

const initialState = {};

export const books = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        searchError: null,
        books: null,
        error: null,
      };
    }
    case GET_BOOKS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case GET_BOOKS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        books: action.books,
        pagination: action.pagination,
        error: null,
        searchResults: null,
      };
    }
    case SEARCHING_BOOKS: {
      return {
        ...state,
        isSearching: true,
        searchError: null,
      };
    }
    case SEARCH_BOOKS_FAILURE: {
      return {
        ...state,
        isSearching: false,
        searchError: action.error,
      };
    }
    case SEARCH_BOOKS_SUCCESS: {
      return {
        ...state,
        isSearching: false,
        searchError: null,
        books: null,
        pagination: action.pagination,
        searchResults: action.books,
      };
    }
    case ADDING_BOOK: {
      return {
        ...state,
        isAdding: true,
        addBookError: null,
      };
    }
    case ADD_BOOK_FAILURE: {
      Notify.notifyError(`Error adding book. ${action.error}`);
      return {
        ...state,
        isAdding: false,
        addBookError: action.error,
      };
    }
    case ADD_BOOK_SUCCESS: {
      Notify.notifySuccess('Book has been added');
      return {
        ...state,
        isAdding: false,
        addBookError: null,
      };
    }
    case EDIT_BOOK_REQUEST: {
      return {
        ...state,
        isEditing: true,
      };
    }
    case EDIT_BOOK_FAILURE: {
      Notify.notifyError(`Error editing book. ${action.error}`);
      return {
        ...state,
        isEditing: false,
      };
    }
    case EDIT_BOOK_SUCCESS: {
      Notify.notifySuccess('Book has been updated');
      return {
        ...state,
        isEditing: false,
        books: [...state.books.slice(0, action.bookIndex), action.book,
          ...state.books.slice(action.bookIndex + 1)],
      };
    }
    case DELETE_BOOK_SUCCESS: {
      swal('Book has been successfully deleted', {
        icon: 'success',
      });
      return {
        ...state,
        books: [...state.books.slice(0, action.bookIndex),
          ...state.books.slice(action.bookIndex + 1)],
        isDeleting: false,
      };
    }
    case DELETE_BOOK_FAILURE: {
      swal(`Book was not deleted. ${action.deleteError}`, 'error');
      return {
        ...state,
        isDeleting: false,
      };
    }
    case DELETE_BOOK_REQUEST: {
      return {
        ...state,
        isDeleting: true,
      };
    }
    default: {
      return state;
    }
  }
};

export const mostUpvotedBooks = (state = initialState, action) => {
  switch (action.type) {
    case GET_UPVOTED_BOOKS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        upvotedError: null,
        upvotedBooks: null,
      };
    }
    case GET_UPVOTED_BOOKS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        upvotedError: action.error,
      };
    }
    case GET_UPVOTED_BOOKS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        upvotedError: null,
        upvotedBooks: action.books,
        upvotedBooksPagination: action.pagination,
      };
    }
    default: {
      return state;
    }
  }
};

