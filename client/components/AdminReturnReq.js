import React, { Component } from 'react';

class AdminReturnReq extends Component {
  constructor(props) {
    super(props);
    this.acceptReturnRequest = this.acceptReturnRequest.bind(this);
    this.declineReturnRequest = this.declineReturnRequest.bind(this);
  }
  acceptReturnRequest(userId, bookId, requestIndex) {
    const { handleReturnRequest } = this.props;
    handleReturnRequest({ status: 'Accepted' }, userId, bookId, requestIndex);
  }

  declineReturnRequest(userId, bookId, requestIndex) {
    const { handleReturnRequest } = this.props;
    handleReturnRequest({ status: 'Declined' }, userId, bookId, requestIndex);
  }
  render() {
    const { returnRequests } = this.props;
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
                <td> {`${request.userReturnRequests.firstName} ${request.userReturnRequests.lastName}`} </td>
                <td> {request.returnRequests.title} </td>
                <td> {request.createdAt.split('T')[0]} </td>
                <td>
                  <span className={request.status === 'Accepted' ? 'green-text'
                    : request.status === 'Declined' ? 'red-text'
                      : 'orange-text'}>
                    &#9679; </span>
                  {request.status}
                </td>
                <td> <button className="btn btn-wave waves-effect btn-small primary-button"
                  disabled={request.status !== 'Pending'}
                  onClick={() => {
                    this.acceptReturnRequest(
                      request.userId,
                      request.bookId,
                      index,
                    );
                  }
                  }
                >Accept</button></td>
                <td> <button className="btn btn-wave action-button waves-effect btn-small"
                  disabled={request.status !== 'Pending'}
                  onClick={() => {
                    this.declineReturnRequest(
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
  }
}

export default AdminReturnReq;
