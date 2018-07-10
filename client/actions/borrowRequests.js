import axios from 'axios';
import {
  FETCHING_BORROW_REQUESTS,
  BORROW_REQUESTS_SUCCESS,
  BORROW_REQUESTS_FAILURE,
  HANDLING_BORROW_REQUEST,
  HANDLE_BORROW_REQUEST_SUCCESS,
  HANDLE_BORROW_REQUEST_FAILURE,
} from './types';

import checkError from '../helpers/checkError';
import setHeader from '../helpers/setHeader';
import { apiURL } from './signUp';

const fetchingBorrowRequests = () => ({
  type: FETCHING_BORROW_REQUESTS,
});

const borrowRequestsSuccess = ({ requests, pagination }) => ({
  type: BORROW_REQUESTS_SUCCESS,
  requests,
  pagination,
});

const borrowRequestsFailure = error => ({
  type: BORROW_REQUESTS_FAILURE,
  error,
});

export const getBorrowRequests = page => (dispatch) => {
  dispatch(fetchingBorrowRequests());
  setHeader();
  return axios.get(`${apiURL}/borrowRequests?page=${page}`)
    .then((response) => {
      dispatch(borrowRequestsSuccess(response.data));
    })
    .catch((error) => {
      const errorMessage = checkError(error);
      dispatch(borrowRequestsFailure(errorMessage));
    });
};

const handlingBorrowRequest = () => ({
  type: HANDLING_BORROW_REQUEST,
});

const handleBorrowRequestSuccess = (status, requestId) => ({
  type: HANDLE_BORROW_REQUEST_SUCCESS,
  status,
  requestId,
});

const handleBorrowRequestFailure = error => ({
  type: HANDLE_BORROW_REQUEST_FAILURE,
  error,
});

export const handleBorrowRequest =
  (status, userId, bookId, requestId) => (dispatch) => {
    dispatch(handlingBorrowRequest());
    setHeader();
    return axios.put(`${apiURL}/users/${userId}/borrow/${bookId}`, status)
      .then((response) => {
        dispatch(handleBorrowRequestSuccess(
          response.data.borrowRequest.status,
          requestId,
        ));
      })
      .catch((error) => {
        const errorMessage = checkError(error);
        dispatch(handleBorrowRequestFailure(errorMessage));
      });
  };

