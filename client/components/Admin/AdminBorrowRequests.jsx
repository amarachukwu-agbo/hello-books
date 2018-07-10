import React from 'react';
import propTypes from 'prop-types';

/**
 * @description stateless component form for rendering borrow requests
 *
 * @param {func} acceptBorrowRequest - accepts a borrow request
 * @param {boolean} isHandlingBorrowRequest
 * @param {array} borrowRequests
 * @param {func} declineBorrowRequest - declines a borrow request
 *
 * @returns {Node} - react node containing the requests
 */
const AdminBorrowRequests = ({
  acceptBorrowRequest,
  declineBorrowRequest,
  borrowRequests,
  isHandlingBorrowRequest,
}) => {
  if (!borrowRequests.length) {
    return (
        <div className="row center">
          <p className="grey-text">You have no borrow requests</p>
        </div>
    );
  }

  return (
      <div className="row">
        <table className="striped responsive-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Book Title</th>
              <th>Reason</th>
              <th>Return Date</th>
              <th>Comments</th>
              <th>Request Date</th>
              <th>Status</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowRequests.map(request =>
              <tr key={request.id}>
                <td> {`${request.userBorrowRequests.firstName} 
                ${request.userBorrowRequests.lastName}`} </td>
                <td> {request.borrowRequests.title} </td>
                <td> {request.reason} </td>
                <td> {request.returnDate.split('T')[0]} </td>
                <td> {request.comments || 'Nil'} </td>
                <td> {request.createdAt.split('T')[0]} </td>
                <td>
                  <span className={request.status === 'Accepted' ? 'green-text'
                    : request.status === 'Declined' ? 'red-text'
                      : 'orange-text'}>
                    &#9679; </span>
                  {request.status}
                </td>
                <td> <button className="btn btn-wave waves-effect
                  btn-small primary-button"
                  id={`accept-button${request.id}`}
                  disabled={request.status !== 'Pending' ||
                  isHandlingBorrowRequest}
                  onClick={() => {
                    acceptBorrowRequest(
                      request.userId,
                      request.borrowRequests.id,
                      request.id,
                    );
                  }
                  }
                >Accept</button></td>
                <td> <button className="btn btn-wave action-button
                  waves-effect btn-small"
                  id={`decline-button${request.id}`}
                  disabled={request.status !== 'Pending' ||
                  isHandlingBorrowRequest}
                  onClick={() => {
                    declineBorrowRequest(
                      request.userId,
                      request.borrowRequests.id,
                      request.id,
                    );
                  }
                  }
                >Decline</button></td>
              </tr>)}
          </tbody>
        </table>
      </div>
  );
};

// Validates prop types
AdminBorrowRequests.propTypes = {
  acceptBorrowRequest: propTypes.func.isRequired,
  declineBorrowRequest: propTypes.func.isRequired,
  borrowRequests: propTypes.array.isRequired,
  isHandlingBorrowRequest: propTypes.bool,
};

export default AdminBorrowRequests;
