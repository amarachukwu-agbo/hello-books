import React, { Component } from 'react';
import PreLoader from './Preloader';
import AdminBorrowReq from './AdminBorrowReq';

class AdminBorrowRequests extends Component {
  componentDidMount() {
    this.props.getBorrowRequests();
  }

  render() {
    if (this.props.isFetchingBorrowRequests) {
      return (
                <div className="container">
                    <div className="row center" style={{ minHeight: '500px' }}>
                    <br/><br/><PreLoader /></div>
                </div>
      );
    }
    if (this.props.borrowRequestsError) {
      return (
                <div className="row center" style={{ minHeight: '500px' }}>
                   <br/>
                   <div className="container"><h4 className="flow-text red-text"> {`Oops! Couldn't fetch borrow requests. ${this.props.borrowRequestsError}`} </h4></div>
                </div>
      );
    }
    return (
            <div>
                <h4 className="center">Borrow Requests</h4>
                <div className="divider"></div>
                <div className="review">
                    { this.props.borrowRequests &&
                    <AdminBorrowReq borrowRequests = { this.props.borrowRequests }
                    { ...this.props }/>
                    }
                </div>
            </div>
    );
  }
}

export default (AdminBorrowRequests);
