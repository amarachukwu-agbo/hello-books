import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import LoginForm from '../../../components/Login/LoginForm.jsx';

let store;

let wrapper;

const props = {
  isLoggingIn: false,
  submitForm: sinon.spy(() => Promise.resolve()),
};

describe('<LoginForm />', () => {
  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }));
    wrapper = mount(<Provider store={store}>
      <LoginForm {...props}/>
    </Provider>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('throws error if email field is visited and  is blank', () => {
    const emailInput = wrapper.find('#email').last();
    emailInput.simulate('blur');
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text()).toEqual('Input your email');
  });

  it('throws error if password field is visited and is blank', () => {
    const password = wrapper.find('#password').last();
    password.simulate('blur');
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text()).toEqual('Input your password');
  });

  it('sets input values to store on input change', () => {
    const email = wrapper.find('#email').last();
    email.simulate('change', { target: { value: 'user@gmail.com' } });
    expect(store.getState().form.login.values).toEqual({
      email: 'user@gmail.com',
    });
  });

  it(`does not call the submitForm() on form submit if 
    some field are missing`, () => {
    const password = wrapper.find('#password').last();
    password.simulate('change', { target: { value: 'password' } });

    wrapper.find('form').simulate('submit');
    expect(props.submitForm.callCount).toEqual(0);
  });

  it(`calls the submitForm() on form submit
    if all fields are complete`, () => {
    const password = wrapper.find('#password').last();
    password.simulate('change', { target: { value: 'password' } });

    const email = wrapper.find('#email').last();
    email.simulate('change', { target: { value: 'user@gmail.com' } });

    wrapper.find('form').simulate('submit');
    expect(props.submitForm.callCount).toEqual(1);
  });

  it(`shows a spinner icon on the login button
    when state is isLoggingIn`, () => {
    wrapper.setProps({
      children: React.cloneElement(
        wrapper.props().children,
        { isLoggingIn: true },
      ),
    });
    expect(wrapper.find('i.fa-spinner')).toHaveLength(1);
  });
});
