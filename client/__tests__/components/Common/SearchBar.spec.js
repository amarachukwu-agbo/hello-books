import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Notify from '../../../helpers/Notify';
import SearchBar from '../../../components/Common/Searchbar';

let wrapper;
const props = {
  searchBooks: sinon.spy(() => Promise.resolve()),
  isSearching: false,
};

const e = {
  preventDefault: jest.fn(),
};

sinon.spy(SearchBar.prototype, 'searchBook');
const notifyInfo = sinon.spy(Notify, 'notifyInfo');
const notifyError = sinon.spy(Notify, 'notifyError');

describe('<SearchBar />', () => {
  beforeEach(() => {
    wrapper = shallow(<SearchBar {...props} />);
  });

  it('renders correctly', () => {
    wrapper = shallow(<SearchBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles input change', () => {
    wrapper.find('#search-input').simulate('change', {
      target: {
        value: 'A book',
      },
    });
    expect(wrapper.state().searchParam).toBe('A book');
  });

  it('handles dropdown change', () => {
    wrapper.find('#drop-down-list').simulate('change', 'Author');
    expect(wrapper.state().searchBy).toBe('Author');
  });

  it('handles submission of the search form', () => {
    wrapper.setState({
      searchBy: 'Author',
      searchParam: 'Ken Follet',
    });
    wrapper.find('form').simulate('submit', e);
    expect(SearchBar.prototype.searchBook.called).toEqual(true);
    expect(props.searchBooks.called).toEqual(true);
    expect();
  });

  it('notifies user when search criteria is not chosen', () => {
    wrapper.setState({
      searchBy: 'Search By',
      searchParam: 'Romance',
    });
    wrapper.instance().searchBook();
    expect(notifyInfo.called).toEqual(true);
    notifyInfo.restore();
  });

  it('notifies user when the search input is empty', () => {
    wrapper.setState({
      searchParam: '',
      searchBy: 'Author',
    });
    wrapper.instance().searchBook();
    expect(notifyError.called).toEqual(true);
  });
});
