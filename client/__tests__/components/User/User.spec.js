import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import User from '../../../components/User/User';

const props = {
  match: {
    url: '/users',
  },
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('<User />', () => {
  it('should render User component correctly', () => {
    const wrapper = mount(<MemoryRouter>
        <Provider store = { store } >
          <User {...props} />
        </Provider>
      </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});
