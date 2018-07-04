import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import FileInput from '../../FileInput';
import validate from '../../../helpers/validations/book';
import { renderDropdownList } from '../../InputText';
import { subjects } from './AddBookForm.jsx';

/**
 * @description - representational class component for editing a book
 *
 * @class EditBookForm
 *
 * @extends {React.Component}
 */
class EditBookForm extends Component {
  /**
   * @constructor create an instance of the component
   *
   * @param {object} props properties for the component
   */
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  /**
   * @memberOf EditBookForm
   * @method submitForm
   * @description handles form submission
   *
   * @param {object} values - form values to be submitted
   *
   * @returns {void}
   */
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
      <form onSubmit={handleSubmit(this.submitForm)} >
        <div className="center-align lighten-2">
          <h4 className="modal-header-text">Edit Book</h4>
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
              <Field name="author" type="text" component='input' />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <label className="active">Subject</label>
              <Field name="subject" component={renderDropdownList}
              valueField="value" textField="subject" data={subjects} />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <label className="active">Book Description</label>
              <Field name="description" type="text" component="input" />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <label className="active">Quantity</label>
              <Field name="quantity" type="number" component="input" />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <Field name="imageURL" component={FileInput}
                multiple={false} accept="image/*" id="upload"
                dropzoneOnDrop={this.handleDrop} label="Image URL" />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col s12 center-align">
              <button className="btn waves-effect
              primary-button waves-light" type="submit"
              disabled={isEditing}>Submit
                        {isEditing ?
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

// Prop type validation
EditBookForm.propTypes = {
  book: propTypes.object,
  index: propTypes.number,
  editBook: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  isEditing: propTypes.bool,
};

// Connect form to store to get initial values of the book to be edited
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
