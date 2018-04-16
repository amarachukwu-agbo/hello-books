import React, { Component } from 'react';
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
                    <div className="row center" style={{ minHeight: '500px' }}>
                    <br/><br/><PreLoader /></div>
                </div>
      );
    }
    if (this.props.returnRequestsError) {
      return (
                <div className="row center" style={{ minHeight: '500px' }}>
                   <br/>
                   <div className="container"><h4 className="flow-text red-text"> {`Oops! Couldn't fetch return requests. ${this.props.returnRequestsError}`} </h4></div>
                </div>
      );
    }
    return (
            <div>
                <h4 className="center">Return Requests</h4>
                <div className="divider"></div>
                <div className="review">
                    { this.props.returnRequests &&
                    <AdminReturnReq returnRequests = { this.props.returnRequests }
                    { ...this.props }/>
                    }
                </div>
            </div>
    );
  }
}

export default (AdminReturnRequests);
