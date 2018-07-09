import profile from '../../reducers/profile';
import * as actionTypes from '../../actions/types';
import mockData from '../__mocks__/mockData';

const initialState = {};
const { books, users } = mockData;

describe('Profile reducer', () => {
  it('should return the initial state', () => {
    expect(profile(undefined, {})).toEqual({});
  });

  it('should handle FETCHING_PROFILE', () => {
    const action = {
      type: actionTypes.FETCHING_PROFILE,
    };
    const newState = profile(initialState, action);

    expect(newState).toEqual({
      isFetchingProfile: true,
      profile: null,
    });
  });

  it('should handle PROFILE_SUCCESS', () => {
    const action = {
      type: actionTypes.PROFILE_SUCCESS,
      profile: users.profileResponse.user,
    };
    const newState = profile(initialState, action);

    expect(newState).toEqual({
      isFetchingProfile: false,
      profile: users.profileResponse.user,
    });
  });

  it('should handle PROFILE_FAILURE', () => {
    const action = {
      type: actionTypes.PROFILE_FAILURE,
      error: users.profileErrorResponse.error,
    };
    const newState = profile(initialState, action);

    expect(newState).toEqual({
      isFetchingProfile: false,
      profileError: users.profileErrorResponse.error,
    });
  });

  it('should handle RETURN_BOOK_REQUEST', () => {
    const action = {
      type: actionTypes.RETURN_BOOK_REQUEST,
    };
    const newState = profile(initialState, action);

    expect(newState).toEqual({
      isSendingRequest: true,
    });
  });

  it('should handle RETURN_BOOK_SUCCESS', () => {
    const action = {
      type: actionTypes.RETURN_BOOK_SUCCESS,
      returnRequest: books.returnBookResponse.returnRequest,
    };
    const previousState = users.profilePreviousState;
    const newState = profile(previousState, action);
    const expectedProfile = {
      id: 3,
      firstName: 'Grace',
      lastName: 'Jade',
      email: 'gracejade@gmail.com',
      role: 'User',
      imageURL: null,
      createdAt: '2018-06-23T14:42:46.827Z',
      updatedAt: '2018-06-23T14:42:46.827Z',
      userBooks: users.profilePreviousState.profile.userBooks,
      userBorrowRequests: users.profilePreviousState.profile.userBorrowRequests,
      userFavorites: users.profilePreviousState.profile.userFavorites,
      userReturnRequests: [{
        id: 5,
        comments: null,
        status: 'Pending',
        createdAt: '2018-06-24T13:39:42.424Z',
        updatedAt: '2018-06-24T13:39:42.424Z',
        userId: 3,
        bookId: 97,
        returnRequests: {
          title: 'New title',
          author: 'New author',
        },
      },
      ],
    };

    expect(newState).toEqual({
      isSendingRequest: false,
      profile: expectedProfile,
    });
  });

  it('should handle RETURN_BOOK_FAILURE', () => {
    const action = {
      type: actionTypes.RETURN_BOOK_FAILURE,
      error: books.returnBookErrorResponse.error,
    };
    const newState = profile(initialState, action);

    expect(newState).toEqual({
      isSendingRequest: false,
      requestError: books.returnBookErrorResponse.error,
    });
  });
});
