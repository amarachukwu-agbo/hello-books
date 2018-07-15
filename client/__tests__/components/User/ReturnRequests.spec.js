import React from 'react';
import { shallow } from 'enzyme';
import mockData from '../../__mocks__/mockData';
import ReturnRequests from '../../../components/User/ReturnRequests';

const { users } = mockData;
const props = {
  requests: users.profileResponse.user.userReturnRequests,
};
describe('<ReturnRequests />', () => {
  it('should render return requests correctly', () => {
    const tree = shallow(<ReturnRequests {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render <p> if there are no return requests', () => {
    const requests = [];
    const wrapper = shallow(<ReturnRequests requests = { requests } />);
    expect(wrapper.find('p').text())
      .toEqual('You have no pending return requests');
  });
});
