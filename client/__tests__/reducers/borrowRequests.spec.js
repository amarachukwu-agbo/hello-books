import borrowRequests from '../../reducers/borrowRequests';
import * as actionTypes from '../../actions/types';
import mockData from '../__mocks__/mockData';

const initialState = {};
const { requests } = mockData;

describe('Borrow Requests reducer', () => {
  it('should return the initial state', () => {
    expect(borrowRequests(undefined, {})).toEqual({});
  });

  it('should handle FETCHING_BORROW_REQUESTS', () => {
    const action = {
      type: actionTypes.FETCHING_BORROW_REQUESTS,
    };
    const newState = borrowRequests(initialState, action);

    expect(newState).toEqual({
      isFetchingBorrowRequests: true,
      borrowRequests: null,
      borrowRequestsError: null,
    });
  });

  it('should handle BORROW_REQUESTS_SUCCESS', () => {
    const action = {
      type: actionTypes.BORROW_REQUESTS_SUCCESS,
      requests: requests.borrowRequestsResponse.requests,
      pagination: requests.borrowRequestsResponse.pagination,
    };
    const newState = borrowRequests(initialState, action);

    expect(newState).toEqual({
      isFetchingBorrowRequests: false,
      borrowRequests: requests.borrowRequestsResponse.requests,
      pagination: requests.borrowRequestsResponse.pagination,
      borrowRequestsError: null,
    });
  });

  it('should handle BORROW_REQUESTS_FAILURE', () => {
    const action = {
      type: actionTypes.BORROW_REQUESTS_FAILURE,
      error: requests.borrowRequestsErrorResponse.error,
    };
    const newState = borrowRequests(initialState, action);

    expect(newState).toEqual({
      isFetchingBorrowRequests: false,
      borrowRequestsError: requests.borrowRequestsErrorResponse.error,
    });
  });

  it('should handle HANDLING_BORROW_REQUEST', () => {
    const action = {
      type: actionTypes.HANDLING_BORROW_REQUEST,
    };
    const newState = borrowRequests(initialState, action);

    expect(newState).toEqual({
      isHandlingBorrowRequest: true,
    });
  });

  it('should handle HANDLE_BORROW_REQUEST_SUCCESS', () => {
    const action = {
      type: actionTypes.HANDLE_BORROW_REQUEST_SUCCESS,
      requestId: requests.handleBorrowRequestResponse
        .borrowRequest.id,
      status: requests.handleBorrowRequestResponse
        .borrowRequest.status,
    };
    const previousState = requests.borrowRequestsPreviousState;
    const expected = {
      borrowRequests: [
        {
          id: 12,
          reason: 'Assignment',
          comments: null,
          returnDate: '2018-12-11T23:00:00.000Z',
          status: 'Accepted',
          createdAt: '2018-06-25T02:15:45.082Z',
          updatedAt: '2018-06-25T02:17:03.472Z',
          bookId: 98,
          userId: 8,
          userBorrowRequests: {
            id: 8,
            firstName: 'Amarachi',
            lastName: 'Agbo',
            email: 'amarachukwu.agbo@andela.com',
            role: 'User',
            imageURL: null,
            createdAt: '2018-06-25T02:14:05.369Z',
            updatedAt: '2018-06-25T02:14:05.369Z',
          },
          borrowRequests: {
            id: 98,
            title: 'I"ll Be Gone in the Dark',
            author: 'Michelle McNamara',
            description: 'A masterful true crime',
            subject: 'True Crime',
            imageURL: 'https://images.jpg',
            quantity: 4,
            borrowCount: 4,
            favCount: 2,
            upvotes: 0,
            downvotes: 2,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-06-27T12:18:46.422Z',
          },
        },
        {
          id: 11,
          reason: 'Research',
          comments: 'Nil',
          returnDate: '2018-12-07T23:00:00.000Z',
          status: 'Accepted',
          createdAt: '2018-06-25T02:09:01.743Z',
          updatedAt: '2018-06-25T02:09:59.410Z',
          bookId: 95,
          userId: 7,
          userBorrowRequests: {
            id: 7,
            firstName: 'Amarachi',
            lastName: 'Agbo',
            email: 'amaracukwu.agbo@andela.com',
            role: 'User',
            imageURL: null,
            createdAt: '2018-06-25T02:08:20.419Z',
            updatedAt: '2018-06-25T02:08:20.419Z',
          },
          borrowRequests: {
            id: 95,
            title: 'Born a Crime',
            author: 'Trevor Noah',
            description: 'Attuned to the power',
            subject: 'Biography',
            imageURL: 'https://image._AA300_.jpg',
            quantity: 18,
            borrowCount: 2,
            favCount: 0,
            upvotes: 0,
            downvotes: 0,
            createdAt: '2018-05-10T03:11:52.181Z',
            updatedAt: '2018-06-25T02:09:59.423Z',
          },
        },
      ],
    };
    const newState = borrowRequests(previousState, action);

    expect(newState).toEqual({
      borrowRequests: expected.borrowRequests,
      pagination: requests.borrowRequestsResponse.pagination,
      isHandlingBorrowRequest: false,
    });
  });

  it('should handle HANDLE_BORROW_REQUEST_FAILURE', () => {
    const action = {
      type: actionTypes.HANDLE_BORROW_REQUEST_FAILURE,
      error: requests.handleBorrowRequestErrorResponse.error,
    };
    const newState = borrowRequests(initialState, action);

    expect(newState).toEqual({
      isHandlingBorrowRequest: false,
    });
  });
});
