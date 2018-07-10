import React from 'react';
import { MemoryRouter, Redirect } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Admin from '../../../components/Admin/Admin';
import ConnectedAdminRoute,
{ AdminRoute } from '../../../components/Auth/AdminRoute';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const props = {
  Component: Admin,
  isAuthenticated: true,
  user: {
    firstName: 'Amarachi',
    id: 20000,
    role: 'User',
  },
  location: '/books',
};

const wrapper = mount(<MemoryRouter>
  <AdminRoute {...props} />
</MemoryRouter>);
describe('<AdminRoute />', () => {
  it(
    `renders a redirect component when a user tries to access
    an admin route`,
    () => {
      const expected = <Redirect to={{
      pathname: '/',
       state: { from: '/books' },
     }} />;
      expect(wrapper.contains(expected)).toEqual(true);
    },
  );
});

describe('<ConnectedAdminRoute>', () => {
  const connectedWrapper =
    shallow(<ConnectedAdminRoute store = {store} />);
  expect(connectedWrapper).toMatchSnapshot();
});
