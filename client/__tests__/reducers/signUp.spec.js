import signUp from '../../reducers/signUp';
import * as actionTypes from '../../actions/types';
import mockData from '../__mocks__/mockData';

const initialState = {};
const { users } = mockData;

describe('SignUp reducer', () => {
  it('should return the initial state', () => {
    expect(signUp(undefined, {})).toEqual({});
  });

  it('should handle SIGNING_UP', () => {
    const action = {
      type: actionTypes.SIGNING_UP,
    };
    const newState = signUp(initialState, action);

    expect(newState).toEqual({
      isSigningUp: true,
      hasErrored: false,
      error: null,
      user: null,
    });
  });

  it('should handle SIGN_UP_SUCCESS', () => {
    const action = {
      type: actionTypes.SIGN_UP_SUCCESS,
      user: users.authResponse.user,
    };
    const newState = signUp(initialState, action);

    expect(newState).toEqual({
      isSigningUp: false,
      user: users.authResponse.user,
    });
  });

  it('should handle SIGN_UP_FAILURE', () => {
    const action = {
      type: actionTypes.SIGN_UP_FAILURE,
      error: users.signupErrorResponse.error,
    };
    const newState = signUp(initialState, action);

    expect(newState).toEqual({
      hasErrored: true,
      isSigningUp: false,
      error: users.signupErrorResponse.error,
      user: null,
    });
  });
});
