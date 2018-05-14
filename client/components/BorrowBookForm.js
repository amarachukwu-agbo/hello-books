import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderDateTimePicker, InputText, renderDropdownList } from '../components/InputText';
import validate from '../helpers/validations/borrowbook';

const borrowReason = [{ reason: 'Assignment', value: 'Assignment' },
  { reason: 'Research', value: 'Research' }, { reason: 'Leisure reading', value: 'Leisure reading' }];

class BorrowBookForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    console.log(values);
    const request = { ...values, reason: values.reason.value };
    this.props.borrowBook(this.props.user.id, this.props.book.id, request);
  }

  render() {
    const {
      handleSubmit, submitting, book,
    } = this.props;
    console.log(book);
    return (
            <form onSubmit = { handleSubmit(this.submitForm)}>
                <div className=" row center-align lighten-2">
                    <h5>Borrow Book</h5>
                </div>
                {
                    this.props.isBorrowing &&
                    <div className="row">
                        <p className="center sign-up-success"> Sending your borrow request... </p>
                    </div>
                }

                <div className="row">
                    <div className="input-field row">
                        <Field name="bookTitle" label="Book Title" defaultValue = { book.title } component={InputText} disabled />
                    </div>
                    <div className="input-field row">
                        <label className="active">Return Date</label>
                        <Field name="returnDate" showTime = { false }component={renderDateTimePicker} />
                    </div>
                    <div className="input-field row">
                        <Field name="comment" type = "text" label="Comment(optional...)" component={InputText} />
                    </div>
                    <div className="input-field row">
                        <label className="active">Reason for borrow</label>
                        <Field name="reason" component={renderDropdownList} data = { borrowReason } textField = "reason" valueField = "value"/>
                    </div>
                </div><br/>

                <div className="row">
                    <div className="col s12 center-align">
                        <button className="btn waves-effect waves-light blue" type="submit" disabled={submitting} >Submit <i className="material-icons right">send</i></button>
                    </div>
                </div>
            </form>

    );
  }
}

const borrowBookForm = reduxForm({
  form: 'borrowBook',
  validate,
})(BorrowBookForm);

export default borrowBookForm;
