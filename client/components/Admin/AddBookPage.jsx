import React, { Component } from 'react';
import propTypes from 'prop-types';
import request from 'superagent/lib/client';
import { connect } from 'react-redux';
import {
  cloudinaryURL,
  uploadPreset,
} from '../../helpers/cloudinary';
import { addBook } from '../../actions/books';
import AddBookForm from './Form/AddBookForm.jsx';

/**
 * @description - container component for AddBookForm
 *
 * @class Add Book Page
 *
 * @extends {React.Component}
 */
export class AddBookPage extends Component {
  /**
   * @constructor create an instance of the component
   *
   * @param {object} props properties for the component
   */
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.state = {
      uploadedFileCloudinaryUrl: '',
      isUploadingImage: false,
    };
  }

  /**
   * @memberof AddBookPage
   * @method submitForm
   * @description handles form submission
   *
   * @param {object} values - form values to be submitted
   *
   * @returns {void}
   */
  submitForm(values) {
    const { uploadedFileCloudinaryUrl } = this.state;
    this.props.addBook({
      ...values,
      imageURL: uploadedFileCloudinaryUrl,
      subject: values.subject.value,
    });
  }

  /**
   * @memberof AddBookPage
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
      isUploadingImage: true,
    });
    const upload = request.post(cloudinaryURL)
      .field('upload_preset', uploadPreset)
      .field('file', files[0]);

    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
          uploadError: '',
          isUploadingImage: false,
        });
      }
      if (err) {
        this.setState({
          uploadError: 'Error while uploading. Try again',
          isUploadingImage: false,
        });
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col s2 m3 l4"></div>
        <div className="card-panel add-book col s8 m6 l4">
          <AddBookForm submitForm = { this.submitForm }
          uploadedFile = { this.state.uploadedFile }
          isUploadingImage = { this.state.isUploadingImage}
          uploadError = { this.state.uploadError }
          uploadedFileCloudinaryUrl =
          { this.state.uploadedFileCloudinaryUrl}
          handleDrop = {this.handleDrop}
          { ...this.props }/>
        </div>
        <div className="col s2 m3 l4"></div>
      </div>
    );
  }
}

// Prop  type validation
AddBookPage.propTypes = {
  addBook: propTypes.func.isRequired,
};

// action creators
const actionCreators = {
  addBook,
}

export default connect(
  null,
  actionCreators,
)(AddBookPage);

