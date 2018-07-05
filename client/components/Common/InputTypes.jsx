import React from 'react';
import propTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets-moment';
import Moment from 'moment';
import 'react-widgets/lib/scss/react-widgets.scss';

Moment.locale('en');
momentLocalizer();

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
  input, label, type, icon, defaultValue, meta: { touched, error }, ...rest
}) => (
    <div>
      {icon &&
        <i className="material-icons prefix">{icon}</i>
      }
      <label className="flow-text truncate active"> {label} </label>
      <input {...input} type={type} onChange={input.onChange}
        value={defaultValue} {...rest} />
      {touched && error && <span className="error flow-text"> {error} </span>}
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
  input, meta: { touched, error }, data, valueField, textField,
}) => (
    <div>
      <DropdownList {...input} onChange={input.onChange} data={data}
        valueField={valueField} textField={textField} />
      {touched && error && <span className="error flow-text"> {error} </span>}
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
export const renderDateTimePicker = ({
  input: { onChange, value }, showTime, icon, meta: { touched, error },
}) => (
    <div>
      <i className="material-icons prefix">{icon}</i>
      <DateTimePicker onChange={onChange} format="DD MMM YYYY" time={showTime}
        value={!value ? null : new Date(value)} />
      {touched && error && <span className="error flow-text"> {error} </span>}
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
  input, placeholder, type, ...rest
}) => (
    <div>
      <textarea {...input} type={type} {...rest}
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
renderDateTimePicker.propTypes = {
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

