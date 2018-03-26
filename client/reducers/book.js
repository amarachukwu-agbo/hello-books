import { GET_BOOK_SUCCESS,
  GET_BOOK_REQUEST,
  GET_BOOK_FAILURE,
  FAVORITE_REQUEST,
  FAVORITE_SUCCESS,
  FAVORITE_FAILURE,
  UPVOTE_REQUEST,
  UPVOTE_SUCCESS,
  UPVOTE_FAILURE,
  DOWNVOTE_REQUEST,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_FAILURE,
} from '../actions/types';

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
    case FAVORITE_REQUEST: {
      return {
        ...state,
        isFavoriting: true,
      };
    }
    case FAVORITE_FAILURE: {
      Materialize.toast(action.error, 1000);
      return {
        ...state,
        isFavoriting: false,
      };
    }
    case FAVORITE_SUCCESS: {
      return {
        ...state,
        book: { ...state.book, favCount: action.favCount },
        isFavoriting: false,
      };
    }
    case UPVOTE_REQUEST: {
      return {
        ...state,
        isUpvoting: true,
      };
    }
    case UPVOTE_FAILURE: {
      Materialize.toast(action.error, 1000);
      return {
        ...state,
        isUpvoting: false,
      };
    }
    case UPVOTE_SUCCESS: {
      return {
        ...state,
        book: { ...state.book, upvotes: action.book.upvotes, downvotes: action.book.downvotes },
        isUpvoting: false,
      };
    }
    case DOWNVOTE_REQUEST: {
      return {
        ...state,
        isDownvoting: true,
      };
    }
    case DOWNVOTE_FAILURE: {
      Materialize.toast(action.error, 1000);
      return {
        ...state,
        isDownvoting: false,
      };
    }
    case DOWNVOTE_SUCCESS: {
      return {
        ...state,
        book: { ...state.book, upvotes: action.book.upvotes, downvotes: action.book.downvotes },
        isDownvoting: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default book;
