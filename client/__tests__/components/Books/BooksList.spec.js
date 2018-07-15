import React from 'react';
import { shallow } from 'enzyme';
import BooksList from '../../../components/Books/BooksList';

const props = {
  books: [
    {
      id: 94,
      title: 'Macbeth',
      author: 'A.J.Hartley',
      description: 'Macbeth: A Novel.',
      subject: 'Romance',
      imageURL: 'https://images/mages/I/51l6MwpodJL._AA300_.jpg',
      quantity: 70,
      borrowCount: 0,
      favCount: 1,
      upvotes: 0,
      downvotes: 0,
      createdAt: '2018-05-10T03:11:52.181Z',
      updatedAt: '2018-07-06T00:58:12.625Z',
      bookReviews: [],
    },
    {
      id: 95,
      title: 'Born a Crime',
      author: 'Trevor Noah',
      description: 'Born a crime',
      subject: 'Biography',
      imageURL: 'https://image/images/I/61mJhMWAq8L._AA300_.jpg',
      quantity: 18,
      borrowCount: 3,
      favCount: 1,
      upvotes: 1,
      downvotes: 0,
      createdAt: '2018-05-10T03:11:52.181Z',
      updatedAt: '2018-07-10T08:49:01.366Z',
      bookReviews: [],
    },
  ],
};
describe('<BooksList />', () => {
  it('should render a list of books correctly', () => {
    const tree = shallow(<BooksList {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render <h3> when no books are available', () => {
    const books = [];
    const wrapper = shallow(<BooksList books = { books } />);
    expect(wrapper.find('h3').text())
      .toEqual('Oops! Seems no books are available at the moment');
  });
});
