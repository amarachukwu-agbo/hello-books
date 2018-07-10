import {
  SIGN_UP_SUCCESS,
  SIGNING_UP,
  SIGN_UP_FAILURE,
} from '../actions/types';


const initialState = {};

const signUp = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        user: null,
      };
    case SIGNING_UP:
      return {
        ...state,
        isSigningUp: true,
        user: null,
      };
    case SIGN_UP_SUCCESS:
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
