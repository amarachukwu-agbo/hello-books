import React from 'react';

export const InputText = ({
  input, label, type, defaultValue, icon, meta: { touched, error }, ...rest
}) => (
    <div>
        <i className="material-icons prefix">{ icon }</i>
        <label className = "flow-text truncate"> { label } </label>
        <input {...input} type={type} value= { defaultValue } { ...rest } />
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

