import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import mockData from '../__mocks__/mockData';
import * as actionTypes from '../../actions/types';
import { signUp } from '../../actions/signUp';


describe('Signup actions', () => {
  const mockStore = configureStore([thunk]);
  const { users } = mockData;

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('dispatches SIGNING_UP and SIGN_UP_SUCCESS on user sign up', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: users.authResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.SIGNING_UP,
    }, {
      type: actionTypes.SIGN_UP_SUCCESS,
      user: users.authResponse.user,
    },
    {
      type: actionTypes.LOGIN_SUCCESS,
      user: users.authResponse.user,
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
    return store.dispatch(signUp(users.signupData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches SIGNING_UP and SIGN_UP_FAILURE actions on user
    sign up error`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: users.signupErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.SIGNING_UP,
    }, {
      type: actionTypes.SIGN_UP_FAILURE,
      error: users.signupErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(signUp(users.signupData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
