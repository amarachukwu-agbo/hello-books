import axios from 'axios';
import { GET_BOOK_SUCCESS, GET_BOOK_REQUEST, GET_BOOK_FAILURE } from './types';
import { FAVORITE_REQUEST, FAVORITE_SUCCESS, FAVORITE_FAILURE } from './types';


import { apiURL } from './userSignUp';

console.log(localStorage.getItem('userToken'));
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('userToken')}`;

const getBookRequest = () => ({
  type: GET_BOOK_REQUEST,
});

const getBookSuccess = book => ({
  type: GET_BOOK_SUCCESS,
  book,
});

const getBookFailure = error => ({
  type: GET_BOOK_FAILURE,
  error,
});


export const getBook = params => (dispatch) => {
  dispatch(getBookRequest());
  return axios.get(`${apiURL}/books/${params}`)
    .then((response) => {
      console.log(response);
      dispatch(getBookSuccess(response.data.book));
    })
    .catch((error) => {
      if (error.response) {
        let errorMessage = '';
        if (error.response.status === 400) {
          errorMessage = 'Bad Request';
        } else if (error.response.status === 404) {
          errorMessage = 'Book not found';
        } else {
          errorMessage = 'An error occured';
        }
        dispatch(getBookFailure(errorMessage));
      } else {
        dispatch(getBookFailure(error.message));
      }
    });
};

const favoriteRequest = () => ({
  type: FAVORITE_REQUEST,
});

const favoriteSuccess = favCount => ({
  type: FAVORITE_SUCCESS,
  favCount,
});

const favoriteFailure = error => ({
  type: FAVORITE_FAILURE,
  error,
});

export const favoriteBook = (userId, bookId) => (dispatch) => {
  dispatch(favoriteRequest());
  return axios.post(`${apiURL}/users/${userId}/fav/${bookId}`)
    .then((response) => {
      console.log(response);
      dispatch(favoriteSuccess(response.data.book.favCount));
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        dispatch(favoriteFailure(error.response.data.msg));
      } else {
        dispatch(favoriteFailure(error.message));
      }
    });
};

