import React from 'react';
import Dropzone from 'react-dropzone';

const ReduxFormDropzone = (field) => {
  const {
    input,
    meta: { touched, error },
    dropzoneOnDrop,
    ...props
  } = field;

  return (
      <div>
        <Dropzone
            className="dropzone"
            onDrop={(acceptedFiles, rejectedFiles, e) => {
                field.input.onChange(acceptedFiles);
                field.dropzoneOnDrop(acceptedFiles, rejectedFiles, e);
            }}
            {...props}
        >
        <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
        {touched && error && <span className = "error flow-text"> {error} </span>}
    </div>

  );
};

export default ReduxFormDropzone;
