import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import BooksPage
  from '../../../components/Books/BooksPage';
import BookDetailsPage
  from '../../../components/Books/BookDetailsPage';
import Books from '../../../components/Books/Books';

const props = {
  match: {
    url: '/books',
  },
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('<Admin />', () => {
  it('should render BooksPage component when route is /', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/books']}>
        <Provider store = { store } >
          <Books {...props} />
        </Provider>
      </MemoryRouter>);
    expect(wrapper.find(BooksPage)).toHaveLength(1);
    expect(wrapper.find(BookDetailsPage)).toHaveLength(0);
  });
});
