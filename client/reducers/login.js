import { LOGGING_IN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/types';

const initialstate = {
  isLoggingIn: false,
  isAuthenticated: false,
  hasErrored: false,
  error: null,
  user: null,
};

const login = (state = initialstate, action) => {
  switch (action.type) {
    case LOGGING_IN: {
      return {
        ...state,
        isLoggingIn: true,
        isAuthenticated: false,
        hasErrored: false,
        error: null,
        user: null,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        hasErrored: false,
        error: null,
        user: action.user,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        hasErrored: true,
        error: action.error,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default login;