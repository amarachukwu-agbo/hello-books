import {
  LOGGING_IN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
} from '../actions/types';
import Notify from '../helpers/Notify';

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
      Notify.notifyError(`Login Failed. ${action.error}`);
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        hasErrored: true,
        error: action.error,
        user: null,
      };
    }
    case LOG_OUT: {
      Notify.notifySuccess('You successfully logged out');
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
