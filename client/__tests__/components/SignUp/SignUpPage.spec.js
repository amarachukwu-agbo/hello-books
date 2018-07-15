import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import ConnectedSignUpPage,
{ SignUpPage } from '../../../components/SignUp/SignUpPage';

let wrapper;

describe('<SignUpPage />', () => {
  beforeEach(() => {
    const props = {
      signUp: () => Promise.resolve(),
    };
    wrapper = shallow(<SignUpPage {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the submitForm() method', () => {
    const values = {
      firstName: 'User',
      lastName: 'Surname',
      email: 'user@gmail.com',
      password: 'userPassword123',
    };
    sinon.spy(wrapper.instance(), 'submitForm');
    wrapper.instance().submitForm(values);
    expect(wrapper.instance().submitForm.calledOnce)
      .toEqual(true);
    expect(wrapper.instance().submitForm.calledWith(values));
  });
});

describe('<ConnectedSignUpPage />' , () => {
  it('should render successfully', () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});
    const connectedWrapper = shallow(<ConnectedSignUpPage store = {store} />);
    expect(connectedWrapper.length).toBe(1);
  });
});
