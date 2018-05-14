import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className="row">
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
                    { books.map((book, index) =>
                        <tr key={ index }>
                            <td>{ book.borrowedBooks.title }</td>
                            <td> { book.createdAt.split('T')[0] } </td>
                            <td> { book.status } </td>
                            <td> { book.status === 'Returned' ? book.updatedAt.split('T')[0] : '' } </td>
                            { book.status !== 'Returned' &&
                            !returnRequests.find(request =>
                                request.bookId === book.bookId) &&
                            <td><button onClick = { returnBook.bind(null, user.id, book.bookId) }
                            className = "btn btn-small btn-wave waves-effect red"
                            disabled = { isSendingRequest } >Return</button></td>
                            }
                        </tr>)}
                </tbody>
            </table>
        </div>
  );
};

export default BorrowedBooks;
