import returnRequests from '../../reducers/returnRequests';
import * as actionTypes from '../../actions/types';
import mockData from '../__mocks__/mockData';

const initialState = {};
const { requests } = mockData;

describe('Return Requests reducer', () => {
  it('should return the initial state', () => {
    expect(returnRequests(undefined, {})).toEqual({});
  });

  it('should handle FETCHING_RETURN_REQUESTS', () => {
    const action = {
      type: actionTypes.FETCHING_RETURN_REQUESTS,
    };
    const newState = returnRequests(initialState, action);

    expect(newState).toEqual({
      isFetchingReturnRequests: true,
      returnRequests: null,
      returnRequestsError: null,
    });
  });

  it('should handle RETURN_REQUESTS_SUCCESS', () => {
    const action = {
      type: actionTypes.RETURN_REQUESTS_SUCCESS,
      requests: requests.returnRequestsResponse.requests,
      pagination: requests.returnRequestsResponse.pagination,
    };
    const newState = returnRequests(initialState, action);

    expect(newState).toEqual({
      isFetchingReturnRequests: false,
      returnRequests: requests.returnRequestsResponse.requests,
      pagination: requests.returnRequestsResponse.pagination,
      returnRequestsError: null,
    });
  });

  it('should handle RETURN_REQUESTS_FAILURE', () => {
    const action = {
      type: actionTypes.RETURN_REQUESTS_FAILURE,
      error: requests.returnRequestsErrorResponse.error,
    };
    const newState = returnRequests(initialState, action);

    expect(newState).toEqual({
      isFetchingReturnRequests: false,
      returnRequestsError: requests.returnRequestsErrorResponse.error,
    });
  });

  it('should handle HANDLING_RETURN_REQUEST', () => {
    const action = {
      type: actionTypes.HANDLING_RETURN_REQUEST,
    };
    const newState = returnRequests(initialState, action);

    expect(newState).toEqual({
      isHandlingReturnRequest: true,
    });
  });

  it('should handle HANDLE_RETURN_REQUEST_SUCCESS', () => {
    const action = {
      type: actionTypes.HANDLE_RETURN_REQUEST_SUCCESS,
      requestId: requests.handleReturnRequestResponse
        .returnRequest.id,
      status: requests.handleReturnRequestResponse
        .returnRequest.status,
    };
    const previousState = requests.returnRequestsPreviousState;
    const expected = {
      returnRequests: [
        {
          id: 12,
          comments: null,
          status: 'Returned',
          createdAt: '2018-06-21T20:58:16.452Z',
          updatedAt: '2018-06-21T21:05:26.890Z',
          userId: 20000,
          bookId: 89,
          userReturnRequests: {
            id: 20000,
            firstName: 'Amarachi',
            lastName: 'Agbo',
            email: 'amarkipkip@gmail.com',
            role: 'Admin',
            imageURL: null,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-05-10T03:11:52.181Z',
          },
          returnRequests: {
            id: 89,
            title: 'The 7 Habits of Highly Effective People',
            author: 'Stephen Covey',
            description: 'Dr. Covey\'s 7 Habits book is one of inspiring',
            subject: 'Inspiration',
            imageURL: 'https://images-na.ssl-images-amazon.com/images.jpg',
            quantity: 20,
            borrowCount: 1,
            favCount: 1,
            upvotes: 0,
            downvotes: 0,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-07-05T19:26:24.934Z',
          },
        },
      ],
      pagination: {
        pageCount: 1,
        pageSize: 1,
        currentPage: 1,
        dataCount: 1,
      },
    };
    const newState = returnRequests(previousState, action);

    expect(newState).toEqual({
      returnRequests: expected.returnRequests,
      pagination: requests.returnRequestsPreviousState.pagination,
      isHandlingReturnRequest: false,
    });
  });

  it('should handle HANDLE_RETURN_REQUEST_FAILURE', () => {
    const action = {
      type: actionTypes.HANDLE_RETURN_REQUEST_FAILURE,
      error: requests.handleReturnRequestErrorResponse.error,
    };
    const newState = returnRequests(initialState, action);

    expect(newState).toEqual({
      isHandlingReturnRequest: false,
    });
  });
});
