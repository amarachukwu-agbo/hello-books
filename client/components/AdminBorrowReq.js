import React, { Component } from 'react';

class AdminBorrowReq extends Component {
  constructor(props) {
    super(props);
    this.acceptBorrowRequest = this.acceptBorrowRequest.bind(this);
    this.declineBorrowRequest = this.declineBorrowRequest.bind(this);
  }

  acceptBorrowRequest(userId, bookId, requestIndex) {
    const { handleBorrowRequest } = this.props;
    handleBorrowRequest({ status: 'Accepted' }, userId, bookId, requestIndex);
  }

  declineBorrowRequest(userId, bookId, requestIndex) {
    const { handleBorrowRequest } = this.props;
    handleBorrowRequest({ status: 'Declined' }, userId, bookId, requestIndex);
  }


  render() {
    const { borrowRequests, isHandlingBorrowRequest } = this.props;
    if (!borrowRequests) {
      return (
        <div className="row center">
          <p className="grey-text">You have no borrow requests </p>
        </div>
      );
    }

    return (
      <div className="row">
        <table class="striped responsive-table">
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
            {borrowRequests.map((request, index) =>
              <tr key={index}>
                <td> {`${request.userBorrowRequests.firstName} ${request.userBorrowRequests.lastName}`} </td>
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
                <td> <button className="btn btn-wave waves-effect btn-small primary-button"
                  disabled={request.status !== 'Pending' || isHandlingBorrowRequest}
                  onClick={() => {
                    this.acceptBorrowRequest(
                      request.userId,
                      request.borrowRequests.id,
                      index,
                    );
                  }
                  }
                >Accept</button></td>
                <td> <button className="btn btn-wave action-button waves-effect btn-small"
                  disabled={request.status !== 'Pending' || isHandlingBorrowRequest}
                  onClick={() => {
                    this.declineBorrowRequest(
                      request.userId,
                      request.borrowRequests.id,
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
  }
}

export default AdminBorrowReq;
