import axios from 'axios';
import { GET_BOOK_SUCCESS, GET_BOOK_REQUEST, GET_BOOK_FAILURE } from './types';

import { apiURL } from './userSignUp';

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


const getBook = params => (dispatch) => {
  dispatch(getBookRequest());
  return axios.get(`${apiURL}/books/${params}`)
    .then((response) => {
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

export default getBook;
