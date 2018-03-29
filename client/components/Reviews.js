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
                <div className = "container center">
                   <p> No Reviews yet.</p>
                </div>
      );
    }
    return reviews.map((review, index) => (
                    <div className="card-panel grey lighten-5" key = { index }>
                            <h6 className="blue-text text-darken-2"><i className="material-icons prefix">account_circle</i>
                              { `${review.userReviews.firstName} ${review.userReviews.lastName}` }
                              <span className="right"> { review.createdAt.split('T')[0] } </span>
                            </h6>
                            <span className="bold">
                                { review.review }
                            </span>
                    </div>
    ));
  }
  render() {
    return (
          <div className="row z-depth-1">
            <div className="row">
                <h5 className="header center-align book-header"> { `Reviews (${this.props.reviews.length})` }</h5>
            </div>
            <div className="review">
              { this.renderReviews() }
            </div>
            { this.props.isAuthenticated &&
            <div className="container">
                <div><ReviewForm { ...this.props }/></div>
            </div> }
          </div>
    );
  }
}

export default Review;

