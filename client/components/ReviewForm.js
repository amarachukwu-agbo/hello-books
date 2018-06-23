import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextArea } from '../components/InputText';

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    const { user, book, reset } = this.props;
    if (values.review && values.review.trim !== '') {
      this.props.reviewBook(user.id, book.id, values);
      reset();
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitForm)} >
        <div className="books-list">
          <div className="input-field">
            <Field name="review" label="Review" type="textarea" placeholder="Add a review ..." component={TextArea} />
          </div>
          <div>
            <button className="btn btn-flat btn-small primary-button" disabled={this.props.isReviewing}>
              submit
                        </button>
          </div>
        </div>
        <br />
      </form>
    );
  }
}

export default reduxForm({
  form: 'review',
})(ReviewForm);
