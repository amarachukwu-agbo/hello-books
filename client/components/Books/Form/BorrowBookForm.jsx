import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  renderDatePicker,
  InputText,
  renderDropdownList,
} from '../../Common/InputTypes.jsx';
import validate from '../../../helpers/validations/borrowbook';

// Data for reason dropdown input field
const borrowReason = [
  { reason: 'Assignment', value: 'Assignment' },
  { reason: 'Research', value: 'Research' },
  { reason: 'Leisure reading', value: 'Leisure reading' },
];

/**
 * @description - container component for borrowing a book
 *
 * @class BorrowBookForm
 *
 * @extends {React.Component}
 */
class BorrowBookForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  /**
   * @method submitForm
   * @description handles form submission
   * @param {object} values - form values to be submitted
   *
   * @returns {void}
   */
  submitForm(values) {
    const request = { ...values, reason: values.reason.value };
    this.props.borrowBook(this.props.user.id, this.props.book, request);
  }

  render() {
    const {
      handleSubmit, book,
    } = this.props;

    return (
      <form id="borrow-book" onSubmit={handleSubmit(this.submitForm)}>
        <div className="row center-align lighten-2">
          <h4 className="modal-header-text">Borrow Book</h4>
        </div>
        <div className="row">
          <div className="input-field row">
            <Field name="bookTitle" label="Book Title"
            defaultValue={book.title} component={InputText} disabled />
          </div>
          <div className="input-field row">
            <Field name="returnDate"
            id="return-date"
            label="Return Date"
            component={renderDatePicker} />
          </div>
          <div className="input-field row">
            <Field name="comments" type="text"
            id="comment"
            label="Comment(optional...)" component={InputText} />
          </div>
          <div className="input-field row">
            <label className="active">Reason for borrow</label>
            <Field name="reason" component={renderDropdownList}
            data={borrowReason} textField="reason" valueField="value" />
          </div>
        </div><br />

        <div className="row">
          <div className="col s12 center-align">
            <button className="btn waves-effect waves-light
            primary-button" type="submit"
            id="submit-borrow"
            disabled={this.props.isBorrowing} >
              Submit
                {
                  this.props.isBorrowing ?
                    <i className="fa fa-spinner fa-spin" />
                    : <i className="material-icons right">send</i>
                }
            </button>
          </div>
        </div>
      </form>

    );
  }
}

// Prop type validation
BorrowBookForm.propTypes = {
  borrowBook: propTypes.func.isRequired,
  book: propTypes.object.isRequired,
  handleSubmit: propTypes.func.isRequired,
  isBorrowing: propTypes.bool,
  user: propTypes.object,
};

// Wrap form with reduxForm wrapper
const borrowBookForm = reduxForm({
  form: 'borrowBook',
  validate,
})(BorrowBookForm);

export default borrowBookForm;
