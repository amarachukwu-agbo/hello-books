import axios from 'axios';
import { reset } from 'redux-form';
import { ADDING_BOOK, ADD_BOOK_SUCCESS, ADD_BOOK_FAILURE } from './types';
import { apiURL } from './userSignUp';

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('userToken')}`;

const addingBook = () => ({
  type: ADDING_BOOK,
});

const addBookSuccess = book => ({
  type: ADD_BOOK_SUCCESS,
  book,
});

const addBookFailure = error => ({
  type: ADD_BOOK_FAILURE,
  error,
});

const addBook = book => (dispatch) => {
  dispatch(addingBook());
  return axios.post(`${apiURL}/books`, book)
    .then((response) => {
      dispatch(addBookSuccess(response.data.book));
      dispatch(reset('book'));
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        dispatch(addBookFailure(error.response.data.error));
      } else {
        dispatch(addBookFailure(error.message));
      }
    });
};

export default addBook;

