import React from 'react';
import Dropzone from 'react-dropzone';
import propTypes from 'prop-types';

/**
 * @description stateless component for drag and drop input
 *
 * @param {object} input
 * @param {object} meta
 * @param {boolean} touched
 * @param {string} error
 * @param {func} dropzoneOnDrop - handles dropped images
 *
 * @returns {Node} - react node containing Dropzone Input component
 */
const DropzoneInput = ({
  input,
  meta: { touched, error },
  dropzoneOnDrop,
  ...props
}) => (
      <div>
        <Dropzone
            className="dropzone"
            onDrop={(acceptedFiles, rejectedFiles, e) => {
                input.onChange(acceptedFiles);
                dropzoneOnDrop(acceptedFiles, rejectedFiles, e);
            }}
            {...props}
        >
        <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
        {touched && error &&
        <span className = "error flow-text">
          {error}
        </span>}
    </div>

);

// Prop type validation
DropzoneInput.propTypes = {
  input: propTypes.object,
  meta: propTypes.object,
  dropzoneOnDrop: propTypes.func,
};

export default DropzoneInput;
