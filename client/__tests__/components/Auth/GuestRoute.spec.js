import React from 'react';
import { MemoryRouter, Redirect } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginPage from '../../../components/Login/LoginPage';
import ConnectedGuestRoute,
{ GuestRoute } from '../../../components/Auth/GuestRoute';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const props = {
  Component: LoginPage,
  isAuthenticated: true,
  user: {
    firstName: 'Amarachi',
    id: 20000,
    role: 'User',
  },
  location: {
    pathname: '/books',
  },
};

const wrapper = mount(<MemoryRouter>
  <GuestRoute {...props} />
</MemoryRouter>);
describe('<GuestRoute />', () => {
  it(
    `renders a redirect component when an authenticated
     user tries to access a guest route`,
    () => {
      const expected = <Redirect to={{
      pathname: '/',
       state: { from: props.location },
     }} />;
      expect(wrapper.contains(expected)).toEqual(true);
    },
  );
});

describe('<ConnectedAdminRoute>', () => {
  const connectedWrapper =
    shallow(<ConnectedGuestRoute store = {store} />);
  expect(connectedWrapper).toMatchSnapshot();
});
