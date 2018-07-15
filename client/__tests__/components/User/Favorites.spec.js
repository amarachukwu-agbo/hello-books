import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockData from '../../__mocks__/mockData';
import ConnectedFavorites,
{ Favorites } from '../../../components/User/Favorites';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

const { users } = mockData;
const props = {
  getUserFavorites: sinon.spy(() => Promise.resolve()),
  isFetching: false,
  favorites: users.favoritesResponse.favorites,
  pagination: users.favoritesResponse.pagination,
  user: {
    id: 2,
  },
};

describe('<Favorites/>', () => {
  sinon.spy(Favorites.prototype, 'componentDidMount');
  it('should render correctly', () => {
    const wrapper = shallow(<Favorites {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });
  it('calls componentDidMount method()', () => {
    shallow(<Favorites {...props} />);
    expect(Favorites.prototype.componentDidMount.called)
      .toEqual(true);
    expect(props.getUserFavorites.called).toEqual(true);
    expect(props.getUserFavorites.calledWith(2, 1)).toEqual(true);
  });
  it('should render Preloader when favorites are fetching', () => {
    props.isFetching = true;
    props.favorites = null;
    props.pagination = null;
    const wrapper = shallow(<Favorites {...props} />);
    expect(wrapper.find('Preloader')).toHaveLength(1);
  });
  it('should render error when there is an error fetching favorites', () => {
    props.isFetching = false;
    props.error = 'Network error';
    const wrapper = shallow(<Favorites {...props} />);
    expect(wrapper.find('h6').text())
      .toEqual('Oops! Couldn\'t fetch your favorites. Network error');
  });
  it('should render message if user has no favorites', () => {
    props.favorites = [];
    props.error = null;
    const wrapper = shallow(<Favorites {...props} />);
    expect(wrapper.find('h5').text())
      .toEqual('Looks like you have no favorites');
    expect(wrapper.find('h6').text())
      .toEqual('Click on the heart icon on a book\'s page to add it to your favorites.'); /*eslint-disable-line*/
  });
});

describe('<ConnectedFavorites/>', () => {
  it('renders correctly', () => {
    const connectedWrapper = shallow(<ConnectedFavorites
    store = {store} {...props}/>);
    expect(connectedWrapper).toMatchSnapshot();
  });
});
