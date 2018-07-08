/* import React from 'react';
import { shallow } from 'enzyme';
import Book from '../Book';

const props = {
  book: {
    title: 'My Book',
    author: 'Me',
    imageURL: 'https://www.mmm.png',
    subject: 'Fiction',
    description: 'A nice novel',
    quantity: 1,
    upvotes: 33,
    downvotes: 1,
    bookReviews: [],
    favCount: 3,
    borrowCount: 1,
  },
};
const wrapper = shallow(<Book book = { props }/>);
describe('<Book/>', () => {
  it('renders with the book properties', () => {
    expect(wrapper.containsMatchingElement(<img src = { book.imageURL }
        className="responsive-img" />)).toEqual(true);
  });
}); */
