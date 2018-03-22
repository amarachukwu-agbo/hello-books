import React, { Component } from 'react';

class Review extends Component {
  constructor(props) {
    super(props);
    this.renderReviews = this.renderReviews.bind(this);
  }
  renderReviews() {
    const { reviews } = this.props;
    if (!reviews.length) {
      return (
                <div className = "row center">
                   <p className="flow-text"> No Reviews yet.</p>
                </div>
      );
    }
    return reviews.map((review, index) => (
                    <div className="card-panel grey lighten-5" key = { index }>
                            <h6><i className="material-icons prefix">account_circle</i>{ review.userId }
                            <span className="right"> { review.createdAt.split('T')[0] } </span> </h6>
                            <span className="bold">
                                { review.review }
                            </span>
                    </div>
    ));
  }
  render() {
    return (
            <div>
                <h5 className="header center-align book-header">Reviews</h5>
                <div className="card-panel">
                    { this.renderReviews() };
                </div>
            </div>
    );
  }
}

export default Review;

