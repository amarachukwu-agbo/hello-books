import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import mockData from '../__mocks__/mockData';
import * as actionTypes from '../../actions/types';
import {
  getBorrowRequests,
  handleBorrowRequest,
} from '../../actions/borrowrequests';

describe('Borrow Requests actions', () => {
  const mockStore = configureStore([thunk]);
  const { requests } = mockData;

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it(`dispatches FETCHING_BORROW_REQUESTS and
   BORROW_REQUESTS_SUCCESS when fetching borrow requests`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: requests.borrowRequestsResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.FETCHING_BORROW_REQUESTS,
    }, {
      type: actionTypes.BORROW_REQUESTS_SUCCESS,
      requests: requests.borrowRequestsResponse.requests,
      pagination: requests.borrowRequestsResponse.pagination,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getBorrowRequests(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches FETCHING_BORROW_REQUESTS and
    BORROW_REQUESTS_FAILURE when there is an error
    fetching borrow requests`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: requests.borrowRequestsErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.FETCHING_BORROW_REQUESTS,
    }, {
      type: actionTypes.BORROW_REQUESTS_FAILURE,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getBorrowRequests(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches HANDLING_BORROW_REQUEST and
    HANDLE_BORROW_REQUEST_SUCCESS when
    handling borrow requests`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: requests.handleBorrowRequestResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.HANDLING_BORROW_REQUEST,
    }, {
      type: actionTypes.HANDLE_BORROW_REQUEST_SUCCESS,
      status: 'Accepted',
      requestId: 12,
    },
    ];
    const store = mockStore({});
    return store.dispatch(handleBorrowRequest('Accepted', 1, 97, 12))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches HANDLING_BORROW_REQUEST and
    HANDLE_BORROW_REQUEST_FAILURE when there
    is an error handling borrow requests`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: requests.handleBorrowRequestErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.HANDLING_BORROW_REQUEST,
    }, {
      type: actionTypes.HANDLE_BORROW_REQUEST_FAILURE,
    },
    ];
    const store = mockStore({});
    return store.dispatch(handleBorrowRequest('Accepted', 1, 97, 12))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
