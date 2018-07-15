import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Admin from '../../../components/Admin/Admin.jsx';
import ConnectedAddBookPage from '../../../components/Admin/AddBookPage.jsx';
import ConnectedAdminBorrowRequestsPage
  from '../../../components/Admin/AdminBorrowRequestsPage.jsx';
import ConnectedAdminReturnRequestsPage
  from '../../../components/Admin/AdminReturnRequestsPage.jsx';
import ConnectedAdminBooksPage
  from '../../../components/Admin/AdminBooksPage.jsx';
import NotFound from '../../../components/Common/NotFound';

const props = {
  match: {
    url: '/admin',
  },
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('<Admin />', () => {
  it('should render AdminBooksPage component when route is /', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/admin']}>
        <Provider store = { store } >
          <Admin {...props} />
        </Provider>
      </MemoryRouter>);
    expect(wrapper.find(ConnectedAdminBorrowRequestsPage)).toHaveLength(0);
    expect(wrapper.find(ConnectedAdminReturnRequestsPage)).toHaveLength(0);
    expect(wrapper.find(ConnectedAddBookPage)).toHaveLength(0);
    expect(wrapper.find(ConnectedAdminBooksPage)).toHaveLength(1);
  });

  it(`should render NotFound component when
    route is not found`, () => {
    props.match.url = '/notFound';
    const wrapper = mount(<MemoryRouter>
      <Admin {...props}/>
    </MemoryRouter>);
    expect(wrapper.find(NotFound)).toHaveLength(1);
    expect(wrapper.find(ConnectedAdminBorrowRequestsPage)).toHaveLength(0);
    expect(wrapper.find(ConnectedAdminReturnRequestsPage)).toHaveLength(0);
    expect(wrapper.find(ConnectedAddBookPage)).toHaveLength(0);
    expect(wrapper.find(ConnectedAdminBooksPage)).toHaveLength(0);
  });
});
