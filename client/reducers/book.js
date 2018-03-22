import { GET_BOOK_SUCCESS, GET_BOOK_REQUEST, GET_BOOK_FAILURE } from '../actions/types';

const initialState = {};

const book = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOK_REQUEST: {
      return {
        ...state,
        isFetching: true,
        book: null,
      };
    }
    case GET_BOOK_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case GET_BOOK_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        book: action.book,
      };
    }
    default: {
      return state;
    }
  }
};

export default book;
