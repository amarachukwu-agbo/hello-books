import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import mockData from '../__mocks__/mockData';
import * as actionTypes from '../../actions/types';
import {
  getReturnRequests,
  handleReturnRequest,
} from '../../actions/returnrequests';

describe('Return Requests actions', () => {
  const mockStore = configureStore([thunk]);
  const { requests } = mockData;

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it(`dispatches FETCHING_RETURN_REQUESTS and
   RETURN_REQUESTS_SUCCESS when fetching return requests`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: requests.returnRequestsResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.FETCHING_RETURN_REQUESTS,
    }, {
      type: actionTypes.RETURN_REQUESTS_SUCCESS,
      requests: requests.returnRequestsResponse.requests,
      pagination: requests.returnRequestsResponse.pagination,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getReturnRequests(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches FETCHING_RETURN_REQUESTS and
    RETURN_REQUESTS_FAILURE when there is an error
    fetching return requests`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: requests.returnRequestsErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.FETCHING_RETURN_REQUESTS,
    }, {
      type: actionTypes.RETURN_REQUESTS_FAILURE,
      error: requests.returnRequestsErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getReturnRequests(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches HANDLING_RETURN_REQUEST and
    HANDLE_RETURN_REQUEST_SUCCESS when
    handling return requests`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: requests.handleReturnRequestResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.HANDLING_RETURN_REQUEST,
    }, {
      type: actionTypes.HANDLE_RETURN_REQUEST_SUCCESS,
      status: requests.handleReturnRequestResponse.status,
      requestId: 12,
    },
    ];
    const store = mockStore({});
    return store.dispatch(handleReturnRequest('Accepted', 1, 97, 12))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches HANDLING_RETURN_REQUEST and
    HANDLE_RETURN_REQUEST_FAILURE when there
    is an error handling return requests`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: requests.handleReturnRequestErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.HANDLING_RETURN_REQUEST,
    }, {
      type: actionTypes.HANDLE_RETURN_REQUEST_FAILURE,
      error: requests.handleReturnRequestErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(handleReturnRequest('Accepted', 1, 97, 12))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
