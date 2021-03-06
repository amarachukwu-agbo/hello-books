import React from 'react';
import { reduxForm, Field } from 'redux-form';
import propTypes from 'prop-types';
import DropzoneInput from '../../Common/DropzoneInput.jsx';
import validate from '../../../helpers/validations/book';
import { InputText, renderDropdownList } from '../../Common/InputTypes.jsx';
import subjects from '../../../helpers/categories';

/**
 * @description stateless component form for adding books
 *
 * @param {func} handleSubmit - reduxForm wrapper for form submission
 * @param {boolean} isAdding
 * @param {func} submitForm - handles form submission
 * @param {string} uploadedFile - image uploaded to cloudinary
 * @param {string} uploadError - error while uploading image
 * @param {string} uploadedFileCloudinaryUrl - URL of uploadaded image
 * @param {func} handleDrop - handles drag and drop of images
 *
 * @returns {Node} - react node containing the book form
 */
const BookForm = ({
  handleSubmit,
  isAdding,
  submitForm,
  uploadedFile,
  uploadError,
  uploadedFileCloudinaryUrl,
  isUploadingImage,
  handleDrop,
}) => (
      <form id="add-book-form" onSubmit={handleSubmit(submitForm)} >
        <div className="center-align lighten-2">
          <h5 className="modal-header-text">Add Book</h5>
        </div>
        <div className="row">
          <div className="input-field">
            <Field name="title" type="text" id="title"
              component={InputText} label="Book Title" />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <Field name="author" type="text" id="author"
              component={InputText} label="Author" />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <label>Subject</label>
            <Field name="subject" component={renderDropdownList} id="subject"
              valueField="value" textField="subject" data={subjects} />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <Field name="description" type="text" component={InputText}
              id="description"
              label="Description" />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <Field name="quantity" type="number"
              id="quantity"
              component={InputText} label="Quantity" />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <Field name="imageURL" component={DropzoneInput}
              multiple={false} accept="image/*" id="upload"
              dropzoneOnDrop={handleDrop} label="Image URL" />
          </div>
        </div>
        <div>
          { uploadedFileCloudinaryUrl &&
            <div className="img-upload">
              <img src={ uploadedFileCloudinaryUrl } />
                { uploadedFile &&
                  <p>{ uploadedFile.name }</p>
                }
            </div>
          }
          {
            isUploadingImage &&
            <div className="row center" id="spinner">
              <span>
                <i className="fa fa-spinner fa-spin" />
              </span>
            </div>
          }
          { uploadError &&
            <div className="img-upload" id="upload-error">
              <p className="red-text"> { uploadError } </p>
            </div>
          }
        </div>
        <br />
        <div className="row">
          <div className="col s12 center-align">
            <button className="btn waves-effect primary-button
              darken-2 waves-light" type="submit" disabled={isAdding}>Submit
            {isAdding ?
                <i className="fa fa-spinner fa-spin" />
                : <i className="material-icons right">send</i>
              }
            </button>
          </div>
        </div>
      </form>
);

// Prop type validation
BookForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  isAdding: propTypes.bool,
  submitForm: propTypes.func.isRequired,
  uploadedFile: propTypes.object,
  uploadError: propTypes.string,
  uploadedFileCloudinaryUrl: propTypes.string,
  handleDrop: propTypes.func.isRequired,
  isUploadingImage: propTypes.bool,
};

// Redux Form wrapper
export default reduxForm({
  form: 'book',
  validate,
})(BookForm);
