import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import request from 'superagent';
import DropzoneInput from '../../Common/DropzoneInput.jsx';
import validate from '../../../helpers/validations/book';
import { InputText, renderDropdownList } from '../../Common/InputTypes.jsx';
import { subjects } from './AddBookForm.jsx';
import {
  cloudinaryURL,
  uploadPreset,
} from '../../../helpers/cloudinary';

/**
 * @description - representational class component for editing a book
 *
 * @class EditBookForm
 *
 * @extends {React.Component}
 */
class EditBookForm extends Component {
  defaultState = {
    updatedImageUrl: '',
    uploadError: '',
    uploadedFile: null,
    isuploadingImage: false,
  };
  /**
   * @constructor create an instance of the component
   *
   * @param {object} props properties for the component
   */
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.state = this.defaultState;
  }

  /**
   * @memberof EditBookForm
   * @method handleDrop
   * @description handles drag and drop of images to be uploaded
   *
   * @param {array} selected files for upload
   *
   * @returns {void}
   */
  handleDrop(files) {
    this.setState({
      uploadedFile: files[0],
      isuploadingImage: true,
    });
    const upload = request.post(cloudinaryURL)
      .field('upload_preset', uploadPreset)
      .field('file', files[0]);

    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        this.setState({
          updatedImageUrl: response.body.secure_url,
          uploadError: '',
          isuploadingImage: false,
        });
      }
      if (err) {
        this.setState({
          uploadError: 'Error while uploading. Try again',
          isuploadingImage: false,
        });
      }
    });
  }

  /**
   * @memberof EditBookForm
   * @method submitForm
   * @description handles form submission
   *
   * @param {object} values - form values to be submitted
   *
   * @returns {void}
   */
  submitForm(values) {
    const { book } = this.props;
    const {
      author, subject, description, title, quantity,
    } = values;
    this.props.editBook(book.id, {
      author,
      subject: subject.value,
      description,
      title,
      quantity,
      imageURL: this.state.updatedImageUrl ?
        this.state.updatedImageUrl : book.imageURL,
    });
    this.setState({
      ...this.defaultState,
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
              <Field name="title" type="text" component={InputText} />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <label className="active">Author</label>
              <Field name="author" type="text" component={InputText} />
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
              <Field name="description" type="text" component={InputText} />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <label className="active">Quantity</label>
              <Field name="quantity" type="number" component={InputText} />
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <Field name="imageURL" component={DropzoneInput}
                multiple={false} accept="image/*" id="upload"
                dropzoneOnDrop={this.handleDrop} label="Image URL" />
            </div>
          </div>
          <div>
          { this.state.updatedImageUrl &&
            <div className="img-upload">
              <img src={ this.state.updatedImageUrl } />
                { this.state.uploadedFile &&
                  <p>{ this.state.uploadedFile.name }</p>
                }
            </div>
          }
          {
            this.state.isuploadingImage &&
            <div className="row center">
              <span>
                <i className="fa fa-spinner fa-spin" />
              </span>
            </div>
          }
          { this.state.uploadError &&
            <div className="img-upload">
              <p className="red-text"> { this.state.uploadError } </p>
            </div>
          }
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
