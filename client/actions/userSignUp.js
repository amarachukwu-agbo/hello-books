import axios from 'axios';
import { push } from 'react-router-redux';
import { SIGN_UP_SUCCESS, SIGNING_UP, SIGN_UP_FAILURE } from './types';
import { loginSuccess } from './login';
import setUser from '../helpers/setuser';

export const apiURL =
process.env.NODE_ENV === 'production' ?
  'https://hello-books-v2.herokuapp.com/api/v1' :
  'http://127.0.0.1:3000/api/v1';

export const signUpSuccess = user => ({
  type: SIGN_UP_SUCCESS,
  user,
});

export const signUpFailure = error => ({
  type: SIGN_UP_FAILURE,
  error,
});

export const signingUp = () => ({
  type: SIGNING_UP,
});

export const signUp = user => (dispatch) => {
  dispatch(signingUp());
  return axios.post(`${apiURL}/users/signup`, user)
    .then((response) => {
      dispatch(signUpSuccess(response));
      setUser(response);
      dispatch(loginSuccess(response.data.user));
      setTimeout(() => {
        dispatch(push('/'));
      }, 2000);
    })
    .catch((error) => {
      if (error.response) {
        dispatch(signUpFailure(error.response.data.error));
      } else {
        dispatch(signUpFailure(error.message));
      }
    });
};
