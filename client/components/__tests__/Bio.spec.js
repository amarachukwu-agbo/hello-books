import React from 'react';
import { shallow } from 'enzyme';
import Bio from '../Bio';

const bio = {
  firstName: 'Amara',
  lastName: 'Agbo',
  email: 'amarachukwu.agbo@gmail.com',
  createdAt: '2017-08-06T24:14',

};
const wrapper = shallow(<Bio bio = { bio } />);

describe('Bio', () => {
  it('renders four <p> components', () => {
    expect(wrapper.find('p').length).toBe(4);
  });
  it('renders two `.material-icons`', () => {
    expect(wrapper.find('.material-icons').length).toBe(2);
  });
  it('renders two `.row`', () => {
    expect(wrapper.find('.row').exists()).toBeTruthy();
    expect(wrapper.find('.row').length).toBe(2);
  });
});
