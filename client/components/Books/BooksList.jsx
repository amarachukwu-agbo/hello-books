import React from 'react';
import propTypes from 'prop-types';
import Book from './Book.jsx';

/**
 * @description stateless component for rendering books
 *
 * @param {object} props - properties of the component
 * @returns {Node} - react node containing the pagination Component
 */

const BooksList = (props) => {
  const { books } = props;
  if (!books.length) {
    return (
      <div className="row center">
        <h3 className="red-text flow-text">
          Oops! Seems no books are available at the moment </h3>
      </div>
    );
  }

  return (
    <div className="row">
      {
        books.map((book, index) =>
          <Book key={index} book={book} />)
      }
    </div>
  );
};

// Prop type validation
BooksList.propTypes = {
  books: propTypes.array.isRequired,
};

export default BooksList;
