import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import validate from '../helpers/validations/book';
import { InputText, renderDropdownList } from '../components/InputText';

export const subjects = [{ subject: 'Fiction', value: 'Fiction' }, { subject: 'Romance', value: 'Romance' }, { subject: 'Educational', value: 'Educational' },
  { subject: 'Biography', value: 'Biography' }, { subject: 'Crime', value: 'Crime' }, { subject: 'Self-help', value: 'Self-help' },
  { subject: 'Thriller', value: 'Thriller' }, { subject: 'Science Fiction', value: 'Science Fiction' }, { subject: 'Legends and Myths', value: 'Legends and Myths' },
  { subject: 'History', value: 'History' }];

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    this.props.addBook({ ...values, subject: values.subject.value });
    this.refs.bookForm.reset();
  }

  render() {
    const { handleSubmit, isAdding } = this.props;

    return (
            <form ref ="bookForm" onSubmit = { handleSubmit(this.submitForm) } >
                <div className="center-align lighten-2">
                    <h5>Add Book</h5>
                    { isAdding &&
                        <div className="row sign-up-success"><p className="center"> Adding book...</p></div>
                    }
                </div>
                <div className="row">
                    <div className="input-field">
                        <Field name="title" type="text" component={InputText} label="Book Title" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <Field name="author" type="text" component={InputText} label="Author" />
                    </div>
                </div>
                <div className="row">
                    <div className="drop-down right">
                        <label>Subject</label>
                        <Field name="subject" component={renderDropdownList} valueField="value" textField="subject" subjects= {subjects} />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <Field name="imageURL" type="text" component={InputText} label="Image URL" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <Field name="description" type="text" component={InputText} label="Description" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <Field name="quantity" type="number" component={InputText} label="Quantity" />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col s12 center-align">
                        <button className="btn waves-effect white teal-text darken-2 waves-light" type="submit" disabled = { isAdding }>Submit <i className="material-icons teal-text right">send</i></button>
                    </div>
                </div>
            </form>
    );
  }
}

export default reduxForm({
  form: 'book',
  validate,
})(BookForm);
