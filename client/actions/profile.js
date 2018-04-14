import axios from 'axios';
import {
  FETCHING_PROFILE,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  RETURN_BOOK_SUCCESS,
  RETURN_BOOK_REQUEST,
  RETURN_BOOK_FAILURE,
} from './types';
import { apiURL } from './userSignUp';
import setHeader from '../helpers/setheader';

const fetchingProfile = () => ({
  type: FETCHING_PROFILE,
});

const profileSuccess = profile => ({
  type: PROFILE_SUCCESS,
  profile,
});

const profileFailure = error => ({
  type: PROFILE_FAILURE,
  error,
});

export const getUserProfile = userId => (dispatch) => {
  dispatch(fetchingProfile());
  setHeader();
  return axios.get(`${apiURL}/users/${userId}`)
    .then((response) => {
      console.log(response.data);
      dispatch(profileSuccess(response.data.user));
    })
    .catch((error) => {
      if (error.response) {
        let errorMessage = '';
        errorMessage = error.response.msg;
        dispatch(profileFailure(errorMessage));
      } else {
        dispatch(profileFailure(error.message));
      }
    });
};

const returningBook = () => ({
  type: RETURN_BOOK_REQUEST,
});

const returnBookSuccess = returnRequest => ({
  type: RETURN_BOOK_SUCCESS,
  returnRequest,
});

const returnBookFailure = error => ({
  type: RETURN_BOOK_FAILURE,
  error,
});

export const returnBook = (userId, bookId) => (dispatch) => {
  dispatch(returningBook());
  setHeader();
  return axios.post(`${apiURL}/users/${userId}/return/${bookId}`)
    .then((response) => {
      console.log(response.data);
      dispatch(returnBookSuccess(response.data.returnRequest));
    })
    .catch((error) => {
      if (error.response) {
        let errorMessage = '';
        errorMessage = error.response.msg;
        console.log(errorMessage);
        dispatch(returnBookFailure(errorMessage));
      } else {
        dispatch(returnBookFailure(error.message));
      }
    });
};

