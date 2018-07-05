import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import PreLoader from '../Common/Preloader.jsx';
import { getReturnRequests, handleReturnRequest } from
  '../../actions/returnrequests';
import AdminReturnRequests from './AdminReturnRequests.jsx';
import Pagination from '../Common/Pagination.jsx';

/**
 * @description - container component for AdminReturnRequests
 *
 * @class AdminReturnRequestsPage
 *
 * @extends {React.Component}
 */
class AdminReturnRequestsPage extends Component {
  constructor(props) {
    super(props);
    this.acceptReturnRequest = this.acceptReturnRequest.bind(this);
    this.declineReturnRequest = this.declineReturnRequest.bind(this);
  }

  /**
   * @method acceptReturnRequest
   * @description handles accepting of a return request
   *
   * @param {Number} bookId - book's id
   * @param {Number} userId - user's id
   * @param {Number} requestIndex - request's index in the books array
   *
   * @returns {void}
   */
  acceptReturnRequest(userId, bookId, requestIndex) {
    this.props.handleReturnRequest(
      { status: 'Accepted' },
      userId,
      bookId,
      requestIndex,
    );
  }

  /**
   * @method declineBorrowRequest
   * @description handles declining of a borrow request
   *
   * @param {Number} bookId - book's id
   * @param {Number} userId - user's id
   * @param {Number} requestIndex - request's index in the books array
   *
   * @returns {void}
   */
  declineReturnRequest(userId, bookId, requestIndex) {
    this.props.handleReturnRequest(
      { status: 'Declined' },
      userId,
      bookId,
      requestIndex,
    );
  }

  /**
   * @method componentDidMount
   * @description get return requests on page 1
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.getReturnRequests(1);
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
          <div className="container">
            <h4 className="flow-text red-text">
              {`Oops! Couldn't fetch return requests.
              ${this.props.returnRequestsError}`}
            </h4>
          </div>
        </div>
      );
    }
    return (
      <div className="row wrapper">
        <h5 className="center book-header">Return Requests</h5>
        <div className="admin">
          {this.props.returnRequests &&
            <div>
            <AdminReturnRequests returnRequests={this.props.returnRequests}
            isHandlingReturnRequest = { this.props.isHandlingReturnRequest }
            acceptReturnRequest = { this.acceptReturnRequest }
            declineReturnRequest = { this.declineReturnRequest }
              {...this.props} />
              <Pagination onPageChange = {page =>
                this.props.getReturnRequests(page) }
                pagination = { this.props.pagination }
              />
            </div>
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

// Prop type validation
AdminReturnRequestsPage.propTypes = {
  handleReturnRequest: propTypes.func.isRequired,
  getReturnRequests: propTypes.func.isRequired,
  returnRequests: propTypes.array,
  pagination: propTypes.object,
  returnRequestsError: propTypes.string,
  isFetchingReturnRequests: propTypes.bool,
};

/**
 * @description maps state to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to state
 */
const mapStateToProps = state => ({
  ...state.returnRequests,
});

/**
 * @description maps dispatch to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to dispatch actions
 */
const mapDispatchToProps = dispatch => ({
  getReturnRequests: (page) => { dispatch(getReturnRequests(page)); },
  handleReturnRequest: (action, userId, bookId, requestIndex) => {
    dispatch(handleReturnRequest(action, userId, bookId, requestIndex));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminReturnRequestsPage);
