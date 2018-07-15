import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockData from '../../__mocks__/mockData';
import ConnectedIndexPage,
{ IndexPage } from '../../../components/Index/Index';
import Notify from '../../../helpers/Notify';

let wrapper;
const { books } = mockData;
const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const notifyInfo = sinon.spy(Notify, 'notifyInfo');

const props = {
  getBooks: sinon.spy(() => Promise.resolve()),
  searchBooks: sinon.spy(() => Promise.resolve()),
  getMostUpvotedBooks: sinon.spy(() => Promise.resolve()),
  books: books.booksDataResponse.books,
  upvotedBooks: books.upvotedBooksResponse.books,
  upvotedBooksPagination: books.upvotedBooksResponse.pagination,
  isFetching: false,
  searchError: null,
  isLoading: null,
  upvotedError: null,
  error: null,
};

sinon.spy(IndexPage.prototype, 'componentDidMount');

describe('<IndexPage />', () => {
  beforeEach(() => {
    wrapper = shallow(<IndexPage {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls componentDidMount', () => {
    expect(IndexPage.prototype.componentDidMount.called)
      .toEqual(true);
    expect(props.getBooks.called).toEqual(true);
    expect(props.getBooks.calledWith(1)).toEqual(true);
    expect(props.getMostUpvotedBooks.called).toEqual(true);
    expect(props.getMostUpvotedBooks.calledWith(1)).toEqual(true);
  });

  it('renders errors if there are errors fetching books', () => {
    wrapper.setProps({
      books: null,
      error: 'An error occured',
    });
    expect(wrapper.find('h6').text())
      .toEqual('Oops! Couldn\'t fetch available books. An error occured');
  });

  it('renders errors if there are errors fetching most upvoted books', () => {
    wrapper.setProps({
      upvotedBooks: null,
      upvotedError: 'Network error',
    });
    expect(wrapper.find('#upvoted-error').text())
      .toEqual('Oops! Couldn\'t fetch available books. Network error');
  });

  it('renders Preloader when fetching books and most upvoted books', () => {
    wrapper.setProps({
      upvotedBooks: null,
      upvotedError: null,
      error: null,
      isFetching: true,
      isLoading: true,
    });
    expect(wrapper.find('Preloader')).toHaveLength(2);
  });

  it(`notifies users of search errors if there
    are errors while searching books`, () => {
    wrapper.setProps({
      searchError: 'No book matches search query',
    });
    expect(notifyInfo.called).toEqual(true);
    notifyInfo.restore();
  });
});

describe('<ConnectedIndexPage />', () => {
  it('renders correctly', () => {
    const connectedWrapper = shallow(<ConnectedIndexPage
    store = { store }
    {...props}/>);
    expect(connectedWrapper).toMatchSnapshot();
  });
});
