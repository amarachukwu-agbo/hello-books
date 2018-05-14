import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from '../Login/LoginForm';

/* const props = {
  handleSubmit: jest.fn(),
}; */

describe('LoginForm', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('.input-field').length).toBe(2);
  });
});

