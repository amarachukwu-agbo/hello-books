import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import PreLoader from './Preloader';
import AdminReturnReq from './AdminReturnReq';

class AdminReturnRequests extends Component {
  componentDidMount() {
    this.props.getReturnRequests();
  }

  render() {
    if (this.props.isFetchingReturnRequests) {
      return (
        <div className="container">
          <div className="row center wrapper">
            <br /><br /><PreLoader /></div>
        </div>
      );
    }
    if (this.props.returnRequestsError) {
      return (
        <div className="row center wrapper">
          <br />
          <div className="container"><h4 className="flow-text red-text"> {`Oops! Couldn't fetch return requests. ${this.props.returnRequestsError}`} </h4></div>
        </div>
      );
    }
    return (
      <div className="row wrapper">
        <h5 className="center book-header">Return Requests</h5>
        <div className="admin">
          <ToastContainer />
          {this.props.returnRequests &&
            <AdminReturnReq returnRequests={this.props.returnRequests}
              {...this.props} />
          }
          {
            !this.props.returnRequests &&
            <div className="row center">
              <p className="grey-text">You have no return requests </p>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default (AdminReturnRequests);
