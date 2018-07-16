import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import oopsImage from '../../public/images/oops.jpg';
import {
  getBook,
  favoriteBook,
  upvoteBook,
  downvoteBook,
  borrowBook,
  reviewBook,
} from '../../actions/book';
import PreLoader from '../Common/Preloader.jsx';
import BookDetails from './BookDetails.jsx';
import Reviews from '../Reviews/Reviews.jsx';

/** @description container class for details of a book
 *
 * @class BooksDetailsPage
 *
 * @extends {React.Component}
 */

export class BookDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.renderError = this.renderError.bind(this);
    this.renderPreLoader = this.renderPreLoader.bind(this);
  }
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

  /**
   * @memberof BookDetailsPage
   * @method renderPreLoader
   * @description renders loader while book is being fetched
   *
   * @returns {Node} react node containing Preloader component
   */
  renderPreLoader() {
    if (this.props.isFetching) {
      return (
        <div className="container wrapper">
          <div className="row center" style={{ minHeight: '500px' }}>
            <br /><br /><PreLoader /></div>
        </div>
      );
    }
  }

  /**
   * @memberof BookDetailsPage
   * @method renderError
   * @description renders error that occurs while fetching a book
   *
   * @returns {Node} react node containing error
   */
  renderError() {
    if (this.props.getBookError) {
      return (
        <div className="row center wrapper">
          <br />
          <div className="container" id="not-found-book">
            <img className="oops-image" src={oopsImage} />
            <h5 className="flow-text grey-text
              text-darken-3">
                {`The book you requested could not be retrieved.${
                  this.props.getBookError}`}
            </h5>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container wrapper">
        { this.renderPreLoader() }
        { this.renderError() }
        { this.props.book &&
        <div id="book-details">
          <BookDetails book={this.props.book} {...this.props} />
          <br />
          <Reviews reviews={this.props.book.bookReviews} {...this.props} />
        </div>
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
  getBookError: propTypes.string,
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


const actionCreators = {
  getBook,
  favoriteBook,
  upvoteBook,
  downvoteBook,
  borrowBook,
  reviewBook,
};

export default connect(mapStateToProps, actionCreators)(BookDetailsPage);
