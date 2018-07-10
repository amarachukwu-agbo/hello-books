import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import mockData from '../../__mocks__/mockData';
import AdminReturnRequests from '../../../components/Admin/AdminReturnRequests';

const { requests } = mockData;
const props = {
  returnRequests: requests.returnRequestsResponse.requests,
  declineReturnRequest: sinon.spy(() => Promise.resolve()),
  acceptReturnRequest: sinon.spy(() => Promise.resolve()),
  isHandlingReturnRequest: false,
};
describe('</AdminReturnRequests />', () => {
  it('should render correctly', () => {
    const tree = shallow(<AdminReturnRequests {...props}/>);
    expect(tree).toMatchSnapshot();
  });

  it('should render <p> if there are no return requests', () => {
    props.returnRequests = [];
    const wrapper = shallow(<AdminReturnRequests {...props} />);
    expect(wrapper.find('p').text())
      .toEqual('You have no return requests');
  });

  it('should call acceptReturnRequest() method when button is clicked', () => {
    props.returnRequests = requests.returnRequestsResponse.requests;
    const wrapper = shallow(<AdminReturnRequests {...props} />);
    const acceptButton = wrapper.find('#accept-button2');
    acceptButton.simulate('click');
    expect(props.acceptReturnRequest.calledOnce).toEqual(true);
    expect(props.acceptReturnRequest.calledWith(20000, 98, 2));
  });

  it('should call declineBorrowRequest() method when button is clicked', () => {
    const wrapper = shallow(<AdminReturnRequests {...props} />);
    const declineButton = wrapper.find('#decline-button2');
    declineButton.simulate('click');
    expect(props.declineReturnRequest.calledOnce).toEqual(true);
    expect(props.declineReturnRequest.calledWith(20000, 98, 2));
  });
});
