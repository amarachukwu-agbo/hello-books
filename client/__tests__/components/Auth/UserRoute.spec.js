import React from 'react';
import { MemoryRouter, Redirect } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Favorites from '../../../components/User/Favorites';
import ConnectedUserRoute,
{ UserRoute } from '../../../components/Auth/UserRoute';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const props = {
  Component: Favorites,
  isAuthenticated: false,
  user: null,
  location: {
    pathname: '/books',
  },
};

const wrapper = mount(<MemoryRouter>
  <UserRoute {...props} />
</MemoryRouter>);
describe('<UserRoute />', () => {
  it(
    `renders a redirect component to login page when an unauthenticated
     user tries to access a user route`,
    () => {
      const expected = <Redirect to={{
      pathname: '/login',
       state: { from: props.location },
     }} />;
      expect(wrapper.contains(expected)).toEqual(true);
    },
  );
});

describe('<ConnectedUserRoute>', () => {
  const connectedWrapper =
    shallow(<ConnectedUserRoute store = {store} />);
  expect(connectedWrapper).toMatchSnapshot();
});
