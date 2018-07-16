import React from 'react';
import propTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/lib/scss/react-widgets.scss';

/**
 * @description stateless component for text inputs
 *
 * @param {object} input
 * @param {string} label
 * @param {string} type
 * @param {string} icon
 * @param {string} defaultValue
 * @param {object} meta
 * @param {boolean} touched
 * @param {string} error
 * @param {object} rest
 *
 * @returns {Node} - react node containing InputText component
 */
export const InputText = ({
  input, id, label, type, icon, defaultValue, meta: { touched, error }, ...rest
}) => (
    <div>
      {icon &&
        <i className="material-icons prefix">{icon}</i>
      }
      <label className="flow-text truncate active"> {label} </label>

      { defaultValue &&
      <input {...input} id={id} type={type} onChange={input.onChange}
        value = {defaultValue} {...rest} />
      }

      { !defaultValue &&
        <input {...input} id={id} type={type} onChange={input.onChange}
          {...rest} />
      }
      {touched && error && <span className="error flow-text">{error}</span>}
    </div>
);

/**
 * @description stateless component for dropdown inputs
 *
 * @param {object} input
 * @param {array} data - data in the dropdown
 * @param {string} valueField - data value
 * @param {string} textField - text for the data
 * @param {object} meta
 * @param {boolean} touched
 * @param {string} error
 *
 * @returns {Node} - react node containing Drop down component
 */
export const renderDropdownList = ({
  input, id, meta: { touched, error }, data, valueField, textField,
}) => (
    <div>
      <DropdownList {...input} onChange={input.onChange} data={data}
        id={id} valueField={valueField} textField={textField} />
      {touched && error && <span className="error flow-text">{error}</span>}
    </div>
);

/**
 * @description stateless component for date picker
 *
 * @param {object} input
 * @param {func} onChange - function to be executed when input data changes
 * @param {string} value - input value
 * @param {boolean} showTime - determines whether time is displayed in picker
 * @param {string} icon
 * @param {object} meta
 * @param {boolean} touched
 * @param {string} error
 *
 * @returns {Node} - react node containing Date time picker component
 */
export const renderDatePicker = ({
  input: { onChange }, label, id, meta: { touched, error },
}) => (
    <div>
      <label className="flow-text truncate active"> {label} </label>
      <input type="date" onChange={onChange} id={id}/>
      {touched && error && <span className="error flow-text">{error}</span>}
    </div>
);


/**
 * @description stateless component for Text area
 *
 * @param {object} input
 * @param {string} placeholder
 * @param {string} type
 * @param {object} rest
 *
 * @returns {Node} - react node containing Text Area component
 */
export const TextArea = ({
  input, id, placeholder, type, ...rest
}) => (
    <div>
      <textarea id={id} {...input} type={type} {...rest}
        placeholder={placeholder} className="materialize-textarea" />
    </div>
);

// Prop type validation for InputText
InputText.propTypes = {
  input: propTypes.object,
  label: propTypes.string,
  type: propTypes.string,
  icon: propTypes.string,
  defaultValue: propTypes.string,
  meta: propTypes.object,
};

// Prop type validation for renderDateTimePicker
renderDatePicker.propTypes = {
  input: propTypes.object,
  showTime: propTypes.bool,
  icon: propTypes.string,
  meta: propTypes.object,
};

// Prop type validation for renderDropdownList
renderDropdownList.propTypes = {
  input: propTypes.object,
  meta: propTypes.object,
  data: propTypes.array,
  valueField: propTypes.string,
  textField: propTypes.string,
};

// Prop type validation for TextArea
TextArea.propTypes = {
  input: propTypes.object,
  placeholder: propTypes.string,
  type: propTypes.string,
};

