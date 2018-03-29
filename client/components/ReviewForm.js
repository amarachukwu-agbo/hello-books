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
            <form onSubmit={ handleSubmit(this.submitForm) } >
                <div className="row">
                    <div className="input-field col s8">
                        <Field name="review" label="Review" type="textarea" component={ TextArea }/>
                    </div>
                    <div className="input-field col s4">
                        <button className="btn btn-flat btn-small teal" disabled= { this.props.isReviewing }>
                            <i className="material-icons white-text">comment</i>
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
