import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import mockData from '../__mocks__/mockData';
import * as actionTypes from '../../actions/types';
import getUserFavorites from '../../actions/favorites';

describe('Favorites actions', () => {
  const mockStore = configureStore([thunk]);
  const { users } = mockData;

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it(`dispatches FETCHING_FAVORITES and
  FAVORITES_SUCCESS when fetching a user's favorites`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: users.favoritesResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.FETCHING_FAVORITES,
    }, {
      type: actionTypes.FAVORITES_SUCCESS,
      favorites: users.favoritesResponse.favorites,
      pagination: users.favoritesResponse.pagination,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getUserFavorites(1, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches FETCHING_FAVORITES and
    FAVORITES_FAILURE when fetching a user's favorites`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: users.favoritesErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.FETCHING_FAVORITES,
    }, {
      type: actionTypes.FAVORITES_FAILURE,
      error: users.favoritesErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getUserFavorites(1, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
