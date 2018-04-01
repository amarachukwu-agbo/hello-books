import React from 'react';
import { Link } from 'react-router-dom';

const BorrowedBooks = (props) => {
  const { books } = props;
  if (!books.length) {
    return (
        <div className="row center">
            <p className="grey-text">You have no borrowed books </p>
        </div>
    );
  }

  return (
        <div className="row">
            <table class="striped responsive-table">
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
                            <td><Link to= {`/books/${book.bookId}`}> { book.borrowedBooks.title } </Link></td>
                            <td> { book.createdAt.split('T')[0] } </td>
                            <td> { book.status } </td>
                            <td> { book.updatedAt.split('T')[0] || '--' } </td>
                            { book.status !== 'Returned' &&
                            <td><button>Return</button></td>
                            }
                        </tr>)}
                </tbody>
            </table>
        </div>
  );
};

export default BorrowedBooks;
