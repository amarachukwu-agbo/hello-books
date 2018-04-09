import React from 'react';

const BorrowRequests = (props) => {
  const { books } = props;
  if (!books.length) {
    return (
        <div className="row center">
            <p className="grey-text">You have no pending borrow requests </p>
        </div>
    );
  }

  return (
        <div className="row">
            <table className="striped responsive-table">
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    { books.map((book, index) =>
                        <tr key={ index }>
                            <td> { book.borrowRequests.title } </td>
                            <td> { book.borrowRequests.author } </td>
                            <td> { book.createdAt.split('T')[0] } </td>
                            <td> <button className="btn-flat btn-small">{ book.status } </button></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
  );
};

export default BorrowRequests;
