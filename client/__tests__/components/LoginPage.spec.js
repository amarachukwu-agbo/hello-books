/* import configureStore from 'redux-mock-store';
import React from 'react';
import { shallow, mount } from 'enzyme';
import ConnectedLoginPage,
{ LoginPage } from '../../components/Login/LoginPage';

const props = {
  loginUser: Promise.resolve(),
};

beforeEach(() => {
  const initialState = {};
  const store = configureStore(initialState);

  const wrapperContainer = shallow(<ConnectedLoginPage store = {store} />);
});

describe('<LoginPage>', () => {
  it('sets error message when trying to submit', () => {
    const wrapper = mount(<LoginPage {...props} />);
    wrapper.find('form').simulate('submit');
    console.log(wrapper);
  });
}); */
