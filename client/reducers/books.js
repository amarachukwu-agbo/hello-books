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
      };
    }
    case ADD_BOOK_FAILURE: {
      return {
        ...state,
        isAdding: false,
      };
    }
    case ADD_BOOK_SUCCESS: {
      return {
        ...state,
        isAdding: false,
      };
    }
    case EDIT_BOOK_REQUEST: {
      return {
        ...state,
        isEditing: true,
      };
    }
    case EDIT_BOOK_FAILURE: {
      return {
        ...state,
        isEditing: false,
      };
    }
    case EDIT_BOOK_SUCCESS: {
      const bookIndex = state.books
        .findIndex(book => book.id === action.bookId);
      return {
        ...state,
        isEditing: false,
        books: [...state.books.slice(0, bookIndex), action.book,
          ...state.books.slice(bookIndex + 1)],
      };
    }
    case DELETE_BOOK_SUCCESS: {
      const bookIndex = state.books
        .findIndex(book => book.id === action.bookId);
      state.books.splice(bookIndex, 1);

      return {
        ...state,
        isDeleting: false,
        pagination: {
          ...state.pagination,
          dataCount: state.pagination.dataCount - 1,
        },
      };
    }
    case DELETE_BOOK_FAILURE: {
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

