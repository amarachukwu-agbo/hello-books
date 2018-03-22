import React from 'react';
import Book from './Book';

const BooksList = (props) => {
  const { books } = props;
  if (!books.length) {
    return (
        <div className="row center">
            <h3 className="red-text flow-text">Oops! Seems no books are available at the moment </h3>
        </div>
    );
  }

  return (
        <div className="row book-list">
            {
                books.map((book, index) =>
                    <Book key= { index } book= { book } />)
            }
        </div>
  );
};

export default BooksList;
