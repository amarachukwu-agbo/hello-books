import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import propTypes from 'prop-types';
import {
  getBook,
  favoriteBook,
  upvoteBook,
  downvoteBook,
  borrowBook,
  reviewBook,
} from '../../actions/book';
import PreLoader from '../Preloader';
import BookDetails from './BookDetails.jsx';
import Review from '../Reviews/Reviews.jsx';

/** @description container class for details of a book
 *
 * @class BooksDetailsPage
 *
 * @extends {React.Component}
 */

class BookDetailsPage extends Component {
  /**
   * @method componentDidMount
   * @description fetches a book from the database
   *
   * @returns {void}
   */
  componentDidMount() {
    const bookId = parseInt(this.props.match.params.bookId, 10);
    this.props.getBook(bookId);
  }

  render() {
    if (this.props.isFetching) {
      return (
        <div className="container wrapper">
          <div className="row center" style={{ minHeight: '500px' }}>
            <br /><br /><PreLoader /></div>
        </div>
      );
    }
    if (this.props.error) {
      return (
        <div className="row center wrapper">
          <br />
          <div className="container">
            <h4 className="flow-text red-text">
                {`Oops! Couldn't fetch requested book.
                ${this.props.error}`}
            </h4>
          </div>
        </div>
      );
    }
    return (
      <div className="container wrapper">
        <ToastContainer />
        { this.props.book &&
        <BookDetails book={this.props.book} {...this.props} />
        }
        <br />
        {this.props.book &&
          <Review reviews={this.props.book.bookReviews} {...this.props} />
        }
      </div>
    );
  }
}

// Prop type validation
BookDetailsPage.propTypes = {
  getBook: propTypes.func.isRequired,
  favoriteBook: propTypes.func.isRequired,
  upvoteBook: propTypes.func.isRequired,
  downvoteBook: propTypes.func.isRequired,
  borrowBook: propTypes.func.isRequired,
  reviewBook: propTypes.func.isRequired,
  isFetching: propTypes.bool,
  error: propTypes.string,
};

/**
 * @description maps state to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to state
 */
const mapStateToProps = state => ({
  ...state.book,
  ...state.login,
});

/**
 * @description maps dispatch to props
 * @param {object} state - redux state
 *
 * @returns {object} props - props mapped to dispatch actions
 */
const mapDispatchToProps = dispatch => ({
  getBook: (bookId) => { dispatch(getBook(bookId)); },
  favoriteBook: (userId, bookId) => { dispatch(favoriteBook(userId, bookId)); },
  upvoteBook: (userId, bookId) => { dispatch(upvoteBook(userId, bookId)); },
  downvoteBook: (userId, bookId) => { dispatch(downvoteBook(userId, bookId)); },
  borrowBook: (userId, bookId, request) => {
    dispatch(borrowBook(userId, bookId, request));
  },
  reviewBook: (userId, bookId, review) => {
    dispatch(reviewBook(userId, bookId, review));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsPage);
