import { FETCHING_FAVORITES, FAVORITES_SUCCESS, FAVORITES_FAILURE } from '../actions/types';

const initialState = {};

const favorites = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_FAVORITES: {
      return {
        ...state,
        isFetching: true,
        favorites: null,
      };
    }
    case FAVORITES_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case FAVORITES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        favorites: action.favorites,
      };
    }
    default: {
      return state;
    }
  }
};

export default favorites;
