import React, { Component } from 'react';

class AdminReturnReq extends Component {
  render() {
    const { returnRequests } = this.props;
    if (!returnRequests.length) {
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
                            <th>status</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { returnRequests.map((request, index) =>
                            <tr key={ index }>
                                <td> { `${request.userReturnRequests.firstName} ${request.userReturnRequests.lastName}` } </td>
                                <td> { request.returnRequests.title } </td>
                                <td> { request.createdAt.split('T')[0] } </td>
                                <td> { request.status } </td>
                                <td> <button className="btn btn-wave waves-effect btn-small red"
                                disabled = { request.status !== 'Pending' }
                                >Accept</button></td>
                                <td> <button className="btn btn-wave waves-effect btn-small red"
                                disabled = { request.status !== 'Pending' }
                                >Decline</button></td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
    );
  }
}

export default AdminReturnReq;
