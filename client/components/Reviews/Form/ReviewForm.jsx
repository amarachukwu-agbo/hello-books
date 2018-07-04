import React from 'react';
import propTypes from 'prop-types';
import { reset, reduxForm, Field } from 'redux-form';
import { TextArea } from '../../InputText';

/**
 * @method clears form after submission
 * @param {function} dispatch
 */
const afterSubmit = (result, dispatch) => dispatch(reset('review'));

/**
 * @description - stateless form component for reviewing
 * a book
 *
 * @param {func} handleSubmit - redux form wrapper for form submit
 * function
 * @param {func} submitForm - handles submission of the form
 *
 * @returns {Node} - react node containing the ReviewForm component
 */
const ReviewForm = ({
  handleSubmit,
  submitForm,
  isReviewing,
}) => (
  <form onSubmit={handleSubmit(submitForm)} >
    <div className="books-list">
      <div className="input-field">
        <Field name="review" label="Review" type="textarea"
          placeholder="Add a review ..." component={TextArea} />
      </div>
      <div>
        <button className="btn btn-flat btn-small primary-button"
          disabled={isReviewing}>
          submit
         </button>
      </div>
    </div>
    <br />
  </form>
);

// Prop type validation
ReviewForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  submitForm: propTypes.func.isRequired,
  isReviewing: propTypes.bool,
};

export default reduxForm({
  form: 'review',
  onSubmitSuccess: afterSubmit,
})(ReviewForm);
