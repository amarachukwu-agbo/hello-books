import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import mockData from '../../__mocks__/mockData';
import AdminBorrowRequests from '../../../components/Admin/AdminBorrowRequests';

const { requests } = mockData;
const props = {
  borrowRequests: requests.borrowRequestsResponse.requests,
  declineBorrowRequest: sinon.spy(() => Promise.resolve()),
  acceptBorrowRequest: sinon.spy(() => Promise.resolve()),
  isHandlingBorrowRequest: false,
};
describe('</AdminBorrowRequests />', () => {
  it('should render correctly', () => {
    const tree = shallow(<AdminBorrowRequests {...props}/>);
    expect(tree).toMatchSnapshot();
  });

  it('should render <p> if there are no borrow requests', () => {
    props.borrowRequests = [];
    const wrapper = shallow(<AdminBorrowRequests {...props} />);
    expect(wrapper.find('p').text())
      .toEqual('You have no borrow requests');
  });

  it('should call acceptBorrowRequest() method when button is clicked', () => {
    props.borrowRequests = requests.borrowRequestsResponse.requests;
    const wrapper = shallow(<AdminBorrowRequests {...props} />);
    const acceptButton = wrapper.find('#accept-button0');
    acceptButton.simulate('click');
    expect(props.acceptBorrowRequest.calledOnce).toEqual(true);
    expect(props.acceptBorrowRequest.calledWith(8, 98, 11));
  });

  it('should call declineBorrowRequest() method when button is clicked', () => {
    props.borrowRequests = requests.borrowRequestsResponse.requests;
    const wrapper = shallow(<AdminBorrowRequests {...props} />);
    const declineButton = wrapper.find('#decline-button0');
    declineButton.simulate('click');
    expect(props.declineBorrowRequest.calledOnce).toEqual(true);
    expect(props.declineBorrowRequest.calledWith(8, 98, 11));
  });
});
