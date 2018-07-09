import bookReducer from '../../reducers/book';
import * as actionTypes from '../../actions/types';
import mockData from '../__mocks__/mockData';

const initialState = {};
const { books } = mockData;

describe('Book reducer', () => {
  it('should return the initial state', () => {
    expect(bookReducer(undefined, {})).toEqual({});
  });

  it('should handle GET_BOOK_REQUEST', () => {
    const action = {
      type: actionTypes.GET_BOOK_REQUEST,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      book: null,
      isFetching: true,
    });
  });

  it('should handle GET_BOOK_SUCCESS', () => {
    const action = {
      type: actionTypes.GET_BOOK_SUCCESS,
      book: books.bookDataResponse.book,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      book: books.bookDataResponse.book,
      isFetching: false,
    });
  });

  it('should handle GET_BOOK_FAILURE', () => {
    const action = {
      type: actionTypes.GET_BOOK_FAILURE,
      error: books.bookErrorResponse.error,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      getBookError: books.bookErrorResponse.error,
      isFetching: false,
    });
  });

  it('should handle FAVORITE_REQUEST', () => {
    const action = {
      type: actionTypes.FAVORITE_REQUEST,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      isFavoriting: true,
    });
  });

  it('should handle FAVORITE_SUCCESS', () => {
    const action = {
      type: actionTypes.FAVORITE_SUCCESS,
      favCount: books.favoriteBookResponse.book.favCount,
    };
    const previousState = books.bookPreviousState;
    const expectedBook = {
      book: {
        id: 3,
        title: 'Another book',
        author: 'Joan Gaines',
        description: 'Another book',
        subject: 'Romabce',
        imageURL: 'https://images-na.ssl-image.jpg',
        quantity: 6,
        borrowCount: 0,
        favCount: 1,
        upvotes: 0,
        downvotes: 1,
        bookReviews: [],
        createdAt: '2018-05-10T03:11:52.181Z',
        updatedAt: '2018-06-23T19:14:10.925Z',
      },
    };
    const newState = bookReducer(previousState, action);

    expect(newState).toEqual({
      isFavoriting: false,
      book: expectedBook.book,
    });
  });

  it('should handle FAVORITE_FAILURE', () => {
    const action = {
      type: actionTypes.FAVORITE_FAILURE,
      error: books.favoriteBookErrorResponse.error,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      isFavoriting: false,
    });
  });

  it('should handle UPVOTE_REQUEST', () => {
    const action = {
      type: actionTypes.UPVOTE_REQUEST,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      isUpvoting: true,
    });
  });

  it('should handle UPVOTE_SUCCESS', () => {
    const expectedBook = {
      book: {
        id: 3,
        title: 'Another book',
        author: 'Joan Gaines',
        description: 'Another book',
        subject: 'Romabce',
        imageURL: 'https://images-na.ssl-image.jpg',
        quantity: 6,
        borrowCount: 0,
        favCount: 0,
        upvotes: 1,
        downvotes: 1,
        bookReviews: [],
        createdAt: '2018-05-10T03:11:52.181Z',
        updatedAt: '2018-06-23T19:14:10.925Z',
      },
    };
    const action = {
      type: actionTypes.UPVOTE_SUCCESS,
      book: expectedBook.book,
    };
    const previousState = books.bookPreviousState;
    const newState = bookReducer(previousState, action);

    expect(newState).toEqual({
      isUpvoting: false,
      book: expectedBook.book,
    });
  });

  it('should handle UPVOTE_FAILURE', () => {
    const action = {
      type: actionTypes.UPVOTE_FAILURE,
      error: books.upvoteBookErrorResponse.error,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      isUpvoting: false,
    });
  });

  it('should handle DOWNVOTE_REQUEST', () => {
    const action = {
      type: actionTypes.DOWNVOTE_REQUEST,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      isDownvoting: true,
    });
  });

  it('should handle DOWNVOTE_SUCCESS', () => {
    const expectedBook = {
      book: {
        id: 3,
        title: 'Another book',
        author: 'Joan Gaines',
        description: 'Another book',
        subject: 'Romabce',
        imageURL: 'https://images-na.ssl-image.jpg',
        quantity: 6,
        borrowCount: 0,
        favCount: 0,
        upvotes: 0,
        downvotes: 1,
        bookReviews: [],
        createdAt: '2018-05-10T03:11:52.181Z',
        updatedAt: '2018-06-23T19:14:10.925Z',
      },
    };
    const previousState = books.bookPreviousState;
    const action = {
      type: actionTypes.DOWNVOTE_SUCCESS,
      book: expectedBook.book,
    };
    const newState = bookReducer(previousState, action);

    expect(newState).toEqual({
      isDownvoting: false,
      book: expectedBook.book,
    });
  });

  it('should handle DOWNVOTE_FAILURE', () => {
    const action = {
      type: actionTypes.DOWNVOTE_FAILURE,
      error: books.downvoteBookErrorResponse.error,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      isDownvoting: false,
    });
  });

  it('should handle BORROW_BOOK_REQUEST', () => {
    const action = {
      type: actionTypes.BORROW_BOOK_REQUEST,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      isBorrowing: true,
    });
  });

  it('should handle BORROW_BOOK_SUCCESS', () => {
    const action = {
      type: actionTypes.BORROW_BOOK_SUCCESS,
      borrowStatus: books.borrowBookResponse.request.status,
      book: books.bookDataResponse.book,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      isBorrowing: false,
      borrowStatus: books.borrowBookResponse.request.status,
    });
  });

  it('should handle BORROW_BOOK_FAILURE', () => {
    const action = {
      type: actionTypes.BORROW_BOOK_FAILURE,
      error: books.downvoteBookErrorResponse.error,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      isBorrowing: false,
    });
  });

  it('should handle REVIEW_BOOK_REQUEST', () => {
    const action = {
      type: actionTypes.REVIEW_BOOK_REQUEST,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      isReviewing: true,
    });
  });

  it('should handle REVIEW_BOOK_SUCCESS', () => {
    const expectedBook = {
      book: {
        id: 3,
        title: 'Another book',
        author: 'Joan Gaines',
        description: 'Another book',
        subject: 'Romabce',
        imageURL: 'https://images-na.ssl-image.jpg',
        quantity: 6,
        borrowCount: 0,
        favCount: 0,
        upvotes: 0,
        downvotes: 1,
        bookReviews: [
          {
            id: 1,
            review: 'I enjoyed reading this book',
            createdAt: '2018-06-24T13:18:52.295Z',
            updatedAt: '2018-06-24T13:18:52.295Z',
            userId: 3,
            bookId: 1,
            userReviews: {
              id: 3,
              firstName: 'Grace',
              lastName: 'Jade',
              imageURL: null,
              createdAt: '2018-06-23T14:42:46.827Z',
            },
          },
        ],
        createdAt: '2018-05-10T03:11:52.181Z',
        updatedAt: '2018-06-23T19:14:10.925Z',
      },
    };
    const action = {
      type: actionTypes.REVIEW_BOOK_SUCCESS,
      book: expectedBook.book,
    };
    const previousState = books.bookPreviousState;
    const newState = bookReducer(previousState, action);

    expect(newState).toEqual({
      isReviewing: false,
      book: expectedBook.book,
    });
  });

  it('should handle REVIEW_BOOK_FAILURE', () => {
    const action = {
      type: actionTypes.REVIEW_BOOK_FAILURE,
      error: books.reviewBookErrorResponse.error,
    };
    const newState = bookReducer(initialState, action);

    expect(newState).toEqual({
      isReviewing: false,
    });
  });
});
