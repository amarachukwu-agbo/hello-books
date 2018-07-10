import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import PreLoader from '../Common/Preloader.jsx';
import { getBorrowRequests, handleBorrowRequest } from
  '../../actions/borrowRequests';
import AdminBorrowRequests from './AdminBorrowRequests.jsx';
import Pagination from '../Common/Pagination.jsx';

/**
 * @description - container component for AdminBorrowRequests
 *
 * @class AdminBorrowRequestsPage
 *
 * @extends {React.Component}
 */
class AdminBorrowRequestsPage extends Component {
  /**
   * @constructor create an instance of the component
   *
   * @param {object} props properties for the component
   */

  constructor(props) {
    super(props);
    this.acceptBorrowRequest = this.acceptBorrowRequest.bind(this);
    this.declineBorrowRequest = this.declineBorrowRequest.bind(this);
  }

  /**
   * @method acceptBorrowRequest
   * @description handles accepting of a borrow request
   *
   * @param {Number} bookId - book's id
   * @param {Number} userId - user's id
   * @param {Number} requestIndex - request's index in the books array
   *
   * @returns {void}
   */
  acceptBorrowRequest(userId, bookId, requestId) {
    this.props.handleBorrowRequest(
      { status: 'Accepted' },
      userId,
      bookId,
      requestId,
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
  declineBorrowRequest(userId, bookId, requestId) {
    this.props.handleBorrowRequest(
      { status: 'Declined' },
      userId,
      bookId,
      requestId,
    );
  }
  /**
   * @method componentDidMount
   * @description get borrow requests on page 1
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.getBorrowRequests(1);
  }

  render() {
    if (this.props.isFetchingBorrowRequests) {
      return (
        <div className="container">
          <div className="row center wrapper">
            <br /><br /><PreLoader /></div>
        </div>
      );
    }
    if (this.props.borrowRequestsError) {
      return (
        <div className="row center wrapper">
          <br />
          <div className="container">
            <h4 className="flow-text red-text">
            {`Oops! Couldn't fetch borrow requests.
            ${this.props.borrowRequestsError}`}
            </h4></div>
        </div>
      );
    }
    return (
      <div className="row wrapper">
        <h5 className="center book-header">Borrow Requests</h5>
        <div className="admin">
          {this.props.borrowRequests &&
            <div>
            <AdminBorrowRequests borrowRequests={this.props.borrowRequests}
            acceptBorrowRequest = { this.acceptBorrowRequest }
            declineBorrowRequest = { this.declineBorrowRequest }
              {...this.props} />
            <Pagination onPageChange = {page =>
              this.props.getBorrowRequests(page) }
              pagination = { this.props.pagination }
            />
        </div>
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

// Validates proptypes
AdminBorrowRequestsPage.propTypes = {
  handleBorrowRequest: propTypes.func.isRequired,
  getBorrowRequests: propTypes.func.isRequired,
  borrowRequests: propTypes.array,
  pagination: propTypes.object,
  borrowRequestsError: propTypes.string,
  isFetchingBorrowRequests: propTypes.bool,
};

/**
 * @description maps state to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to state
 */
const mapStateToProps = state => ({
  ...state.borrowRequests,
});

/**
 * @description maps dispatch to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to dispatch actions
 */
const mapDispatchToProps = dispatch => ({
  getBorrowRequests: (page) => { dispatch(getBorrowRequests(page)); },
  handleBorrowRequest: (action, userId, bookId, requestIndex) => {
    dispatch(handleBorrowRequest(action, userId, bookId, requestIndex));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminBorrowRequestsPage);
