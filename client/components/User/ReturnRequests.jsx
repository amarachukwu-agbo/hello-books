import React from 'react';
import propTypes from 'prop-types';

/**
 * @description stateless component for rendering a user's
 * return requests
 *
 * @param {object} props - properties of the component
 *
 * @returns {Node} - react node containing the ReturnRequests component
 */

const ReturnRequests = (props) => {
  const { requests } = props;
  if (!requests.length) {
    return (
      <div className="row center">
        <p className="grey-text">You have no pending return requests </p>
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
          { requests.map((request, index) =>
            <tr key={index}>
              <td> {request.returnRequests.title} </td>
              <td> {request.returnRequests.author} </td>
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
ReturnRequests.propTypes = {
  requests: propTypes.array.isRequired,
};
export default ReturnRequests;
