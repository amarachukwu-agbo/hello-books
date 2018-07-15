import {
  FETCHING_BORROW_REQUESTS,
  BORROW_REQUESTS_SUCCESS,
  BORROW_REQUESTS_FAILURE,
  HANDLING_BORROW_REQUEST,
  HANDLE_BORROW_REQUEST_SUCCESS,
  HANDLE_BORROW_REQUEST_FAILURE,
}
  from '../actions/types';

const initialState = {};

const borrowRequests = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_BORROW_REQUESTS: {
      return {
        ...state,
        isFetchingBorrowRequests: true,
        borrowRequests: null,
        borrowRequestsError: null,
      };
    }
    case BORROW_REQUESTS_SUCCESS: {
      return {
        ...state,
        isFetchingBorrowRequests: false,
        borrowRequests: action.requests,
        pagination: action.pagination,
        borrowRequestsError: null,
      };
    }
    case BORROW_REQUESTS_FAILURE: {
      return {
        ...state,
        isFetchingBorrowRequests: false,
        borrowRequestsError: action.error,
      };
    }
    case HANDLING_BORROW_REQUEST: {
      return {
        ...state,
        isHandlingBorrowRequest: true,
      };
    }
    case HANDLE_BORROW_REQUEST_SUCCESS: {
      const requestIndex = state.borrowRequests
        .findIndex(request => request.id === action.requestId);
      return {
        ...state,
        borrowRequests: [...state.borrowRequests.slice(0, requestIndex),
          { ...state.borrowRequests[requestIndex], status: action.status },
          ...state.borrowRequests.slice(requestIndex + 1)],
        isHandlingBorrowRequest: false,
      };
    }
    case HANDLE_BORROW_REQUEST_FAILURE: {
      return {
        ...state,
        isHandlingBorrowRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default borrowRequests;
