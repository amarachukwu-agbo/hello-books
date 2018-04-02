import { GET_BOOKS_SUCCESS,
  GET_BOOKS_REQUEST,
  GET_BOOKS_FAILURE,
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
  DELETE_BOOK_FAILURE } from '../actions/types';

const initialState = {};

export const books = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_REQUEST: {
      return {
        ...state,
        isFetching: true,
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
        error: null,
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
      Materialize.toast(`Error adding book. ${action.error}`, 2000);
      return {
        ...state,
        isAdding: false,
        addBookError: action.error,
      };
    }
    case ADD_BOOK_SUCCESS: {
      Materialize.toast('Book has been added', 2000);
      return {
        ...state,
        isAdding: false,
        books: [...state.books, action.book],
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
      Materialize.toast(`Error editing book. ${action.error}`, 2000);
      return {
        ...state,
        isEditing: false,
      };
    }
    case EDIT_BOOK_SUCCESS: {
      Materialize.toast('Book has been updated', 2000);
      return {
        ...state,
        isEditing: false,
        books: [...state.books.slice(0, action.bookIndex), action.book,
          ...state.books.slice(action.bookIndex + 1)],
      };
    }
    case DELETE_BOOK_SUCCESS: {
      Materialize.toast('Book has been deleted', 2000);
      return {
        ...state,
        books: [...state.books.slice(0, action.bookIndex),
          ...state.books.slice(action.bookIndex + 1)],
        isDeleting: false,
      };
    }
    case DELETE_BOOK_FAILURE: {
      Materialize.toast(`Book was not deleted. ${action.deleteError}`, 2000);
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
        upvotedBooks: action.books,
      };
    }
    default: {
      return state;
    }
  }
};

