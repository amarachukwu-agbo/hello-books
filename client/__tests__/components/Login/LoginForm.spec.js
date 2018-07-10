import { LoginForm } from '../../../components/Login/LoginForm.jsx';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('<LoginForm />', () => {
  let subject = null;
  let submitting;
  let touched;
  let error;
  let reset;
  let submitForm;
  let onSaveResponse;
  let handleSubmit;

  beforeEach(() => {
    submitting = false;
    touched = false;
    error = null;
    reset = sinon.spy();
    onSaveResponse = Promise.resolve();
    handleSubmit = fn => fn;
  });

  const buildSubject = () => {
    submitForm = sinon.spy(() => Promise.resolve());
    const props = {
      submitting,
      submitForm,
      fields: {
        email: {
          value: 'user@gmail.com',
          touched,
          error,
        },
        password: {
          value: 'userPassword123',
          touched,
          error,
        },
      },
      handleSubmit,
      reset,
    };
    return shallow(<LoginForm {...props}/>);
  };
  it('calls submitForm() on form submission', () => {
    subject = buildSubject();
    subject.find('form').simulate('submit');
    expect(submitForm.callCount).toEqual(1);
  });
});
