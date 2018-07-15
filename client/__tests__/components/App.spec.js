import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createHistory from 'history/createMemoryHistory';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import App from '../../components/App';

const props = {
  history: createHistory(),
};

const state = {
  login: {
    isAuthenticated: false,
    user: null,
  },
};

const jQueryMock = jest.fn();

global.$ = () => ({
  slider: jQueryMock,
  ready: jQueryMock,
});

const mockStore = configureMockStore([thunk]);
const store = mockStore(state);

describe('<App />', () => {
  afterEach(() => {
    global.$ = $;
  });

  it('should render App correctly', () => {
    const tree = shallow(<MemoryRouter initialEntries={['/']}>
        <Provider store = { store } >
          <App {...props} />
        </Provider>
      </MemoryRouter>);
    expect(tree).toMatchSnapshot();
  });
  it('should have a div wrapper', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
