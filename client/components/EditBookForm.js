import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import FileInput from './FileInput';
import validate from '../helpers/validations/book';
import { renderDropdownList } from '../components/InputText';
import { subjects } from '../components/BookForm';

class EditBookForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    const { book, index } = this.props;
    const {
      author, subject, description, imageURL, title, quantity,
    } = values;
    this.props.editBook(book.id, index, {
      author, subject: subject.value, description, imageURL, title, quantity,
    });
  }

  render() {
    const { handleSubmit, isEditing } = this.props;

    return (
            <form onSubmit = { handleSubmit(this.submitForm) } >
                <div className="center-align lighten-2">
                   <h4 className="modal-header-text">Edit Book</h4>
                    { isEditing &&
                        <div className="row"><p className="center sign-up-success"> Updating book...</p></div>
                    }
                </div>
                <div>
                <div className="row">
                    <div className="input-field">
                        <label className="active">Book Title</label>
                        <Field name="title" type="text" component='input' />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <label className="active">Author</label>
                        <Field name="author" type="text" component='input'/>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <label className="active">Subject</label>
                        <Field name="subject" component={renderDropdownList} valueField="value" textField="subject" data= {subjects} />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <label className="active">Book Description</label>
                        <Field name="description" type="text" component="input"/>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <label className="active">Quantity</label>
                        <Field name="quantity" type="number" component="input"/>
                    </div>
                </div>
                <div className="row">
          <div className="input-field">
            <Field name="imageURL" component={FileInput} multiple={false} accept="image/*" id="upload"
              dropzoneOnDrop={this.handleDrop} label="Image URL" />
          </div>
        </div>
                <br />
                <div className="row">
                    <div className="col s12 center-align">
                        <button className="btn waves-effect primary-button waves-light" type="submit" disabled = { isEditing }>Submit
                        { isEditing ?
                            <i className="fa fa-spinner fa-spin" />
                            : <i className="material-icons right">send</i>
                        }
                        </button>
                    </div>
                </div>
            </div>
            </form>
    );
  }
}

const editBookForm = reduxForm({
  form: 'editBook',
  enableReinitialize: true,
  validate,
})(EditBookForm);

export default connect(({ books }, ownProps) => (
  {
    book: books.books[ownProps.index],
    initialValues: books.books[ownProps.index],
  }))(editBookForm);
