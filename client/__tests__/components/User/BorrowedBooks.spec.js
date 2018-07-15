import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import mockData from '../../__mocks__/mockData';
import BorrowedBooks from '../../../components/User/BorrowedBooks';

const { users } = mockData;
const props = {
  returnBook: sinon.spy(() => Promise.resolve()),
  user: {
    id: 3,
  },
  isSendingRequest: false,
  returnRequests: users.profileResponse.user.userReturnRequests,
  books: users.profileResponse.user.userBooks,
};
describe('<BorrowedBooks />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<BorrowedBooks {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
  it('calls returnBook function when button is clicked', () => {
    const wrapper = shallow(<BorrowedBooks {...props}/>);
    const returnButton = wrapper.find('#return-button7');
    returnButton.simulate('click');
    expect(props.returnBook.calledOnce).toEqual(true);
    expect(props.returnBook.calledWith(3, 67));
  });
  it('renders p if there are no books', () => {
    props.books = [];
    const wrapper = shallow(<BorrowedBooks {...props}/>);
    expect(wrapper.find('p').text())
      .toEqual('You have no borrowed books');
  });
});
