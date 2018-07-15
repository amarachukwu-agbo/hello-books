import {
  LOGGING_IN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
} from '../actions/types';

const initialstate = {};

const login = (state = initialstate, action) => {
  switch (action.type) {
    case LOGGING_IN: {
      return {
        ...state,
        isLoggingIn: true,
        isAuthenticated: false,
        user: null,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        user: null,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default login;
