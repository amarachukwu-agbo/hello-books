import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import mockData from '../__mocks__/mockData';
import * as actionTypes from '../../actions/types';
import {
  getUserProfile,
  returnBook,
} from '../../actions/profile';

describe('Profile actions', () => {
  const mockStore = configureStore([thunk]);
  const { users, books } = mockData;

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it(`dispatches FETCHING_PROFILE and
    PROFILE_SUCCESS when fetching a user's profile`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: users.profileResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.FETCHING_PROFILE,
    }, {
      type: actionTypes.PROFILE_SUCCESS,
      profile: users.profileResponse.user,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getUserProfile(3))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches FETCHING_PROFILE and
    PROFILE_FAILURE when there is an error 
    fetching a user's profile`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: users.profileErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.FETCHING_PROFILE,
    }, {
      type: actionTypes.PROFILE_FAILURE,
      error: users.profileErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getUserProfile(3))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches RETURN_BOOK_REQUEST and
    RETURN_BOOK_SUCCESS when returning a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: books.returnBookResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.RETURN_BOOK_REQUEST,
    }, {
      type: actionTypes.RETURN_BOOK_SUCCESS,
      returnRequest: books.returnBookResponse.returnRequest,
    },
    ];
    const store = mockStore({});
    return store.dispatch(returnBook(3, 97))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches RETURN_BOOK_REQUEST and
  RETURN_BOOK_FAILURE when returning a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: books.returnBookErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.RETURN_BOOK_REQUEST,
    }, {
      type: actionTypes.RETURN_BOOK_FAILURE,
      error: books.returnBookErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(returnBook(3, 97))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});

