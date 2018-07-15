import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import mockData from '../__mocks__/mockData';
import * as actionTypes from '../../actions/types';
import {
  getBook,
  favoriteBook,
  upvoteBook,
  downvoteBook,
  borrowBook,
  reviewBook,
} from '../../actions/book';

describe('Book actions', () => {
  const mockStore = configureStore([thunk]);
  const { books } = mockData;

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it(`dispatches GET_BOOK_REQUEST and
    GET_BOOK_SUCCESS when fetching a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: books.bookDataResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.GET_BOOK_REQUEST,
    }, {
      type: actionTypes.GET_BOOK_SUCCESS,
      book: books.bookDataResponse.book,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getBook(97))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches GET_BOOK_REQUEST and
    GET_BOOK_FAILURE when there is an error fetching a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: books.bookErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.GET_BOOK_REQUEST,
    }, {
      type: actionTypes.GET_BOOK_FAILURE,
      error: books.bookErrorResponse.error,
    },
    ];
    const store = mockStore({});
    return store.dispatch(getBook(707))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches FAVORITE_REQUEST and
    FAVORITE_SUCCESS when adding a book to favorites`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: books.favoriteBookResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.FAVORITE_REQUEST,
    }, {
      type: actionTypes.FAVORITE_SUCCESS,
      favCount: books.favoriteBookResponse.book.favCount,
    },
    ];
    const store = mockStore({});
    return store.dispatch(favoriteBook(97))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches FAVORITE_REQUEST and
    FAVORITE_FAILURE when there is an error
    adding a book to favorites`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: books.favoriteBookErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.FAVORITE_REQUEST,
    }, {
      type: actionTypes.FAVORITE_FAILURE,
    },
    ];
    const store = mockStore({});
    return store.dispatch(favoriteBook(97))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches UPVOTE_REQUEST and
    UPVOTE_SUCCESS when upvoting a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: books.upvoteBookResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.UPVOTE_REQUEST,
    }, {
      type: actionTypes.UPVOTE_SUCCESS,
      book: books.upvoteBookResponse.vote.book,
    },
    ];
    const store = mockStore({});
    return store.dispatch(upvoteBook(97))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches UPVOTE_REQUEST and
    UPVOTE_FAILURE when there is an error
    upvoting a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: books.upvoteBookErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.UPVOTE_REQUEST,
    }, {
      type: actionTypes.UPVOTE_FAILURE,
    },
    ];
    const store = mockStore({});
    return store.dispatch(upvoteBook(97))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches DOWNVOTE_REQUEST and
    DOWNVOTE_SUCCESS when downvoting a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: books.downvoteBookResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.DOWNVOTE_REQUEST,
    }, {
      type: actionTypes.DOWNVOTE_SUCCESS,
      book: books.downvoteBookResponse.vote.book,
    },
    ];
    const store = mockStore({});
    return store.dispatch(downvoteBook(97))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches DOWNVOTE_REQUEST and
    DOWNVOTE_FAILURE when there is an error
    downvoting a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: books.downvoteBookErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.DOWNVOTE_REQUEST,
    }, {
      type: actionTypes.DOWNVOTE_FAILURE,
    },
    ];
    const store = mockStore({});
    return store.dispatch(downvoteBook(97))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches BORROW_BOOK_REQUEST and
    BORROW_BOOK_SUCCESS when borrowing a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 202,
        response: books.borrowBookResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.BORROW_BOOK_REQUEST,
    }, {
      type: actionTypes.BORROW_BOOK_SUCCESS,
      borrowStatus: books.borrowBookResponse.request.status,
    },
    ];
    const store = mockStore({});
    return store
      .dispatch(borrowBook(
        1,
        books.bookDataResponse.book,
        books.borrowBookRequest,
      ))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches BORROW_BOOK_REQUEST and
    BORROW_BOOK_FAILURE when there is an error
    borrowing a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: books.borrowBookErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.BORROW_BOOK_REQUEST,
    }, {
      type: actionTypes.BORROW_BOOK_FAILURE,
    },
    ];
    const store = mockStore({});
    return store
      .dispatch(borrowBook(
        1,
        books.bookDataResponse.book,
        books.borrowBookRequest,
      ))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches BORROW_BOOK_REQUEST and
    BORROW_BOOK_SUCCESS when borrowing a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 202,
        response: books.borrowBookResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.BORROW_BOOK_REQUEST,
    }, {
      type: actionTypes.BORROW_BOOK_SUCCESS,
      borrowStatus: books.borrowBookResponse.request.status,
    },
    ];
    const store = mockStore({});
    return store
      .dispatch(borrowBook(
        1,
        books.bookDataResponse.book,
        books.borrowBookRequest,
      ))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches BORROW_BOOK_REQUEST and
    BORROW_BOOK_FAILURE when there is an error
    borrowing a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: books.borrowBookErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.BORROW_BOOK_REQUEST,
    }, {
      type: actionTypes.BORROW_BOOK_FAILURE,
    },
    ];
    const store = mockStore({});
    return store
      .dispatch(borrowBook(
        1,
        books.bookDataResponse.book,
        books.borrowBookRequest,
      ))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
  it(`dispatches REVIEW_BOOK_REQUEST and
    REVIEW_BOOK_SUCCESS when reviewing a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: books.reviewBookResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.REVIEW_BOOK_REQUEST,
    }, {
      type: actionTypes.REVIEW_BOOK_SUCCESS,
      book: books.reviewBookResponse.reviewedBook,
    },
    ];
    const store = mockStore({});
    return store
      .dispatch(reviewBook(97, books.reviewBookRequest))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it(`dispatches REVIEW_BOOK_REQUEST and
    REVIEW_BOOK_FAILURE when there is an error
    reviewing a book`, (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: books.reviewBookErrorResponse,
      });
    });
    const expectedActions = [{
      type: actionTypes.REVIEW_BOOK_REQUEST,
    }, {
      type: actionTypes.REVIEW_BOOK_FAILURE,
    },
    ];
    const store = mockStore({});
    return store
      .dispatch(reviewBook(97, books.reviewBookRequest))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
