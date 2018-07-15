import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ConnectedLoginPage, { LoginPage }
  from '../../../components/Login/LoginPage';

let wrapper;

describe('<LoginPage />', () => {
  beforeEach(() => {
    const props = {
      loginUser: () => Promise.resolve(),
      login: {
        isLoggingIn: false,
        isAuthenticated: false,
        user: null,
      },
    };
    wrapper = shallow(<LoginPage {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls submitForm()', () => {
    const values = {
      firstName: 'User',
      email: 'user@gmail.com',
    };
    sinon.spy(wrapper.instance(), 'submitForm');
    wrapper.instance().submitForm(values);
    expect(wrapper.instance().submitForm.calledOnce)
      .toEqual(true);
    expect(wrapper.instance().submitForm.calledWith(values));
  });
});

describe('<ConnectedLoginPage />', () => {
  it('should render successfully', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});
    const connectedWrapper = shallow(<ConnectedLoginPage store = {store}/>);
    expect(connectedWrapper.length).toBe(1);
  });
});
