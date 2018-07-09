import login from '../../reducers/login';
import * as actionTypes from '../../actions/types';
import mockData from '../__mocks__/mockData';

const initialState = {};
const { users } = mockData;

describe('Login reducer', () => {
  it('should return the initial state', () => {
    expect(login(undefined, {})).toEqual({});
  });

  it('should handle LOGGING_IN', () => {
    const action = {
      type: actionTypes.LOGGING_IN,
    };
    const newState = login(initialState, action);

    expect(newState).toEqual({
      isLoggingIn: true,
      isAuthenticated: false,
      hasErrored: false,
      error: null,
      user: null,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    const action = {
      type: actionTypes.LOGIN_SUCCESS,
      user: users.authResponse,
    };
    const newState = login(initialState, action);

    expect(newState).toEqual({
      isLoggingIn: false,
      isAuthenticated: true,
      hasErrored: false,
      error: null,
      user: users.authResponse,
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    const action = {
      type: actionTypes.LOGIN_FAILURE,
      error: users.loginErrorResponse.error,
    };
    const newState = login(initialState, action);

    expect(newState).toEqual({
      isLoggingIn: false,
      isAuthenticated: false,
      hasErrored: true,
      error: action.error,
      user: null,
    });
  });

  it('should handle LOG_OUT', () => {
    const action = {
      type: actionTypes.LOG_OUT,
    };
    const newState = login(initialState, action);

    expect(newState).toEqual({
      isAuthenticated: false,
      user: null,
    });
  });
});
