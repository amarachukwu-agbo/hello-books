import { GET_BOOKS_SUCCESS,
  GET_BOOKS_REQUEST,
  GET_BOOKS_FAILURE,
  GET_UPVOTED_BOOKS_SUCCESS,
  GET_UPVOTED_BOOKS_REQUEST,
  GET_UPVOTED_BOOKS_FAILURE } from '../actions/types';

const initialState = {};

export const books = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        books: null,
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

