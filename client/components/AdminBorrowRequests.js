import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
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
                    <div className="row center wrapper">
                    <br/><br/><PreLoader /></div>
                </div>
      );
    }
    if (this.props.borrowRequestsError) {
      return (
                <div className="row center wrapper">
                   <br/>
                   <div className="container"><h4 className="flow-text red-text"> {`Oops! Couldn't fetch borrow requests. ${this.props.borrowRequestsError}`} </h4></div>
                </div>
      );
    }
    return (
            <div className="row wrapper">
                <h5 className="center book-header">Borrow Requests</h5>
                <div className="admin">
                    <ToastContainer />
                    { this.props.borrowRequests &&
                    <AdminBorrowReq borrowRequests = { this.props.borrowRequests }
                    { ...this.props }/>
                    }
                    {
                      !this.props.borrowRequests &&
                        <div className="row center">
                          <p className="grey-text">You have no borrow requests </p>
                        </div>
                    }
                </div>
            </div>
    );
  }
}

export default (AdminBorrowRequests);
