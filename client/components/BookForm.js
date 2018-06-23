import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
// import dotenv from 'dotenv';
import request from 'superagent';
import FileInput from './FileInput';
import validate from '../helpers/validations/book';
import { InputText, renderDropdownList } from '../components/InputText';

// dotenv.config();

export const subjects = [{ subject: 'Fiction', value: 'Fiction' }, { subject: 'Romance', value: 'Romance' }, { subject: 'Educational', value: 'Educational' },
  { subject: 'Biography', value: 'Biography' }, { subject: 'Crime', value: 'Crime' }, { subject: 'Self-help', value: 'Self-help' },
  { subject: 'Thriller', value: 'Thriller' }, { subject: 'Science Fiction', value: 'Science Fiction' }, { subject: 'Legends and Myths', value: 'Legends and Myths' },
  { subject: 'History', value: 'History' }];

const uploadPreset = 'luddzmb5';
const cloudinaryURL = 'https://api.cloudinary.com/v1_1/ama-hello-books-v2/image/upload';
class BookForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      uploadedFileCloudinaryUrl: '',
    };
  }

  submitForm(values) {
    const { uploadedFileCloudinaryUrl } = this.state;
    this.props.addBook({
      ...values,
      imageURL: uploadedFileCloudinaryUrl,
      subject: values.subject.value,
    });
    this.refs.bookForm.reset();
    this.setState({
      uploadedFileCloudinaryURL: '',
      uploadedFile: '',
    });
  }

  handleDrop = (files) => {
    this.setState({ uploadedFile: files[0] });
    const upload = request.post(cloudinaryURL)
      .field('upload_preset', uploadPreset)
      .field('file', files[0]);

    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
        });
      }
    });
  }

  render() {
    const { handleSubmit, isAdding } = this.props;

    return (
      <form ref="bookForm" onSubmit={handleSubmit(this.submitForm)} >
        <div className="center-align lighten-2">
          <h5 className="modal-header-text">Add Book</h5>
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
          <div className="input-field">
            <label>Subject</label>
            <Field name="subject" component={renderDropdownList} valueField="value" textField="subject" data={subjects} />
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
        <div className="row">
          <div className="input-field">
            <Field name="imageURL" component={FileInput} multiple={false} accept="image/*" id="upload"
              dropzoneOnDrop={this.handleDrop} label="Image URL" />
          </div>
        </div>
        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div className="img-upload">
              <img src={this.state.uploadedFileCloudinaryUrl} />
              <p>{this.state.uploadedFile.name}</p>
            </div>}
        </div>
        <br />
        <div className="row">
          <div className="col s12 center-align">
            <button className="btn waves-effect primary-button darken-2 waves-light" type="submit" disabled={isAdding}>Submit
            {isAdding ?
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

export default reduxForm({
  form: 'book',
  validate,
})(BookForm);
