import React from 'react';

const ReturnRequests = (props) => {
  const { books } = props;
  if (!books.length) {
    return (
        <div className="row center">
            <p className="grey-text">You have no pending return requests </p>
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
                            <td> { book.returnRequests.title } </td>
                            <td> { book.returnRequests.author } </td>
                            <td> { book.createdAt.split('T')[0] } </td>
                            <td> <button className="btn-flat btn-small">{ book.status } </button></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
  );
};

export default ReturnRequests;
