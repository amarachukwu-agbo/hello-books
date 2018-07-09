import { SIGN_UP_SUCCESS, SIGNING_UP, SIGN_UP_FAILURE } from '../actions/types';
import Notify from '../helpers/Notify';

const initialState = {};

const signUp = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_FAILURE:
      Notify.notifyError(action.error);
      return {
        ...state,
        hasErrored: true,
        isSigningUp: false,
        error: action.error,
        user: null,
      };
    case SIGNING_UP:
      return {
        ...state,
        isSigningUp: true,
        hasErrored: false,
        error: null,
        user: null,
      };
    case SIGN_UP_SUCCESS:
      Notify.notifySuccess('Sign Up Successful');
      return {
        ...state,
        isSigningUp: false,
        user: action.user,
      };
    default:
      return state;
  }
};

export default signUp;
