import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import mockData from '../../__mocks__/mockData';
import ConnectedAdminBooksPage, { AdminBooksPage }
  from '../../../components/Admin/AdminBooksPage';

const props = {
  getBooks: sinon.spy(() => Promise.resolve()),
  deleteBook: sinon.spy(() => Promise.resolve()),
  editBook: sinon.spy(() => Promise.resolve()),
  isFetching: false,
  pagination: null,
};

const { $ } = global;

describe('<AdminBooksPage />', () => {
  afterEach(() => {
    global.$ = $;
  });
  it('calls componentDidMount()', () => {
    sinon.spy(AdminBooksPage.prototype, 'componentDidMount');
    mount(<AdminBooksPage {...props}/>);
    expect(AdminBooksPage.prototype.componentDidMount.calledOnce)
      .toEqual(true);
    expect(props.getBooks.calledOnce)
      .toEqual(true);
    expect(props.getBooks.calledWith(1));
  });

  it('renders correctly', () => {
    const wrapper = shallow(<AdminBooksPage {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls setBookForEdit()', () => {
    const openModalMock = jest.fn();
    global.$ = () => ({
      modal: openModalMock,
    });
    const wrapper = shallow(<AdminBooksPage {...props}/>);
    sinon.spy(wrapper.instance(), 'setBookForEdit');
    wrapper.instance().setBookForEdit(1, 0);
    expect(wrapper.instance().setBookForEdit.calledOnce)
      .toEqual(true);
    expect(wrapper.instance().setBookForEdit.calledWith(1, 0));
    expect(wrapper.state().book.bookId).toEqual(1);
    expect(wrapper.state().book.bookIndex).toEqual(0);
  });

  it('calls the deleteBook() method', () => {
    const wrapper = shallow(<AdminBooksPage {...props}/>);
    sinon.spy(wrapper.instance(), 'deleteBook');
    wrapper.instance().deleteBook(1);
    expect(wrapper.instance().deleteBook.calledOnce)
      .toEqual(true);
    expect(wrapper.instance().deleteBook.calledWith(1));
  });

  it('renders the preloader when books are fetching', () => {
    props.isFetching = true;
    const wrapper = shallow(<AdminBooksPage {...props}/>);
    expect(wrapper.find('Preloader')).toHaveLength(1);
  });

  it('render errors when there is an error fetching books', () => {
    props.error = 'Network Error';
    props.isFetching = false;
    const wrapper = shallow(<AdminBooksPage {...props}/>);
    expect(wrapper.find('h4').text())
      .toEqual('Oops! Couldn\'t fetch available books. Network Error');
  });

  it('renders books when books are available', () => {
    const { books } = mockData;
    props.errror = null;
    props.books = books.booksDataResponse.books;
    props.pagination = books.booksDataResponse.pagination;

    const wrapper = shallow(<AdminBooksPage {...props} />);
    expect(wrapper.find('AdminBooks')).toHaveLength(1);
    expect(wrapper.find('Pagination')).toHaveLength(1);
  });
});

describe('<ConnectedAdminBooksPage />', () => {
  it('should render successfully', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});
    const connectedWrapper = shallow(<ConnectedAdminBooksPage
      store = {store}/>);
    expect(connectedWrapper.length).toBe(1);
  });
});
