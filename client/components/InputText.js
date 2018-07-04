import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets-moment';
import Moment from 'moment';
import 'react-widgets/lib/scss/react-widgets.scss';

Moment.locale('en');
momentLocalizer();

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

export const renderDropdownList = ({
  input, meta: { touched, error }, data, valueField, textField,
}) => (
    <div>
      <DropdownList {...input} onChange={input.onChange} data={data}
        valueField={valueField} textField={textField} />
      {touched && error && <span className="error flow-text"> {error} </span>}
    </div>
);

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

export const TextArea = ({
  input, placeholder, type, ...rest
}) => (
    <div>
      <textarea {...input} type={type} {...rest}
        placeholder={placeholder} className="materialize-textarea" />
    </div>
);

