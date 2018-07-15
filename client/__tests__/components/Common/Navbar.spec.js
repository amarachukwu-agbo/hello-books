import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedNavbar,
{ Navbar } from '../../../components/Common/Navbar';

let wrapper;

const state = {
  login: {
    isAuthenticated: true,
    user: {
      id: 3,
      role: 'User',
      firstName: 'Amy',
    },
  },
};

const mockStore = configureMockStore([thunk]);
const store = mockStore(state);

const props = {
  logOut: sinon.spy(),
  user: {
    id: 3,
    role: 'User',
    firstName: 'Amy',
  },
  isAuthenticated: true,
};

describe('<Navbar/>', () => {
  beforeEach(() => {
    wrapper = shallow(<Navbar {...props} />);
  });

  it('should renders the Navbar correctly for a user', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the logOut() method when the logout button is clicked', () => {
    const logOutButton = wrapper.find('#user-log-out');
    logOutButton.simulate('click');
    expect(props.logOut.called).toEqual(true);
  });

  it('renders the correct navbar items when user is an admin', () => {
    wrapper.setProps({
      user: {
        id: 1,
        role: 'Admin',
        firstName: 'Amy',
      },
    });
    expect(wrapper.find('#requests')).toHaveLength(1);
    expect(wrapper.find('#account')).toHaveLength(1);
    expect(wrapper.find('#books-catalog')).toHaveLength(1);
    expect(wrapper.find('#add-book')).toHaveLength(1);
    expect(wrapper.find('#log-out')).toHaveLength(1);
  });

  it('renders the correct navbar items when user is a guest', () => {
    wrapper.setProps({
      user: null,
      isAuthenticated: false,
    });
    expect(wrapper.find('#sign-up')).toHaveLength(1);
    expect(wrapper.find('#log-in')).toHaveLength(1);
    expect(wrapper.find('#books')).toHaveLength(1);
    expect(wrapper.find('#requests')).toHaveLength(0);
    expect(wrapper.find('#account')).toHaveLength(0);
    expect(wrapper.find('#books-catalog')).toHaveLength(0);
    expect(wrapper.find('#add-book')).toHaveLength(0);
    expect(wrapper.find('#log-out')).toHaveLength(0);
  });
});

describe('<ConnectedNavbar>', () => {
  it('renders correctly', () => {
    const connectedWrapper = shallow(<ConnectedNavbar
      {...props} store = { store }/>);
    expect(connectedWrapper).toMatchSnapshot();
  });
});
