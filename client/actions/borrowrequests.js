import axios from 'axios';
import {
  FETCHING_BORROW_REQUESTS,
  BORROW_REQUESTS_SUCCESS,
  BORROW_REQUESTS_FAILURE,
  HANDLING_BORROW_REQUEST,
  HANDLE_BORROW_REQUEST_SUCCESS,
  HANDLE_BORROW_REQUEST_FAILURE,
} from './types';

import setHeader from '../helpers/setheader';
import { apiURL } from './userSignUp';

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
      if (error.response) {
        let errorMessage = '';
        errorMessage = error.response.msg;
        dispatch(borrowRequestsFailure(errorMessage));
      } else {
        dispatch(borrowRequestsFailure(error.message));
      }
    });
};

const handlingBorrowRequest = () => ({
  type: HANDLING_BORROW_REQUEST,
});

const handleBorrowRequestSuccess = (status, index) => ({
  type: HANDLE_BORROW_REQUEST_SUCCESS,
  status,
  index,
});

const handleBorrowRequestFailure = error => ({
  type: HANDLE_BORROW_REQUEST_FAILURE,
  error,
});

export const handleBorrowRequest =
  (status, userId, bookId, requestIndex) => (dispatch) => {
    dispatch(handlingBorrowRequest());
    setHeader();
    return axios.put(`${apiURL}/users/${userId}/borrow/${bookId}`, status)
      .then((response) => {
        dispatch(handleBorrowRequestSuccess(
          response.data.borrowRequest.status,
          requestIndex,
        ));
      })
      .catch((error) => {
        if (error.response) {
          let errorMessage = '';
          errorMessage = error.response.msg;
          dispatch(handleBorrowRequestFailure(errorMessage));
        } else {
          dispatch(handleBorrowRequestFailure(error.message));
        }
      });
  };

