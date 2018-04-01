import { GET_BOOKS_SUCCESS,
  GET_BOOKS_REQUEST,
  GET_BOOKS_FAILURE,
  GET_UPVOTED_BOOKS_SUCCESS,
  GET_UPVOTED_BOOKS_REQUEST,
  GET_UPVOTED_BOOKS_FAILURE,
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

