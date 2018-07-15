import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Profile } from '../../../components/User/Profile';

const props = {
  profile: {
    createdAt: '2018-03-22T20:30:32.540Z',
    email: 'amarkipkip@gmail.com',
    firstName: 'Ama',
    id: 2,
    lastName: 'Kipkip',
    role: 'User',
    updatedAt: '2018-03-22T20:30:32.540Z',
    userBooks: [{
      bookId: 1,
      borrowedBooks: {
        title: 'Children of blood and bone(Legacy of Orisha)',
        author: 'Tomi Adeyemi',
      },
      createdAt: '2018-03-22T20:36:27.267Z',
      id: 1,
      status: 'Returned',
      updatedAt: '2018-03-22T20:46:43.526Z',
      userId: 2,
    }],
    userBorrowRequests: [{
      id: 1,
      reason: 'Assignment',
      comments: null,
      returnDate: '2018-12-11T23:00:00.000Z',
      status: 'Pending',
      createdAt: '2018-03-22T20:33:20.579Z',
      updatedAt: '2018-03-22T20:36:27.180Z',
      userId: 2,
      bookId: 1,
      borrowRequests: {
        title: 'Children of blood and bone(Legacy of Orisha)',
        author: 'Tomi Adeyemi',
      },
    }],
    userReturnRequests: [{
      id: 1,
      comments: null,
      status: 'Pending',
      createdAt: '2018-03-22T20:43:57.646Z',
      updatedAt: '2018-03-22T20:46:43.496Z',
      userId: 2,
      bookId: 1,
      returnRequests: {
        title: 'Children of blood and bone(Legacy of Orisha)',
        author: 'Tomi Adeyemi',
      },
    }],
  },
  user: {
    id: 2,
    firstName: 'Ama',
    lastName: 'Kipkip',
    email: 'amarkipkip@gmail.com',
    password: null,
    role: 'User',
    createdAt: '2018-03-22T20:30:32.540Z',
    updatedAt: '2018-03-22T20:30:32.540Z',
  },
  getUserProfile: sinon.spy(() => Promise.resolve()),
};

const spy = sinon.spy(Profile.prototype, 'componentDidMount');
const wrapper = shallow(<Profile {...props}/>);

describe('<Profile>', () => {
  it('calls componentDidMount', () => {
    expect(spy.called).toEqual(true);
    expect(spy.callCount).toEqual(1);
    expect(props.getUserProfile.calledOnce).toEqual(true);
    spy.restore();
  });

  it('Should be display the user\'s profile correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the preloader if the user\'s profile is being fetched', () => {
    wrapper.setProps({ isFetchingProfile: true });
    expect(wrapper.find('Preloader')).toHaveLength(1);
    expect(wrapper.find('Bio')).toHaveLength(0);
    expect(wrapper.find('BorrowedBooks')).toHaveLength(0);
    expect(wrapper.find('ReturnRequests')).toHaveLength(0);
    expect(wrapper.find('BorrowRequests')).toHaveLength(0);
  });

  it('renders error if there is an error while fetching profile', () => {
    wrapper.setProps({
      isFetchingProfile: false,
      profileError: 'An error occured',
    });
    expect(wrapper.find('.wrapper').length).toEqual(1);
    expect(wrapper.find('h6').text())
      .toEqual('Oops couldn\'t fetch your profile. An error occured');
  });
});
