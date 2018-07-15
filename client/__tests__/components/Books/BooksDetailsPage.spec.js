import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedBookDetailsPage, { BookDetailsPage } from
  '../../../components/Books/BookDetailsPage';

const props = {
  getBook: sinon.spy(() => Promise.resolve()),
  favoriteBook: sinon.spy(() => Promise.resolve()),
  upvoteBook: sinon.spy(() => Promise.resolve()),
  borrowBook: sinon.spy(() => Promise.resolve()),
  reviewBook: sinon.spy(() => Promise.resolve()),
  isFetching: false,
  getBookError: null,
  match: {
    params: {
      bookId: 97,
    },
  },
  book: {
    id: 98,
    title: 'I"ll Be Gone in the Dark',
    author: 'Michelle McNamara',
    description: 'A masterful true crime account of the Golden State Killer.',
    subject: 'True Crime',
    imageURL: 'https://res/adolfo-felix-586654-unsplash_ukhitd.jpg',
    quantity: 3,
    borrowCount: 6,
    favCount: 3,
    upvotes: 1,
    downvotes: 4,
    createdAt: '2018-05-10T03:11:52.181Z',
    updatedAt: '2018-07-10T15:46:02.771Z',
    bookReviews: [
      {
        id: 20,
        review: 'Review',
        createdAt: '2018-07-10T08:51:25.310Z',
        updatedAt: '2018-07-10T08:51:25.310Z',
        userId: 16,
        bookId: 98,
        userReviews: {
          id: 16,
          firstName: 'Agbo',
          lastName: 'Tochi',
          email: 'rtochi57@gmail.com',
          role: 'User',
          imageURL: null,
          createdAt: '2018-07-08T19:29:20.334Z',
          updatedAt: '2018-07-08T19:29:20.334Z',
        },
      },
    ],
  },
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('<BooksDetailsPage />', () => {
  sinon.spy(BookDetailsPage.prototype, 'componentDidMount');
  it('renders correctly', () => {
    const wrapper = shallow(<BookDetailsPage {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
  it('calls componentDidMount()', () => {
    shallow(<BookDetailsPage {...props} />);
    expect(BookDetailsPage.prototype.componentDidMount.called)
      .toEqual(true);
    expect(props.getBook.called).toEqual(true);
    expect(props.getBook.calledWith(97)).toEqual(true);
  });
  it('calls render preloader when book is fetching', () => {
    props.isFetching = true;
    const wrapper = shallow(<BookDetailsPage {...props}/>);
    expect(wrapper.find('Preloader')).toHaveLength(1);
  });
  it('renders error when there is an error fetching book', () => {
    props.isFetching = false;
    props.getBookError = 'Book was not found';
    const wrapper = shallow(<BookDetailsPage {...props}/>);
    expect(wrapper.find('h5').text())
      .toEqual('The book you requested could not be retrieved. Book was not found'); /*eslint-disable-line*/
  });
});

describe('<ConnectedBooksDetailsPage/>', () => {
  const connectedWrapper = shallow(<ConnectedBookDetailsPage
    store = {store} {...props}/>);
  expect(connectedWrapper.length).toBe(1);
});
