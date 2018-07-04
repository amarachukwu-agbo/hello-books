import React from 'react';
import propTypes from 'prop-types';

/**
 * @description stateless component for rendering a user's
 * borrow requests
 *
 * @param {object} props - properties of the component
 *
 * @returns {Node} - react node containing the BorrowRequests component
 */
const BorrowRequests = (props) => {
  const { requests } = props;
  if (!requests.length) {
    return (
      <div className="row center">
        <p className="grey-text">You have no pending borrow requests </p>
      </div>
    );
  }

  return (
    <div className="section">
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
          {requests.map((request, index) =>
            <tr key={index}>
              <td> {request.borrowRequests.title} </td>
              <td> {request.borrowRequests.author} </td>
              <td> {request.createdAt.split('T')[0]} </td>
              <td>
                <button className="btn-flat btn-small">
                  <span className={request.status === 'Pending' ?
                  'orange-text' : 'red-text'}>
                    &#9679; </span>
                  {request.status}
                </button>
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>
  );
};

// Prop types validation
BorrowRequests.propTypes = {
  requests: propTypes.array.isRequired,
};

export default BorrowRequests;
