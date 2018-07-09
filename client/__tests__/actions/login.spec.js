import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import mockData from '../__mocks__/mockData';
import * as actionTypes from '../../actions/types';
import { loginUser, logOut } from '../../actions/login';

describe('Login actions', () => {
  const mockStore = configureStore([thunk]);
  const { users } = mockData;

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it(
    `dispatches LOGGING_IN action and LOGIN_SUCCESS action and 
    redirests to index page on logging in user`,
    (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: users.authResponse,
        });
      });
      const expectedActions = [{
        type: actionTypes.LOGGING_IN,
      }, {
        type: actionTypes.LOGIN_SUCCESS,
        user: {
          firstName: 'Amarachi',
          id: 8,
          role: 'User',
        },
      },
      {
        payload:
            {
              args: ['/'],
              method: 'push',
            },
        type: '@@router/CALL_HISTORY_METHOD',
      }];
      const store = mockStore({});
      return store.dispatch(loginUser(users.loginData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(localStorage.getItem('user'))
            .toEqual('{"id":8,"firstName":"Amarachi","role":"User"}');
          done();
        });
    },
  );

  it(
    'dispatches LOGGING_IN action and LOGIN_FAILURE on login failure',
    (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: users.loginErrorResponse,
        });
      });
      const expectedActions = [{
        type: actionTypes.LOGGING_IN,
      },
      {
        type: actionTypes.LOGIN_FAILURE,
        error: 'Password provided does not match the user',
      },
      ];
      const store = mockStore({});
      return store.dispatch(loginUser(users.loginData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    },
  );

  it(
    `dispatches LOG_OUT action and redirects to 
    landing page on user logout`,
    (done) => {
      const expectedActions = [
        {
          type: actionTypes.LOG_OUT,
        },
        {
          payload: {
            args: ['/'],
            method: 'push',
          },
          type: '@@router/CALL_HISTORY_METHOD',
        },
      ];
      const store = mockStore({});
      store.dispatch(logOut());
      expect(store.getActions()).toEqual(expectedActions);
      expect(localStorage.getItem('user')).toEqual(null);
      done();
    },
  );
});
