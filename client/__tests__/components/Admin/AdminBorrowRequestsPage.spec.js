import React from 'react';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow, mount } from 'enzyme';
import mockData from '../../__mocks__/mockData';
import ConnectedAdminBorrowRequestsPage, { AdminBorrowRequestsPage }
  from '../../../components/Admin/AdminBorrowRequestsPage';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});
const { requests } = mockData;
const props = {
  getBorrowRequests: sinon.spy(() => Promise.resolve()),
  handleBorrowRequest: sinon.spy(() => Promise.resolve()),
  borrowRequests: requests.borrowRequestsResponse.requests,
  pagination: requests.borrowRequestsResponse.pagination,
  isFetchingBorrowRequests: false,
  borrowRequestsError: null,
};

describe('<AdminBorrowRequestsPage />', () => {
  it('renders correctly', () => {
    const tree = shallow(<AdminBorrowRequestsPage {...props}/>);
    expect(tree).toMatchSnapshot();
  });

  it('calls componentDidMount() method', () => {
    sinon.spy(AdminBorrowRequestsPage.prototype, 'componentDidMount');
    mount(<AdminBorrowRequestsPage {...props}/>);
    expect(AdminBorrowRequestsPage.prototype.componentDidMount
      .calledOnce).toEqual(true);
    expect(props.getBorrowRequests.called).toEqual(true);
    expect(props.getBorrowRequests.calledWith(1)).toEqual(true);
  });

  it('calls acceptBorrowRequest() method', () => {
    const wrapper = shallow(<AdminBorrowRequestsPage {...props}/>);
    sinon.spy(wrapper.instance(), 'acceptBorrowRequest');
    wrapper.instance().acceptBorrowRequest(
      { status: 'Accepted' },
      2,
      98,
      11,
    );
    expect(wrapper.instance().acceptBorrowRequest.calledOnce)
      .toEqual(true);
  });

  it('calls declineBorrowRequest() method', () => {
    const wrapper = shallow(<AdminBorrowRequestsPage {...props}/>);
    sinon.spy(wrapper.instance(), 'declineBorrowRequest');
    wrapper.instance().declineBorrowRequest(
      { status: 'Declined' },
      2,
      98,
      11,
    );
    expect(wrapper.instance().declineBorrowRequest.calledOnce)
      .toEqual(true);
  });

  it('renders the Preloader when the requests are fetching', () => {
    props.isFetchingBorrowRequests = true;
    props.borrowRequests = null;
    props.pagination = null;
    const wrapper = shallow(<AdminBorrowRequestsPage {...props}/>);
    expect(wrapper.find('Preloader')).toHaveLength(1);
  });

  it('renders error when there is an error fetching borrowRequets', () => {
    props.borrowRequestsError = 'Network error';
    props.isFetchingBorrowRequests = false;
    const wrapper = shallow(<AdminBorrowRequestsPage {...props} />);
    expect(wrapper.find('h4').text())
      .toEqual('Oops! Couldn\'t fetch borrow requests. Network error');
  });
});

describe('<ConnectedAdminBorrowRequestPage/>', () => {
  it('should render successfully', () => {
    const connectedWrapper =
    shallow(<ConnectedAdminBorrowRequestsPage store = {store}/>);
    expect(connectedWrapper.length).toBe(1);
  });
});
