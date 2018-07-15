import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import mockData from '../../__mocks__/mockData';
import BookDetails from
  '../../../components/Books/BookDetails';

const { books } = mockData;
const props = {
  favoriteBook: sinon.spy(() => Promise.resolve()),
  upvoteBook: sinon.spy(() => Promise.resolve()),
  downvoteBook: sinon.spy(() => Promise.resolve()),
  borrowBook: sinon.spy(() => Promise.resolve()),
  isUpvoting: false,
  isDownvoting: false,
  isFavoriting: false,
  isAuthenticated: true,
  book: books.bookDataResponse.book,
};

const jQueryMock = sinon.spy(jest.fn());

global.$ = () => ({
  modal: jQueryMock,
});

describe('<BookDetails />', () => {
  sinon.spy(BookDetails.prototype, 'upvoteBook');
  sinon.spy(BookDetails.prototype, 'downvoteBook');
  sinon.spy(BookDetails.prototype, 'favoriteBook');

  afterEach(() => {
    global.$ = $;
    props.favoriteBook.reset();
    props.upvoteBook.reset();
    props.downvoteBook.reset();
  });
  it('renders correctly', () => {
    const wrapper = shallow(<BookDetails {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it(`calls upvoteBook() method when
    upvote button is clicked`, () => {
    const wrapper = shallow(<BookDetails {...props}/>);
    const upvoteButton = wrapper.find('#upvote-book');
    upvoteButton.simulate('click');
    expect(BookDetails.prototype.upvoteBook.called)
      .toEqual(true);
    expect(props.upvoteBook.called).toEqual(true);
    expect(props.upvoteBook.calledWith(97))
      .toEqual(true);
  });

  it(`calls downvoteBook() method when
    downvote button is clicked`, () => {
    const wrapper = shallow(<BookDetails {...props}/>);
    const downvoteButton = wrapper.find('#downvote-book');
    downvoteButton.simulate('click');
    expect(BookDetails.prototype.downvoteBook.called)
      .toEqual(true);
    expect(props.downvoteBook.called).toEqual(true);
    expect(props.downvoteBook.calledWith(97))
      .toEqual(true);
  });

  it(`calls favoriteBook() method 
    when favorite button is clicked`, () => {
    const wrapper = shallow(<BookDetails {...props}/>);
    const favoriteButton = wrapper.find('#favorite-book');
    favoriteButton.simulate('click');
    expect(BookDetails.prototype.favoriteBook.called)
      .toEqual(true);
    expect(props.favoriteBook.called).toEqual(true);
    expect(props.favoriteBook.calledWith(97))
      .toEqual(true);
  });

  it(`opens the borrowBook modal when
    the borrow book button is clicked`, () => {
    const wrapper = shallow(<BookDetails {...props}/>);
    const borrowButton = wrapper.find('#borrow-book');
    borrowButton.simulate('click');
    expect(jQueryMock.called).toEqual(true);
  });

  it(`calls does not call favoriteBook props when
    user is unauthenticated`, () => {
    props.isAuthenticated = false;
    const wrapper = shallow(<BookDetails {...props}/>);
    const favoriteButton = wrapper.find('#favorite-book');
    favoriteButton.simulate('click');
    expect(BookDetails.prototype.favoriteBook.called)
      .toEqual(true);
    expect(props.favoriteBook.called).toEqual(false);
  });

  it(`calls does not call downvoteBook props when
    user is unauthenticated`, () => {
    const wrapper = shallow(<BookDetails {...props}/>);
    const deleteButton = wrapper.find('#downvote-book');
    deleteButton.simulate('click');
    expect(props.downvoteBook.called).toEqual(false);
  });

  it(`calls does not call upvoteBook props when
    user is unauthenticated`, () => {
    props.isAuthenticated = false;
    const wrapper = shallow(<BookDetails {...props}/>);
    const upvoteButton = wrapper.find('#upvote-book');
    upvoteButton.simulate('click');
    expect(props.upvoteBook.called).toEqual(false);
  });
});
