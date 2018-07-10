import React from 'react';
import renderer from 'react-test-renderer';
import Book from '../../components/Books/Book';

const props = {
  book: {
    title: 'Magnolia Table: A Collection of Recipes for Gathering',
    author: 'Joanna Gaines',
    description: 'Book for test',
    subject: 'Recipe',
    imageURL: 'https://images-na.3,200_.jpg',
    quantity: 6,
    favCount: 2,
    upvotes: 1,
    downvotes: 2,
    bookReviews: [
      {
        id: 3,
        review: 'I love it',
        createdAt: '2018-06-27T12:18:05.917Z',
        updatedAt: '2018-06-27T12:18:05.917Z',
        userId: 12,
        bookId: 98,
        userReviews: {
          id: 12,
          firstName: 'Amarachi',
          lastName: 'Agbo',
          email: 'amarachukwu.agbo@gmail.com',
          role: 'User',
          imageURL: null,
          createdAt: '2018-06-27T12:01:52.036Z',
          updatedAt: '2018-06-27T12:01:52.036Z',
        },
      },
    ],
  },
};
describe('<Book>', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Book { ...props }/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
