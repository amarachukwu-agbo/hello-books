import React, { Component } from 'react';
import propTypes from 'prop-types';
import ReviewForm from './Form/ReviewForm.jsx';
import Notify from '../../helpers/Notify';


/** @description container class for reviews and ReviewForm
 *
 * @class Reviews
 *
 * @extends {React.Component}
 */

class Reviews extends Component {
  /**
   * @constructor create an instance of the component
   *
   * @param {object} props properties for the component
   */
  constructor(props) {
    super(props);
    this.renderReviews = this.renderReviews.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  /**
   * @memberof Reviews
   * @method submitForm
   * @description handles submission of review form
   * @param {object} values - form values for submission
   *
   * @returns {void}
   */
  submitForm(values) {
    const { book } = this.props;
    if (values.review && values.review.trim() !== '') {
      this.props.reviewBook(book.id, values);
    } else {
      Notify.notifyError('Review must not be empty');
    }
  }

  /**
   * @memberof Reviews
   * @method renderReviews
   * @description renders the reviews
   *
   * @returns {Node} react node containing reviews
   */
  renderReviews() {
    const { reviews } = this.props;
    if (!reviews.length) {
      return (
        <div className="container center">
          <p>No Reviews yet.</p>
        </div>
      );
    }
    return reviews.map(review => (
      <div className="review-box grey lighten-5" key={review.id}>
        <strong>
          <p className="grey-text text-darken-3">
          <i className="material-icons left">account_circle</i>
          {`${review.userReviews.firstName} ${review.userReviews.lastName}`}
          <span className="right"> {review.createdAt.split('T')[0]} </span>
          </p>
        </strong>
        <span className="bold">
          {review.review}
        </span>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <div className="row">
          <h5 className="header center-align book-header">
            {`Reviews (${this.props.reviews.length})`}
          </h5>
        </div>
        <div className="row z-depth-1">
          {this.props.isAuthenticated &&
            <div className="section">
              <div>
                <ReviewForm submitForm = { this.submitForm }
                  isReviewing = { this.props.isReviewing } />
              </div>
            </div>}
          <div className="review">
            {this.renderReviews()}
          </div>
        </div>
      </div>
    );
  }
}

// Prop type validation
Reviews.propTypes = {
  reviews: propTypes.array,
  isAuthenticated: propTypes.bool,
  isReviewing: propTypes.bool,
  reviewBook: propTypes.func.isRequired,
  book: propTypes.object.isRequired,
};

export default Reviews;

