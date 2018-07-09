import favorites from '../../reducers/favorites';
import * as actionTypes from '../../actions/types';
import mockData from '../__mocks__/mockData';

const initialState = {};
const { users } = mockData;

describe('Favorites reducer', () => {
  it('should return the initial state', () => {
    expect(favorites(undefined, {})).toEqual({});
  });

  it('should handle FETCHING_FAVORITES', () => {
    const action = {
      type: actionTypes.FETCHING_FAVORITES,
    };
    const newState = favorites(initialState, action);

    expect(newState).toEqual({
      isFetching: true,
      favorites: null,
    });
  });

  it('should handle FAVORITES_SUCCESS', () => {
    const action = {
      type: actionTypes.FAVORITES_SUCCESS,
      favorites: users.favoritesResponse.favorites,
      pagination: users.favoritesResponse.pagination,
    };
    const newState = favorites(initialState, action);

    expect(newState).toEqual({
      isFetching: false,
      favorites: users.favoritesResponse.favorites,
      pagination: users.favoritesResponse.pagination,
    });
  });

  it('should handle FAVORITES_FAILURE', () => {
    const action = {
      type: actionTypes.FAVORITES_FAILURE,
      error: users.favoritesErrorResponse.error,
    };
    const newState = favorites(initialState, action);

    expect(newState).toEqual({
      isFetching: false,
      error: users.favoritesErrorResponse.error,
    });
  });
});
