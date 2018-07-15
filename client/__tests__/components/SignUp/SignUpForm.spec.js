import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import SignUpForm from '../../../components/SignUp/SignUpForm.jsx';

let store;
let wrapper;

const props = {
  isSigningUp: false,
  submitForm: sinon.spy(() => Promise.resolve()),
};

describe('<LoginForm />', () => {
  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    wrapper = mount(<Provider store={store}>
      <SignUpForm {...props}/>
    </Provider>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('throws error if email field is visited and is blank', () => {
    const emailInput = wrapper.find('#email').last();
    emailInput.simulate('blur');
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text()).toEqual('Email is required');
  });

  it('throws error if firstName field is visited and is blank', () => {
    const firstName = wrapper.find('#first-name').last();
    firstName.simulate('blur');
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text()).toEqual('First Name is required');
  });

  it('throws error if lastName field is visited and is blank', () => {
    const lastName = wrapper.find('#last-name').last();
    lastName.simulate('blur');
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text()).toEqual('Last Name is required');
  });

  it('throws error if password field is visited and is blank', () => {
    const password = wrapper.find('#password').last();
    password.simulate('blur');
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text()).toEqual('Password is required');
  });

  it('throws error if confirm password field is visited and is blank', () => {
    const confirmPassword = wrapper.find('#confirm-password').last();
    confirmPassword.simulate('blur');
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text())
      .toEqual('Confirm Password is required');
  });

  it('sets input values to store on input change', () => {
    const email = wrapper.find('#email').last();
    email.simulate('change', { target: { value: 'user@gmail.com' } });
    expect(store.getState().form.signUp.values).toEqual({
      email: 'user@gmail.com',
    });
  });

  it('does not call submitForm() if fields are not complete', () => {
    wrapper.find('form').simulate('submit');
    expect(props.submitForm.callCount).toEqual(0);
  });

  it('calls the submitForm() method on form submit', () => {
    const email = wrapper.find('#email').last();
    email.simulate('change', { target: { value: 'user@gmail.com' } });

    const password = wrapper.find('#password').last();
    password.simulate('change', { target: { value: 'passwordT22' } });

    const confirmPassword = wrapper.find('#confirm-password').last();
    confirmPassword.simulate('change', { target: { value: 'passwordT22' } });

    const firstName = wrapper.find('#first-name').last();
    firstName.simulate('change', { target: { value: 'first' } });

    const lastName = wrapper.find('#last-name').last();
    lastName.simulate('change', { target: { value: 'last' } });

    wrapper.find('form').simulate('submit');
    expect(props.submitForm.callCount).toEqual(1);
  });


  it(`shows a spinner icon on the login button
    when state is isLoggingIn`, () => {
    wrapper.setProps({
      children: React.cloneElement(
        wrapper.props().children,
        { isSigningUp: true },
      ),
    });
    expect(wrapper.find('i.fa-spinner')).toHaveLength(1);
  });
});
