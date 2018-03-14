import React from 'react';

const inputText = ({ input, label, type, meta: { touched, error }}) => (
    <div>
        <label> { label } </label>
        <input {...input} type={type} />
        {touched && error && <span className = "error"> {error}</span>}
    </div>
);

export default inputText;

