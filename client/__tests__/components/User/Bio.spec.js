import React from 'react';
import { shallow } from 'enzyme';
import Bio from '../../../components/User/Bio';

const props = {
  bio: {
    firstName: 'Tester',
    lastName: 'User',
    email: 'tester@gmail.com',
    createdAt: '2018-05-10T03:11:52.181Z',
  },
};

describe('<Bio>', () => {
  it('should render user\'s bio correctly', () => {
    const tree = shallow(<Bio {...props}/>);
    expect(tree).toMatchSnapshot();
  });
});
