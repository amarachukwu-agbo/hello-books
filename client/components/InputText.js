import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/lib/scss/react-widgets.scss';

export const InputText = ({
  input, label, type, icon, meta: { touched, error }, ...rest
}) => (
    <div>
        <i className="material-icons prefix">{ icon }</i>
        <label className = "flow-text truncate active"> { label } </label>
        <input {...input} type={type} onChange={input.onChange} { ...rest } />
        {touched && error && <span className = "error flow-text"> {error} </span>}
    </div>
);

export const renderDropdownList = ({
  input, meta: { touched, error }, subjects, valueField, textField,
}) => (
      <div>
          <DropdownList { ...input } onChange={input.onChange} data={subjects}
          valueField={valueField} textField={textField}/>
          {touched && error && <span className = "error flow-text"> {error} </span>}
      </div>
);

export const TextArea = ({
  input, label, type, ...rest
}) => (
      <div>
          <label> { label } </label>
          <textarea {...input} type={type} { ...rest } />
      </div>
);

