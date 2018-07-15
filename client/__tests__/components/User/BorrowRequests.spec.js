import React from 'react';
import { shallow } from 'enzyme';
import mockData from '../../__mocks__/mockData';
import BorrowRequests from '../../../components/User/BorrowRequests';

const { users } = mockData;
const props = {
  requests: users.profileResponse.user.userBorrowRequests,
};
describe('<BorrowRequests/>', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BorrowRequests {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render p if there are no borrow requests', () => {
    props.requests = [];
    const wrapper = shallow(<BorrowRequests {...props} />);
    expect(wrapper.find('p').text())
      .toEqual('You have no pending borrow requests');
  });
});
