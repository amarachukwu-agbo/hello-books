import React from 'react';
import propTypes from 'prop-types';

/**
 * @description stateless component form for rendering return requests
 *
 * @param {func} acceptReturnRequest - accepts a return request
 * @param {boolean} isHandlingReturnRequest
 * @param {array} returnRequests
 * @param {func} declineReturnRequest - declines a return request
 *
 * @returns {Node} - react node containing the requests
 */
const AdminReturnRequests = ({
  acceptReturnRequest,
  declineReturnRequest,
  returnRequests,
}) => {
  if (!returnRequests) {
    return (
        <div className="row center">
          <p className="grey-text">You have no return requests </p>
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
              <th>Request Date</th>
              <th>Status</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {returnRequests.map((request, index) =>
              <tr key={index}>
                <td> {`${request.userReturnRequests.firstName}
                ${request.userReturnRequests.lastName}`} </td>
                <td> {request.returnRequests.title} </td>
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
                  disabled={request.status !== 'Pending' ||
                  isHandlingReturnRequest }
                  onClick={() => {
                    acceptReturnRequest(
                      request.userId,
                      request.bookId,
                      index,
                    );
                  }
                  }
                >Accept</button></td>
                <td> <button className="btn btn-wave action-button
                  waves-effect btn-small"
                  disabled={request.status !== 'Pending' ||
                  isHandlingReturnRequest }
                  onClick={() => {
                    declineReturnRequest(
                      request.userId,
                      request.bookId,
                      index,
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
AdminReturnRequests.propTypes = {
  acceptReturnRequest: propTypes.func.isRequired,
  declineReturnRequest: propTypes.func.isRequired,
  returnRequests: propTypes.array.isRequired,
  isHandlingReturnRequest: propTypes.bool,
};

export default AdminReturnRequests;

