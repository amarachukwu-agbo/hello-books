import React from 'react';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import mockData from '../../__mocks__/mockData';
import ConnectedBooksPage,
{ BooksPage } from '../../../components/Books/BooksPage';

const { books } = mockData;
const props = {
  searchBooks: sinon.spy(() => Promise.resolve()),
  getBooks: sinon.spy(() => Promise.resolve()),
  isFetching: false,
  error: null,
  books: books.booksDataResponse.books,
  pagination: books.bookDataResponse.pagination,
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('<BooksPage />', () => {
  sinon.spy(BooksPage.prototype, 'componentDidMount');
  it('renders successfully', () => {
    const wrapper = shallow(<BooksPage {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
  it('calls componentDidMount()', () => {
    shallow(<BooksPage {...props} />);
    expect(BooksPage.prototype.componentDidMount.called)
      .toEqual(true);
    expect(props.getBooks.called).toEqual(true);
  });
  it('render Preloader when the books are fetching', () => {
    props.isFetching = true;
    const wrapper = shallow(<BooksPage {...props}/>);
    expect(wrapper.find('Preloader')).toHaveLength(1);
  });
  it('renders error if there is an error fetching books', () => {
    props.isFetching = false;
    props.error = 'Network Error';
    const wrapper = shallow(<BooksPage {...props}/>);
    expect(wrapper.find('h6').text())
      .toEqual('Oops! Couldn\'t fetch available books. Network Error');
  });
  it('renders search results when there are search results', () => {
    props.searchResults = books.searchBooksResponse.books;
    props.pagination = books.searchBooksResponse.pagination;
    props.books = null;
    const wrapper = shallow(<BooksPage {...props}/>);
    expect(wrapper.find('BooksList')).toHaveLength(1);
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });
  it('calls getBooks() method when button is clicked', () => {
    const wrapper = shallow(<BooksPage {...props}/>);
    const getBooksButton = wrapper.find('#get-books-button');
    getBooksButton.simulate('click');
    expect(props.getBooks.called).toEqual(true);
  });
});

describe('<ConnectedBooksPage/>', () => {
  it('renders correctly', () => {
    const connectedWrapper = shallow(<ConnectedBooksPage
    store = {store} {...props}/>);
    expect(connectedWrapper).toMatchSnapshot();
  });
});
