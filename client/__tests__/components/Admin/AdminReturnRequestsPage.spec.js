import React from 'react';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import mockData from '../../__mocks__/mockData';
import ConnectedAdminReturnRequestsPage, { AdminReturnRequestsPage }
  from '../../../components/Admin/AdminReturnRequestsPage';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});
const { requests } = mockData;
const props = {
  getReturnRequests: sinon.spy(() => Promise.resolve()),
  handleReturnRequest: sinon.spy(() => Promise.resolve()),
  returnRequests: requests.returnRequestsResponse.requests,
  pagination: requests.returnRequestsResponse.pagination,
  isFetchingReturnRequests: false,
  returnRequestsError: null,
};

describe('<AdminReturnRequestsPage />', () => {
  it('renders correctly', () => {
    const tree = shallow(<AdminReturnRequestsPage {...props}/>);
    expect(tree).toMatchSnapshot();
  });
  it('calls componentDidMount() method', () => {
    sinon.spy(AdminReturnRequestsPage.prototype, 'componentDidMount');
    mount(<AdminReturnRequestsPage {...props}/>);
    expect(AdminReturnRequestsPage.prototype.componentDidMount
      .calledOnce).toEqual(true);
    expect(props.getReturnRequests.called).toEqual(true);
    expect(props.getReturnRequests.calledWith(1)).toEqual(true);
  });
  it('calls acceptReturnRequest() method', () => {
    const wrapper = shallow(<AdminReturnRequestsPage {...props}/>);
    sinon.spy(wrapper.instance(), 'acceptReturnRequest');
    wrapper.instance().acceptReturnRequest(
      { status: 'Accepted' },
      2,
      98,
      11,
    );
    expect(wrapper.instance().acceptReturnRequest.calledOnce)
      .toEqual(true);
  });
  it('calls declineReturnRequest() method', () => {
    const wrapper = shallow(<AdminReturnRequestsPage {...props}/>);
    sinon.spy(wrapper.instance(), 'declineReturnRequest');
    wrapper.instance().declineReturnRequest(
      { status: 'Declined' },
      2,
      98,
      11,
    );
    expect(wrapper.instance().declineReturnRequest.calledOnce)
      .toEqual(true);
  });
  it('renders the Preloader when the requests are fetching', () => {
    props.isFetchingReturnRequests = true;
    props.returnRequests = null;
    props.pagination = null;
    const wrapper = shallow(<AdminReturnRequestsPage {...props}/>);
    expect(wrapper.find('Preloader')).toHaveLength(1);
  });
  it('renders error when there is an error fetching returnRequets', () => {
    props.returnRequestsError = 'Network error';
    props.isFetchingReturnRequests = false;
    const wrapper = shallow(<AdminReturnRequestsPage {...props} />);
    expect(wrapper.find('h4').text())
      .toEqual('Oops! Couldn\'t fetch return requests. Network error');
  });
});

describe('<ConnectedAdminReturnRequestPage/>', () => {
  it('should render successfully', () => {
    const connectedWrapper =
    shallow(<ConnectedAdminReturnRequestsPage store = {store}/>);
    expect(connectedWrapper.length).toBe(1);
  });
});
