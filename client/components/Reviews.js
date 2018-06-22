import React, { Component } from 'react';
import ReviewForm from './ReviewForm';

class Review extends Component {
  constructor(props) {
    super(props);
    this.renderReviews = this.renderReviews.bind(this);
  }
  renderReviews() {
    const { reviews } = this.props;
    if (!reviews.length) {
      return (
        <div className="container center">
          <p> No Reviews yet.</p>
        </div>
      );
    }
    return reviews.map((review, index) => (
      <div className="grey lighten-5" key={index}>
        <strong><p className="grey-text text-darken-3"><i className="material-icons left">account_circle</i>
          {`${review.userReviews.firstName} ${review.userReviews.lastName}`}
          <span className="right"> {review.createdAt.split('T')[0]} </span>
        </p></strong>
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
          <h5 className="header center-align book-header"> {`Reviews (${this.props.reviews.length})`}</h5>
        </div>
        <div className="row z-depth-1">
          {this.props.isAuthenticated &&
            <div className="section">
              <div><ReviewForm {...this.props} /></div>
            </div>}
          <div className="review">
            {this.renderReviews()}
          </div>
        </div>
      </div>
    );
  }
}

export default Review;

