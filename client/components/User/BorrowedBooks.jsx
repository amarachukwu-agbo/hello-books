import React from 'react';
import propTypes from 'prop-types';
/**
 * @description stateless component for rendering books borrowed
 * by a user
 *
 * @param {object} props - properties of the component
 *
 * @returns {Node} - react node containing the BorrowedBooks component
 */
const BorrowedBooks = (props) => {
  const {
    books, returnBook, user, isSendingRequest, returnRequests,
  } = props;

  if (!books.length) {
    return (
      <div className="row center">
        <p className="grey-text">You have no borrowed books </p>
      </div>
    );
  }

  return (
    <div className="section">
      <table className="striped responsive-table">
        <thead>
          <tr>
            <th>Book</th>
            <th>Date Borrowed</th>
            <th>Status</th>
            <th>Date Returned</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book =>
            <tr key={book.id}>
              <td>{book.borrowedBooks.title}</td>
              <td> {book.createdAt.split('T')[0]} </td>
              <td> {book.status} </td>
              <td> {book.status === 'Returned' ?
                book.updatedAt.split('T')[0] : ''} </td>
              {book.status !== 'Returned' &&
                !returnRequests.find(request =>
                  request.bookId === book.bookId) &&
                <td><button onClick={() => returnBook(user.id, book.bookId)}
                  className="btn btn-small btn-wave waves-effect primary-button"
                  disabled={isSendingRequest} >Return</button></td>
              }
            </tr>)}
        </tbody>
      </table>
    </div>
  );
};

// Prop type validation
BorrowedBooks.propTypes = {
  books: propTypes.array.isRequired,
  returnBook: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  isSendingRequest: propTypes.bool,
  returnRequests: propTypes.array.isRequired,
};

export default BorrowedBooks;
